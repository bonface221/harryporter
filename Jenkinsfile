pipeline {
    agent any

    stages{
        stage('Code'){
            steps{
                git url: 'https://github.com/<dockerhub-username>/harryporter.git', branch: 'master'
            }
        }
        stage('Build'){
            steps{
                sh 'docker build . -t harryporter'
                sh 'docker image list'
            }
        }
        stage('Login'){
            steps{
                withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'PASSWORD')]) {
                sh 'docker login -u <dockerhub-username> -p $PASSWORD'
                }
            }
        }
        stage("Push Image to Docker Hub"){
        steps{
            sh 'docker tag harryporter <dockerhub-username>/harryporter:latest'
            sh 'docker push <dockerhub-username>/harryporter:latest'
            }
        }
        stage('Deploy'){
            steps{
                sh "docker run --name harry -p 8081:80 -d harryporter"
            }
        }
    }
}