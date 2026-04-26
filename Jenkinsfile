pipeline {
    agent any

    environment {
        IMAGE_NAME = "vaultcase-app:v1"
        CONTAINER_NAME = "vaultcase-container"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/eng24ct0060-commits/vaultcase.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh '''
                docker ps -q --filter "name=$CONTAINER_NAME" | xargs -r docker stop
                docker ps -aq --filter "name=$CONTAINER_NAME" | xargs -r docker rm
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p 80:3000 \
                $IMAGE_NAME
                '''
            }
        }
    }
}
