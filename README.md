# jiin_frontend

지인(JIIN) 서비스의 프론트엔드 프로젝트입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 언어 | TypeScript 5.9 |
| 빌드 도구 | Vite 8 |
| 스타일 | Tailwind CSS 4 |
| 린터 | ESLint 9 |

## 개발 환경 요구사항

- **Node.js** 18 이상
- **npm** 9 이상

## 프로젝트 구조

```
jiin_frontend/
├── public/          # 정적 파일
├── src/
│   ├── assets/      # 이미지, SVG 등 정적 리소스
│   ├── App.tsx      # 루트 컴포넌트
│   ├── App.css      # 루트 스타일
│   ├── main.tsx     # 앱 진입점
│   └── index.css    # 글로벌 스타일
├── index.html
├── vite.config.ts   # Vite 설정
├── tsconfig.json    # TypeScript 기본 설정
├── tsconfig.app.json
└── package.json
```

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173` 에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

### 린트 검사

```bash
npm run lint
```

## TypeScript 설정

- **타겟**: ES2023
- **모듈 방식**: ESNext (Bundler 모드)
- **JSX**: react-jsx
- **엄격 모드**: 활성화 (`strict: true`)
- **미사용 변수/파라미터 검사**: 활성화

## 저장소

- **GitHub**: [https://github.com/parksc0710/jiin_frontend](https://github.com/parksc0710/jiin_frontend)
