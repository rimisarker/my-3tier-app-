🎓 Student Management System: 3-Tier App with CI/CD & Monitoring
This project demonstrates a fully automated CI/CD Pipeline for a 3-tier application (Frontend, Backend, and Database) using GitHub Actions for CI and Jenkins (on WSL) for CD. It also includes a robust monitoring stack using Prometheus and Grafana.

🚀 Project Overview
Frontend: Nginx-based static web interface.

Backend: Node.js & Express.js REST API.

Database: MySQL for persistent data storage.

CI (Continuous Integration): Automated using GitHub Actions to lint and build images.

CD (Continuous Deployment): Managed by Jenkins on WSL, deploying via Docker Compose.

Monitoring: Full observability with Prometheus, Grafana, cAdvisor, and Node Exporter.

🛠 Tech Stack
Core: Docker, Docker Compose

Environment: Windows Subsystem for Linux (WSL 2)

Automation: GitHub Actions, Jenkins

Observability: Prometheus, Grafana, Node Exporter, cAdvisor

📂 Directory Structure

├── .github/workflows/   # GitHub Actions CI configuration
├── monitoring/          # Prometheus configuration (Auto-injected)
├── backend/             # Node.js source code & Dockerfile
├── frontend/            # HTML/Web files & Dockerfile
├── docker-compose.yml   # Multi-container orchestration
├── Jenkinsfile          # CD Pipeline script
└── README.md



🎓 Student Management System: 3-Tier App with CI/CD & Monitoring
This project demonstrates a fully automated CI/CD Pipeline for a 3-tier application (Frontend, Backend, and Database) using GitHub Actions for CI and Jenkins (on WSL) for CD. It also includes a robust monitoring stack using Prometheus and Grafana.

🚀 Project Overview
Frontend: Nginx-based static web interface.

Backend: Node.js & Express.js REST API.

Database: MySQL for persistent data storage.

CI (Continuous Integration): Automated using GitHub Actions to lint and build images.

CD (Continuous Deployment): Managed by Jenkins on WSL, deploying via Docker Compose.

Monitoring: Full observability with Prometheus, Grafana, cAdvisor, and Node Exporter.

🛠 Tech Stack
Core: Docker, Docker Compose

Environment: Windows Subsystem for Linux (WSL 2)

Automation: GitHub Actions, Jenkins

Observability: Prometheus, Grafana, Node Exporter, cAdvisor

📂 Directory Structure
Plaintext
├── .github/workflows/   # GitHub Actions CI configuration
├── monitoring/          # Prometheus configuration (Auto-injected)
├── backend/             # Node.js source code & Dockerfile
├── frontend/            # HTML/Web files & Dockerfile
├── docker-compose.yml   # Multi-container orchestration
├── Jenkinsfile          # CD Pipeline script
└── README.md

⚙️ CI/CD Workflow

1. Continuous Integration (GitHub Actions)
Every time code is pushed to the main branch, GitHub Actions:

Triggers a build check.

Validates the Dockerfiles.

Ensures the codebase is ready for deployment.

2. Continuous Deployment (Jenkins)
Jenkins detects changes and executes the following:

Environment Setup: Configures Docker socket permissions.

Deployment: Uses docker-compose up --build to deploy services.

Hot-Fix for WSL: Injects the Prometheus configuration directly into the container using docker-compose exec to bypass WSL filesystem mounting restrictions.

📊 Monitoring Dashboard
Service,Access URL
Application UI,http://localhost:80
Prometheus,http://localhost:9090
Grafana,http://localhost:3000
cAdvisor,http://localhost:8081

Grafana Setup:
Login with admin / admin.

Add Prometheus as a Data Source (URL: http://prometheus:9090).

Import Dashboard ID: 1860 for System Metrics or 14282 for Container Metrics.

🛠 How to Run Locally
Clone the repo:
git clone https://github.com/your-username/your-repo-name.git

Run via Docker Compose:
docker compose up -d
