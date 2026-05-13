pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }
    }
}
