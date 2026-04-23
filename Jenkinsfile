pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/eng24ct0060-commits/vaultcase.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying..."
            }
        }
    }
}
