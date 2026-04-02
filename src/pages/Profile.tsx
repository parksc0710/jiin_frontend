import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

const PROVIDER_LABEL: Record<string, { label: string; style: React.CSSProperties }> = {
  kakao: { label: "카카오", style: { backgroundColor: "#FEE500", color: "#191919" } },
  naver: { label: "네이버", style: { backgroundColor: "#03C75A", color: "#FFFFFF" } },
};

type NicknameStatus = "idle" | "checking" | "available" | "taken";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/signup", { replace: true });
    }
    if (user) {
      setNickname(user.nickname);
    }
  }, [user, isLoading, navigate]);

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

  const isUnchanged = nickname.trim() === user?.nickname;
  const canSave = isUnchanged || nicknameStatus === "available";

  const handleSave = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    if (!canSave) return;
    setSaving(true);
    try {
      await apiRequest("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({ nickname: trimmed }),
      });
      toast.success("닉네임이 변경되었습니다!");
    } catch {
      toast.error("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">불러오는 중...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const provider = PROVIDER_LABEL[user.provider] ?? { label: user.provider, style: {} };
  const initial = user.nickname.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8 md:py-16">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </button>

          <div className="mx-auto max-w-md">
            <h1 className="mb-8 text-2xl font-bold text-foreground">회원 정보</h1>

            <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
              {/* 아바타 */}
              <div className="mb-8 flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {initial}
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={provider.style}
                >
                  {provider.label}로 로그인 중
                </span>
              </div>

              {/* 닉네임 입력 */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-sm font-medium text-foreground">
                    닉네임
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="nickname"
                      value={nickname}
                      onChange={(e) => handleNicknameChange(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !isUnchanged && handleCheckNickname()}
                      placeholder="닉네임을 입력해주세요"
                      maxLength={20}
                      className={`h-11 flex-1 ${
                        !isUnchanged && nicknameStatus === "available"
                          ? "border-green-500 focus-visible:ring-green-500"
                          : !isUnchanged && nicknameStatus === "taken"
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 shrink-0 px-4"
                      onClick={handleCheckNickname}
                      disabled={checking || !nickname.trim() || isUnchanged}
                    >
                      {checking ? "확인 중..." : "중복 확인"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    {!isUnchanged && nicknameStatus === "available" && (
                      <p className="text-xs font-medium text-green-600">사용 가능한 닉네임입니다.</p>
                    )}
                    {!isUnchanged && nicknameStatus === "taken" && (
                      <p className="text-xs font-medium text-red-500">이미 사용 중인 닉네임입니다.</p>
                    )}
                    {(isUnchanged || nicknameStatus === "idle" || nicknameStatus === "checking") && (
                      <span />
                    )}
                    <p className="ml-auto text-xs text-muted-foreground">{nickname.length}/20</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleSave}
                  disabled={saving || !canSave}
                >
                  {saving ? "저장 중..." : "저장하기"}
                </Button>
              </div>
            </div>

            {/* 로그아웃 */}
            <div className="mt-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-muted-foreground"
                onClick={logout}
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
