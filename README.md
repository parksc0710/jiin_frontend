# 지인살롱 프론트엔드

믿음 안에서 삶의 결이 같은 사람들을 이어주는 모임 플랫폼 **지인살롱**의 프론트엔드 프로젝트입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18, TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui (Radix UI) |
| 라우팅 | React Router DOM v6 |
| 서버 상태 관리 | TanStack Query (React Query) |
| 폼 관리 | React Hook Form + Zod |
| 아이콘 | Lucide React |
| 차트 | Recharts |
| 테스트 | Vitest + Testing Library |

## 주요 기능

- **소셜 로그인**: 카카오, 네이버 OAuth2
- **인증 상태 관리**: HttpOnly 쿠키 기반 로그인 유지


## 시작하기

### 환경 요구사항

- Node.js 18+
- bun (권장) 또는 npm

### 설치

```bash
bun install
# 또는
npm install
```

### 개발 서버 실행

```bash
bun dev
# 또는
npm run dev
```

개발 서버는 `http://localhost:8088`에서 실행됩니다.  
`/api` 경로는 백엔드 서버(`http://localhost:8080`)로 프록시됩니다.

### 빌드

```bash
# 프로덕션 빌드
bun run build

# 개발 모드 빌드
bun run build:dev
```

### 테스트

```bash
# 단일 실행
bun test

# 워치 모드
bun run test:watch
```

## 프로젝트 구조

```
src/
├── components/         # 공통 컴포넌트
│   ├── Header.tsx      # 상단 네비게이션 (로그인/로그아웃)
│   ├── Hero.tsx        # 히어로 배너
│   ├── Footer.tsx      # 하단 푸터
│   ├── MeetingCard.tsx # 모임 카드
│   ├── NavLink.tsx     # 네비게이션 링크
│   └── ui/             # shadcn/ui 컴포넌트
├── context/
│   └── AuthContext.tsx # 인증 상태 전역 관리
├── hooks/
│   └── useMeetings.ts  # 모임 목록 상태 훅
├── lib/
│   ├── api.ts          # API 요청 유틸리티
│   └── utils.ts        # 공통 유틸
├── pages/
│   ├── Index.tsx       # 메인 홈
│   ├── MeetingDetail.tsx # 모임 상세
│   ├── Signup.tsx      # 로그인/회원가입
│   └── NotFound.tsx    # 404
└── test/               # 테스트 파일
```

## 백엔드 연동

백엔드 API 서버(Spring Boot)가 `http://localhost:8080`에서 실행 중이어야 합니다.

| API | 설명 |
|-----|------|
| `GET /api/users/me` | 로그인 유저 정보 조회 |
| `POST /api/auth/logout` | 로그아웃 |
| `GET /api/oauth2/authorization/kakao` | 카카오 OAuth2 로그인 |
| `GET /api/oauth2/authorization/naver` | 네이버 OAuth2 로그인 |
