import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE } from "@/lib/api";

interface User {
  userId: number;
  nickname: string;
  profileImage: string | null;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 인증이 필요 없는 페이지에서는 유저 확인 생략
    const skipAuthPaths = ["/signup", "/register"];
    if (skipAuthPaths.includes(window.location.pathname)) {
      setIsLoading(false);
      return;
    }

    // apiRequest 대신 raw fetch 사용: 401은 미로그인 정상 응답이므로 리다이렉트하지 않음
    fetch(`${API_BASE}/api/users/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  return ctx;
};
