pipeline {
    agent { label 'docker-agent' } 

    environment {
        MYSQL_ROOT_PASSWORD = 'admin123'
        MYSQL_DATABASE      = 'students_db'
        DB_USER             = 'root'
    }

    stages {
        stage('Ultimate Deploy') {
            steps {
                script {
                    // ১. পারমিশন ঠিক করা
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // ২. প্রমিথিউস কনফিগারেশন ফাইলটি সরাসরি কন্টেইনারের ভেতরে ইনজেক্ট করা
                    // আমরা হোস্ট মাউন্ট বাদ দিয়ে কন্টেইনারের কমান্ড লাইন ব্যবহার করছি
                    sh 'docker-compose down || true'
                    
                    // ৩. নতুন ইমেজ বিল্ড এবং ডেপ্লয়
                    // লক্ষ্য করুন: আমরা ভলিউম মাউন্ট ছাড়াই প্রমিথিউস রান করছি
                    sh 'docker-compose up -d --build'

                    // ৪. প্রমিথিউস কন্টেইনারের ভেতর কনফিগারেশন ফাইলটি জোর করে কপি করে দেওয়া
                    // এটিই আসল সমাধান। হোস্ট ফাইলের ঝামেলা শেষ।
                    sh '''
                        echo "global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  - job_name: 'students-app'
    static_configs:
      - targets: ['student-backend:5000']" > temp_prom.yml
                        
                        docker cp temp_prom.yml prometheus:/etc/prometheus/prometheus.yml
                        docker restart prometheus
                        rm temp_prom.yml
                    '''

                    echo "Deployment Successful without Mount Issues!"
                }
            }
        }
    }
}