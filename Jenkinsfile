pipeline {
    agent any

    stages {
        stage('Clean and Deploy') {
            steps {
                script {
                    // 1. Docker Hub theke latest image niye asha
                    sh 'docker-compose pull'
                    
                    // 2. Jodi age theke kono container thake, sheta bondho kora
                    // '|| true' deya hoyeche jate prothombat error na khay
                    sh 'docker-compose down || true'
                    
                    // 3. Noutun image diye container up kora
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