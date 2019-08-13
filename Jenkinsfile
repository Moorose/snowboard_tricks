pipeline {
  agent none
  environment {
    POSTGRES_HOST = 'localhost'
    POSTGRES_USER = 'myuser'
  }

  stages {
    stage('run postgres') {
      steps {
        script {
            docker.image('postgres:9.6').withRun(
                "-h ${env.POSTGRES_HOST} -e POSTGRES_USER=${env.POSTGRES_USER}"
            ) { db ->
                docker.image('postgres:9.6').inside("--link ${db.id}:db") {
                  sh '''
                    psql --version
                    until psql -h ${POSTGRES_HOST} -U ${POSTGRES_USER} -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
                    echo "Waiting for postgres server, $((RETRIES-=1)) remaining attempts..."
                    sleep 1
                    done
                    '''
                  sh 'echo "your commands here"'
                }
              }
            }
      }
    }
    agent {
        docker {
            image 'teracy/angular-cli'
            args '-u 0:0 --entrypoint=""'
        }
    }
    stage('set pepline name') {
        steps {
            script {
                currentBuild.displayName = "#${env.BUILD_NUMBER.toInteger()}[${env.GIT_BRANCH}](${env.GIT_COMMIT.take(7)})"
            }
        }
    }
  }
}
// pipeline {
//     agent {
//         docker {
//             image 'teracy/angular-cli'
//             args '-u 0:0 --entrypoint=""'
//         }
//     }
//     stages {
//         stage('set pepline name') {
//             steps {
//                 script {
//                     currentBuild.displayName = "#${env.BUILD_NUMBER.toInteger()}[${env.GIT_BRANCH}](${env.GIT_COMMIT.take(7)})"
//                 }
//             }
//         }
//         stage('npm install') {
//             steps {
//                 dir("client") {
//                     sh 'npm install'
//                 }
//             }
//         }
//         stage('Linter check') {
//             steps {
//                 dir("client") {
//                     sh 'ng lint'
//                 }
//             }
//         }
//         stage('Build') {
//             steps {
//                 dir("client") {
//                     sh 'ng build'
//                 }
//             }
//         }
//         stage('Unit Tests') {
//             steps {
//                 dir("client") {
//                     sh 'npm run test:ci'
//                 }
//             }
//         }
//         stage('e2e tests') {
//             steps {
//                 dir("client") {
//                    sh 'npm run e2e:ci'
//                 }
//             }
//         }
//     }
// }
