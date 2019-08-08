pipeline {
    agent {
        docker {
            image 'teracy/angular-cli'
            args '-u 0:0 --entrypoint=""'
        }
    }
    stages {
        stage('set pepline name'){
            steps {
                script {
                    currentBuild.displayName = "#${env.BUILD_NUMBER.toInteger()}[${env.GIT_BRANCH}](${env.GIT_COMMIT.take(7)})"
                    echo env.GIT_BRANCH
                    echo env.GIT_COMMIT
                    echo env.GIT_COMMIT.take(7)
                }
            }
        }
        stage('npm install') {
            steps {
                dir("client"){
                    sh 'npm install'
                }
            }
        }
        stage('Unit Tests') {
            steps {
                dir("client"){
                    sh 'npm run test:ci'
                }
            }
        }
        stage('e2e tests') {
            steps {
                dir("client"){
                   sh 'npm run e2e:ci'
                }
            }
        }
    }
}
