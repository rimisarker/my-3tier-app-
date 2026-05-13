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
        stage('Fixing Mount & Deploy') {
            steps {
                script {
                    // 1. Fix Docker socket permissions and ownership
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // 2. Fix the "Not a Directory" error for Prometheus
                    // It removes the wrong folder and ensures it stays as a file
                    sh '''
                        if [ -d "monitoring/prometheus.yml" ]; then
                            echo "Deleting incorrect directory created by Docker mount..."
                            rm -rf monitoring/prometheus.yml
                        fi
                        # Ensure the directory exists and set file permissions
                        mkdir -p monitoring
                        chmod 644 monitoring/prometheus.yml || true
                    '''

                    // 3. Cleanup existing containers to avoid conflicts
                    sh 'docker-compose down || true'

                    // 4. Pull the latest images
                    sh 'docker-compose pull'

                    // 5. Deploy new containers
                    // Using --build to ensure backend/frontend Dockerfiles are updated
                    sh 'docker-compose up -d --build'

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
            echo "Deployment failed. Check the Console Output for specific error details."
        }
    }
}