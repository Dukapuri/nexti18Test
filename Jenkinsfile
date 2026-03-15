pipeline {
    agent any

    environment {
        // GitHub 레포지토리 URL (본인 것으로 변경)
        GIT_REPO = 'https://github.com/Dukapuri/nexti18Test.git'
        GIT_BRANCH = 'main'

        // Docker 이미지 이름
        DOCKER_IMAGE = 'my-next-app'
        DOCKER_TAG = "${BUILD_NUMBER}"

        // docker-compose 파일 경로 (Jenkins 워크스페이스 기준)
        COMPOSE_PROJECT_DIR = '/home/project'  // 실제 경로로 변경
    }

    stages {
        // ========================================
        // 1단계: 소스코드 체크아웃
        // ========================================
        stage('Checkout') {
            steps {
                echo '📥 GitHub에서 소스코드 가져오는 중...'
                git branch: "${GIT_BRANCH}",
                    url: "${GIT_REPO}",
                    credentialsId: 'd6f230f0-e024-4bcd-a874-369adabfda24'  // Jenkins에 등록한 자격증명 ID
            }
        }

        // ========================================
        // 2단계: Next.js Docker 이미지 빌드
        // ========================================
        stage('Build Docker Image') {
            steps {
                echo '🐳 Docker 이미지 빌드 중...'
                sh """
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }

        // ========================================
        // 3단계: 기존 컨테이너 중지 & 새 컨테이너 실행
        // ========================================
        stage('Deploy') {
            steps {
                echo '🚀 배포 시작...'
                sh """
                    docker rm -f nextjs || true

                    cd ${COMPOSE_PROJECT_DIR}
                    docker-compose up -d nextjs
                """
            }
        }

        // ========================================
        // 4단계: 배포 확인 (헬스체크)
        // ========================================
        stage('Health Check') {
            steps {
                echo '✅ 배포 상태 확인 중...'
                sh """
                    sleep 10
                    docker inspect nextjs --format '{{.State.Running}}' | grep true || exit 1
                """
            }
        }

        // ========================================
        // 5단계: 오래된 Docker 이미지 정리
        // ========================================
        stage('Cleanup') {
            steps {
                echo '🧹 이전 이미지 정리 중...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo '🎉 배포 성공!'
        }
        failure {
            echo '❌ 배포 실패 - 로그를 확인해주세요.'
        }
    }
}
