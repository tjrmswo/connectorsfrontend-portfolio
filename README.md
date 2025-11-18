# Connectors

<div align="center">
  <img width="441" height="197" alt="image" src="https://github.com/user-attachments/assets/dc07a36a-df84-46be-bd93-c32970a8e32f" />
</div>
<br />
<br />

## Introduce
<div>개발기간: 2025.05 ~ 현재 진행중</div>
<div>프로젝트 소개: 취업준바생을 위한 맞춤 커리큘럼을 제공하고 필요에 따라 전문가와 연결을 통해 솔루션을 제공하는 서비스</div>
<br />
<br />

## 배포 주소
FE: https://dev-web.connectforme.com/ <br />
BE: https://dev-api.connectforme.com/
<br />
<br />

## 버전 명시
nodejs: **22.13.0** <br />
next: **15.5.4** <br />
pnpm: **10.15.1** <br />
<br />
<br />

## 설치 및 실행
```bash
# 클론 및 설치
git clone https://github.com/goldencompass2022/connectorsfrontend
cd connectorsfrontend
pnpm install

# 개발 서버 실행 (HTTPS)
pnpm devs

# Docker로 실행
docker build -t connectors .
docker run -d -p 3000:3000 --name connectingRoad connectors
```
<br />
<br />

### ⚒️ Stacks
`Frontend`
<p>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
</p>
State Management
<p>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
</p>
Styling
<p>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">
</p>
DevOps
<p>
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/AWS CodeDeploy-5395FD?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/AWS ELB-FF9900?style=for-the-badge&logo=awselasticloadbalancing&logoColor=white">
  <img src="https://img.shields.io/badge/AWS S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/Route 53-512BD4?style=for-the-badge&logo=amazons3&logoColor=white">
</p>
<br />
<br />

## 시스템 아키텍쳐
<img width="2816" height="1655" alt="Connectors system_Architectures" src="https://github.com/user-attachments/assets/891a5cfd-a780-4ed0-b10a-bbced62b0c96" />

## 📁 폴더 구조
```.
├── .github
├── public/
│   ├── font
│   └── images
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── callback
│   │   │   ├── login
│   │   │   ├── signupFinish
│   │   │   └── termsAgreement
│   │   ├── home/
│   │   │   ├── content
│   │   │   ├── profile/
│   │   │   │   ├── career/
│   │   │   │   │   └── mycareer
│   │   │   │   ├── default
│   │   │   │   ├── myprofile
│   │   │   │   └── resume
│   │   │   ├── roadMap
│   │   │   └── search
│   │   └── user
│   ├── entities/
│   │   ├── profile
│   │   └── term
│   ├── features/
│   │   ├── auth
│   │   ├── career
│   │   ├── onboarding
│   │   ├── splash
│   │   └── termAgree
│   ├── lib
│   ├── shared/
│   │   ├── api
│   │   ├── constants
│   │   ├── hooks
│   │   ├── lib
│   │   ├── model
│   │   ├── providers
│   │   ├── ui
│   │   └── util
│   └── wigdgets/
│       ├── bottomTab
│       └── header
├── .dockerignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```
