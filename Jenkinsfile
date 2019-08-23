pipeline {
    agent {
        docker {
            image 'teracy/angular-cli'
            args '-u 0:0 --entrypoint=""'
        }
    }
    stages {
        stage('Set pepline name') {
            steps {
                script {
                    currentBuild.displayName = "#${env.BUILD_NUMBER.toInteger()}[${env.GIT_BRANCH}](${env.GIT_COMMIT.take(7)})"
                }
            }
        }
        stage('Client npm install') {
            steps {
                dir("client"){
                    sh 'npm install'
                }
            }
        }
        stage('Linter check') {
            steps {
                dir("client") {
                    sh 'ng lint'
                }
            }
        }
        stage('Build') {
            steps {
                dir("client") {
                    sh 'ng build'
                }
            }
        }
        stage('Unit tests client') {
            steps {
                dir("client") {
                    sh 'npm run test:ci'
                }
            }
        }
        stage('e2e tests') {
            steps {
                dir("client") {
                   sh 'npm run e2e:ci'
                }
            }
        }
        stage('Server npm install') {
            steps {
                dir("server") {
                    sh 'npm install'
                }
            }
        }
        stage('Unit tests server') {
            steps {
                dir("server") {
                    sh 'npm run test'
                }
            }
        }
    }
}
