## FSD 폴더 구조 설명

### Layer 설명

```
 src/
 ├── app/ // 전역 스타일, 페이지 등이 존재
 │ ├── 페이지1
 │ ├── 페이지2
 │ ├── global.css
 │ └── shared // app 최상위의 index.tsx, layout.tsx에 관한 파일들을 정리해 놓은 폴더
 ├── features/ // 사용자 시나리오와 관련된 비즈니스 로직 / 구체적 기능 단위
 │ ├── auth/ // 구체적인 사용자 행동 또는 기능 단위에 집중, 예컨대 로그인, 결제, 상품 구매, 프로필 수정 등.
 │ │ ├── hooks.ts // 해당 기능 관련 커스텀 훅
 │ │ └── components/ // 그 기능과 관련된 UI 컴포넌트
 │ ├── content/
 │ └── profile/
 ├── entities/ // 핵심 비즈니스 엔티티 / 데이터 구조 및 도메인 모델
 │ ├── User.ts // 일반적으로 API 통신 데이터 포맷이나, 가공된 도메인 오브젝트를 정의.
 │ ├── Product.ts
 │ └── Order.ts
 ├── shared/ // 다양한 레이어에서 사용하는 비도메인 유틸, 타입, 공통 컴포넌트
 │ ├── hooks/
 │ ├── utils/
 │ ├── components/
 │ └── constants.ts
```

shared 폴더는 비도메인 혹은 페이지 폴더에서 위치가 모호한 폴더들을 정리하기 위한
폴더로서 사용된다
