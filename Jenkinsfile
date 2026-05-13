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
                    // 1. Fix Docker socket permissions
                    sh 'sudo chmod 666 /var/run/docker.sock || true'

                    // 2. FORCE RECREATE PROMETHEUS FILE (The Ultimate Fix)
                    // This creates the file directly to avoid "Not a Directory" error
                    sh '''
                        # Remove if any wrong directory exists
                        rm -rf monitoring/prometheus.yml
                        
                        # Ensure monitoring folder exists
                        mkdir -p monitoring
                        
                        # Create the prometheus.yml file with correct configuration
                        cat <<EOF > monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

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
EOF
                        # Set permissions so Docker can read the file
                        chmod 644 monitoring/prometheus.yml
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