## FSD 폴더 구조 설명

### Layer 설명

> src/
> ├── pages/ // 애플리케이션의 페이지가 위치하는 레이어 / 라우트별 엔트리 포인트
> │ └── index.tsx
> ├── app/ // 프로바이더, 라우터, 전역 스타일, 전역 타입 선언 등이 여기에서 정의
> │ ├── providers/
> │ └── global.css
> ├── features/ // 사용자 시나리오와 관련된 비즈니스 로직 / 구체적 기능 단위
> │ ├── auth/ // 구체적인 사용자 행동 또는 기능 단위에 집중, 예컨대 로그인, 결제, 상품 구매, 프로필 수정 등.
> │ │ ├── hooks.ts // 해당 기능 관련 커스텀 훅
> │ │ └── components/ // 그 기능과 관련된 UI 컴포넌트
> │ ├── cart/
> │ └── profile/
> ├── entities/ // 핵심 비즈니스 엔티티 / 데이터 구조 및 도메인 모델
> │ ├── User.ts // 일반적으로 API 통신 데이터 포맷이나, 가공된 도메인 오브젝트를 정의.
> │ ├── Product.ts
> │ └── Order.ts
> ├── shared/ // 다양한 레이어에서 공유하는 유틸, 타입, 공통 컴포넌트
> │ ├── hooks/
> │ ├── utils/
> │ ├── components/
> │ └── constants.ts

### Segment 설명

> features/
> ├── auth/
> │ ├── ui/ // UI 컴포넌트 (ex. LoginForm.tsx)
> │ ├── model/ // 비즈니스 로직과 상태 관리를 담당
> │ ├── api/ // API 요청 담당
> │ ├── util/ // 커스텀 훅 및 기타 함수
> │ └── constants.ts // 상수값들
