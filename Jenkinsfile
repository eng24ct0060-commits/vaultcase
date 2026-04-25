
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
                // add build commands here (mvn, npm, gradle, etc.)
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying..."
                // add deployment commands here
            }
        }
    }
}
