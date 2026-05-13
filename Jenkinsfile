pipeline {
    /* 'any' এর বদলে আপনার তৈরি করা স্লেভ লেবেলটি ব্যবহার করা হচ্ছে */
    agent { label 'docker-agent' } 

    environment {
        /* আপনার .env ফাইলের ভেরিয়েবলগুলো এখানে যোগ করা হয়েছে */
        MYSQL_ROOT_PASSWORD = 'admin123'
        MYSQL_DATABASE      = 'students_db'
        DB_USER             = 'root'
    }

    stages {
        stage('Clean and Deploy') {
            steps {
                script {
                    // ডকার সকেট পারমিশন ঠিক করা (যদি প্রয়োজন হয়)
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // ১. Docker Hub থেকে লেটেস্ট ইমেজ আনা
                    sh 'docker-compose pull'

                    // ২. পুরানো কন্টেইনার ডিলিট করা
                    sh 'docker-compose down || true'

                    // ৩. নতুন ইমেজ দিয়ে কন্টেইনার আপ করা
                    sh 'docker-compose up -d'

                    echo "Deployment successful!"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finish hoyeche."
        }
        success {
            echo "Congratulation! Apnar app ekhon live."
        }
        failure {
            echo "Ops! Kono ekta somossya hoyeche. Console output check korun."
        }
    }
}