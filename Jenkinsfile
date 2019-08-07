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
                    currentBuild.displayName = "brunch_v:"+env.GIT_BRANCH
                }
            }
        }
        stage('npm install') {
            steps {
                dir("client"){
                    sh 'npm nstall'
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