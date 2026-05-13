pipeline {
    /* Use your specific slave agent label */
    agent { label 'docker-agent' } 

    environment {
        /* Correct environment variables for your 3-tier app */
        MYSQL_ROOT_PASSWORD = 'admin123'
        MYSQL_DATABASE      = 'students_db'
        DB_USER             = 'root'
    }

    stages {
        stage('Ultimate Deploy') {
            steps {
                script {
                    // ১. ডকার সকেট পারমিশন ঠিক করা
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // ২. পুরানো কন্টেইনার মুছে ফেলা
                    sh 'docker-compose down || true'
                    
                    // ৩. নতুন করে কন্টেইনার আপ করা (ভলিউম মাউন্ট ছাড়াই)
                    // মনে রাখবেন: আপনার docker-compose.yml থেকে prometheus-এর volumes অংশটি মুছে ফেলেছেন তো?
                    sh 'docker-compose up -d --build'

                    // ৪. WSL এর মাউন্টিং এরর এড়াতে সরাসরি কন্টেইনারের ভেতর ফাইল ইনজেক্ট করা
                    // এখানে 'docker' কমান্ডের বদলে 'docker-compose exec' ব্যবহার করা হয়েছে
                    sh '''
                        docker-compose exec -T prometheus sh -c "cat <<EOF > /etc/prometheus/prometheus.yml
global:
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
      - targets: ['student-backend:5000']
EOF"
                        # নতুন কনফিগারেশন কার্যকর করার জন্য প্রমিথিউস রিস্টার্ট
                        docker-compose restart prometheus
                    '''

                    echo "Congratulations! Deployment Successful on WSL without Mount Issues."
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution finished."
        }
        success {
            echo "Hurrah! Everything is live and monitoring is configured."
        }
        failure {
            echo "Deployment failed. Please check the logs."
        }
    }
}