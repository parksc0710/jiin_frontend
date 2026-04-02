import { MessageCircle } from "lucide-react";

const Signup = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm text-center">
        {/* 로고 */}
        <a href="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="text-base font-bold text-primary-foreground">모</span>
          </div>
          <span className="text-xl font-semibold text-foreground">지인살롱</span>
        </a>

        {/* 환영 문구 */}
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
          지인살롱에 오신 것을<br />환영합니다
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          믿음 안에서 삶의 결이 같은 사람들을 만나보세요.
        </p>

        {/* 소셜 로그인 버튼 */}
        <div className="mt-10 flex flex-col gap-3">
          <button
            className="flex h-13 w-full items-center justify-center gap-3 rounded-xl text-[15px] font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FEE500", color: "#191919" }}
            onClick={() => { window.location.href = "http://localhost:8080/api/oauth2/authorization/kakao"; }}
          >
            <MessageCircle className="h-5 w-5" />
            카카오톡으로 시작하기
          </button>

          <button
            className="flex h-13 w-full items-center justify-center gap-3 rounded-xl text-[15px] font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#03C75A", color: "#FFFFFF" }}
            onClick={() => { window.location.href = "http://localhost:8080/api/oauth2/authorization/naver"; }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
            </svg>
            네이버로 시작하기
          </button>
        </div>

        {/* 하단 안내 */}
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground/70">
          가입 시 지인살롱의{" "}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">이용약관</a>
          {" "}및{" "}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">개인정보처리방침</a>
          에 동의하게 됩니다.
        </p>

        <a
          href="/"
          className="mt-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default Signup;
