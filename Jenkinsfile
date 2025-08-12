pipeline {
  agent any
  environment {
    IMAGE_PREFIX = '117.102.70.147'
	IMAGE_APP_NAME = 'unigo-microsite-kurir-service'
    IMAGE_TAG = 'latest'
    PRIVATE_REGISTRY_URL = '117.102.70.147'
    PRIVATE_REGISTRY_USER = 'devofficial'
    PRIVATE_REGISTRY_PASSWORD = 'Thomas110515'
    DOCKER_NETWORK = 'unigoplatformnet'
    DOCKER_LOG_PATH = '/home/unigo/microsite/logs'
  }

  stages {
    stage('Branch Validation') {
      steps {
        script {
          def allowedBranches = ['main', 'sandbox']
          if (!allowedBranches.contains(env.BRANCH_NAME)) {
            currentBuild.result = 'ABORTED'
            error "🚫 Branch '${env.BRANCH_NAME}' tidak diizinkan. Pipeline dihentikan."
          } else {
            echo "✅ Branch '${env.BRANCH_NAME}' diizinkan, melanjutkan pipeline."
          }
        }
      }
    }

    stage('Update ENV Value Branch Production (main) or Sandbox (sandbox)') {
      steps {
        script {
          if (env.BRANCH_NAME == 'main') {
            env.SERVER_ADDRESS = '8.215.77.122'
            env.SERVER_SSH_PORT = '22'
            env.SERVER_SSH_USER = 'deden'
            env.SERVER_SSH_PASSWORD = 'd3d3n_p0sf1n2024'
            env.SERVER_SSH_PASSWORD = "qeadzc321"
            env.DOCKERFILE_ENV = "Dockerfile.prod"
          } else {
            env.SERVER_ADDRESS = '117.102.70.147'
            env.SERVER_SSH_PORT = '9900'
            env.SERVER_SSH_USER = 'deden'
            env.SERVER_SSH_PASSWORD = 'Thomas110515'
            env.DOCKERFILE_ENV = "Dockerfile.sandbox"
          }

          echo "ENVIRONMENT CONFIGURATION:"
          echo "SERVER_ADDRESS=${env.SERVER_ADDRESS}"
          echo "SERVER_SSH_PORT=${env.SERVER_SSH_PORT}"
          echo "SERVER_SSH_USER=${env.SERVER_SSH_USER}"
          echo "SERVER_SSH_PASSWORD=${env.SERVER_SSH_PASSWORD}"
          echo "DOCKERFILE_ENV=${env.DOCKERFILE_ENV}"
        }
      }
    }

    stage('Build image') {
      steps {
        sh 'docker build -f Dockerfile.sandbox -t $IMAGE_PREFIX/$IMAGE_APP_NAME:$IMAGE_TAG .'
      }
    }
    stage('Push to docker private registry') {
      steps {
        sh '''
          docker login --username=$PRIVATE_REGISTRY_USER --password=$PRIVATE_REGISTRY_PASSWORD  $PRIVATE_REGISTRY_URL
          docker tag $IMAGE_PREFIX/$IMAGE_APP_NAME:$IMAGE_TAG $IMAGE_PREFIX/$IMAGE_APP_NAME
          docker push $IMAGE_PREFIX/$IMAGE_APP_NAME
          docker logout $PRIVATE_REGISTRY_URL
        '''
      }
    }
    stage('deploy to server') {
      steps {
        script {
          sh 'apt-get update && apt-get install -y sshpass'
          
          def result = sh(script: "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker ps -q -f status=running -f name=$IMAGE_APP_NAME'", returnStdout: true).trim()

          if (result) {
              echo "Container $IMAGE_APP_NAME exists. So, container must be stop"
              sh "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker stop $IMAGE_APP_NAME'"
          }

          sh "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker login --username=$PRIVATE_REGISTRY_USER --password=$PRIVATE_REGISTRY_PASSWORD  $PRIVATE_REGISTRY_URL'"

          sh "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker pull $IMAGE_PREFIX/$IMAGE_APP_NAME:$IMAGE_TAG'"

          sh "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker run -p 8081:3001 -d --rm echo Thomas110515 | sudo -S docker run -p 8081:3001 -d --rm \
-e DOTENV_PRIVATE_KEY_SANDBOX=ef71bfa8e4a4afd786767147d1b23a968930783689a9a55a02d26f26d0c9311a -v $DOCKER_LOG_PATH:/var/www/storage/logs --name $IMAGE_APP_NAME --network $DOCKER_NETWORK $IMAGE_PREFIX/$IMAGE_APP_NAME:$IMAGE_TAG'"

          sh "sshpass -p $SERVER_SSH_PASSWORD ssh -o StrictHostKeyChecking=no -p $SERVER_SSH_PORT $SERVER_SSH_USER@$SERVER_ADDRESS 'echo $SERVER_SSH_PASSWORD | sudo -S docker logout $PRIVATE_REGISTRY_URL'"

          sh "exit"
        }
      }
    }
  }
}
