pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_IP = "16.171.147.166"   // your website server IP
        PEM_FILE = "jenkins.pem"    // make sure this is in Jenkins
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/eng24ct0060-commits/vaultcase.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building the project..."
                // Example for Node.js
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // Optional
                sh 'npm test || true'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to server..."
                sh """
                scp -i ${PEM_FILE} -o StrictHostKeyChecking=no -r * ${EC2_USER}@${EC2_IP}:/home/ec2-user/app
                ssh -i ${PEM_FILE} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '
                    cd /home/ec2-user/app
                    npm install
                    pm2 restart all || pm2 start app.js
                '
                """
            }
        }
    }

    post {
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Pipeline Failed ❌"
        }
    }
}
