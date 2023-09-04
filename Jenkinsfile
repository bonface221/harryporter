pipeline {
    agent any

    stages{
        stage('Code'){
            steps{
                git url: 'https://github.com/Topsideboss2/harryporter.git', branch: 'master'
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
                sh 'docker login -u topsideboss2 -p $PASSWORD'
                }
            }
        }
        stage("Push Image to Docker Hub"){
        steps{
            sh 'docker tag harryporter topsideboss2/harryporter:latest'
            sh 'docker push topsideboss2/harryporter:latest'
            }
        }
        stage('Deploy'){
            steps{
                sh "docker run --name harry -p 8080:80 -d harryporter"
            }
        }
    }
}