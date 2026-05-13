pipeline {
    /* Use the specific slave agent label you created */
    agent { label 'docker-agent' } 

    environment {
        /* Environment variables from your .env file */
        MYSQL_ROOT_PASSWORD = 'admin123'
        MYSQL_DATABASE      = 'students_db'
        DB_USER             = 'root'
    }

    stages {
        stage('Fixing Mount & Deploy') {
            steps {
                script {
                    // 1. Fix Docker socket permissions
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // 2. Automation: Remove incorrect directory created by Docker volume mount
                    // This permanently prevents the 'not a directory' error
                    sh '''
                        if [ -d "monitoring/prometheus.yml" ]; then
                            echo "Deleting incorrect directory created by Docker..."
                            rm -rf monitoring/prometheus.yml
                        fi
                    '''

                    // 3. Pull latest images from Docker Hub
                    sh 'docker-compose pull'

                    // 4. Cleanup old containers
                    sh 'docker-compose down || true'

                    // 5. Deploy new containers in detached mode
                    sh 'docker-compose up -d'

                    echo "Congratulations! Deployment successful."
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution finished."
        }
        success {
            echo "Hurrah! Your application and monitoring tools are now live."
        }
        failure {
            echo "Pipeline failed. Please check the 'Console Output' for more details."
        }
    }
}