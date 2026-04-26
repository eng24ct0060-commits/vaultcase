pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vaultcase-app'
        CONTAINER_NAME = 'vaultcase-container'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:v1 .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 80:80 --name $CONTAINER_NAME $IMAGE_NAME:v1'
            }
        }
    }
}
