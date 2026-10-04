pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        SELENIUM_URL = 'http://selenium:4444/wd/hub'
        APP_URL      = 'http://jenkins:3000'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('UI Test') {
            steps {
                sh 'nohup node src/app.js > app.log 2>&1 &'
                sh 'npm test -- tests/e2e'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: '**/junit.xml, **/test-results.xml'
        }
    }
}