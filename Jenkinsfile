pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-demo"
        IMAGE_TAG = "v1"
        CONTAINER_NAME = "devops-container"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/eng24ct0060-commits/vaultcase.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh "docker run -d -p 80:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
