pipeline {
    agent none
    stages {
        stage('Set pipeline name') {
            steps {
                script {
                    currentBuild.displayName = "#${env.BUILD_NUMBER.toInteger()} [origin/${env.ghprbSourceBranch}] (${env.ghprbActualCommit.take(7)})"
                }
            }
        }
        stage('Client') {
            agent {
                docker {
                    image 'teracy/angular-cli'
                    args '-u 0:0 --entrypoint=""'
                }
            }
            stages {
                stage('Install dependencies') {
                    steps {
                        dir("client") {
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
                stage('Unit tests') {
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
            }
        }
        stage('Server') {
            agent {
                docker {
                    image 'node:12.9.0-alpine'
                    args '-u 0:0 --entrypoint=""'
                }
            }
            stages {
                stage('Install dependencies') {
                    steps {
                        dir("server") {
                            sh 'npm install'
                        }
                    }
                }
                stage('Linter check') {
                    steps {
                        dir("server") {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('Unit tests') {
                    steps {
                        dir("server") {
                            sh 'npm run test'
                        }
                    }
                }
            }
        }
    }
}
