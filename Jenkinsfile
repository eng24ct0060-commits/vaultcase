pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t vaultcase .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'  // Assuming you have tests; adjust if not
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here, e.g., copy to server, upload to S3, etc.
                echo 'Deploy step - customize as needed'
            }
        }
    }

    post {
        always {
            // Clean up or notifications
            echo 'Pipeline completed'
        }
        failure {
            // Notify on failure
            echo 'Pipeline failed'
        }
    }
}
