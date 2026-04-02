import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

type NicknameStatus = "idle" | "checking" | "available" | "taken";

const Register = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) navigate("/signup", { replace: true });
  }, [token, navigate]);

  // 컴포넌트 마운트 시 URL에서 token 파라미터 제거 (브라우저 히스토리 노출 방지)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("token")) {
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setNicknameStatus("idle");
  };

  const handleCheckNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    setChecking(true);
    try {
      const { available } = await apiRequest<{ available: boolean }>(
        `/api/users/check-nickname?nickname=${encodeURIComponent(trimmed)}`
      );
      setNicknameStatus(available ? "available" : "taken");
    } catch {
      toast.error("중복 확인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async () => {
    if (nicknameStatus !== "available") return;
    setSubmitting(true);
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ nickname: nickname.trim(), token }),
      });
      window.location.href = "/";
    } catch {
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBorderClass =
    nicknameStatus === "available"
      ? "border-green-500 focus-visible:ring-green-500"
      : nicknameStatus === "taken"
      ? "border-red-500 focus-visible:ring-red-500"
      : "";

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

        {/* 안내 문구 */}
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
          닉네임을 설정해주세요
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          지인살롱에서 사용할 닉네임을 입력해주세요.
        </p>

        {/* 닉네임 입력 */}
        <div className="mt-10 space-y-3 text-left">
          <Label htmlFor="nickname" className="text-sm font-medium text-foreground">
            닉네임
          </Label>

          {/* 입력 필드 + 중복 확인 버튼 */}
          <div className="flex gap-2">
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheckNickname()}
              placeholder="닉네임 입력 (최대 20자)"
              maxLength={20}
              className={`h-11 flex-1 ${inputBorderClass}`}
            />
            <Button
              type="button"
              variant="outline"
              className="h-11 shrink-0 px-4"
              onClick={handleCheckNickname}
              disabled={checking || !nickname.trim()}
            >
              {checking ? "확인 중..." : "중복 확인"}
            </Button>
          </div>

          {/* 글자 수 + 상태 메시지 */}
          <div className="flex items-center justify-between">
            {nicknameStatus === "available" && (
              <p className="text-xs font-medium text-green-600">사용 가능한 닉네임입니다.</p>
            )}
            {nicknameStatus === "taken" && (
              <p className="text-xs font-medium text-red-500">이미 사용 중인 닉네임입니다.</p>
            )}
            {(nicknameStatus === "idle" || nicknameStatus === "checking") && (
              <span />
            )}
            <p className="ml-auto text-xs text-muted-foreground">{nickname.length}/20</p>
          </div>

          {/* 회원가입 버튼 */}
          <Button
            size="lg"
            className="mt-2 w-full"
            onClick={handleSubmit}
            disabled={nicknameStatus !== "available" || submitting}
          >
            {submitting ? "가입 중..." : "회원가입 완료"}
          </Button>
        </div>

        {/* 하단 안내 */}
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground/70">
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

export default Register;
