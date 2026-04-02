import { Button } from "@/components/ui/button";
const Header = () => {
  return <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* 로고 */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">모</span>
          </div>
          <span className="text-lg font-semibold text-foreground">지인살롱</span>
        </a>

        {/* 네비게이션 */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">지인 만남</a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">지인 독서</a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">커뮤니티</a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">문의하기</a>
        </nav>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            로그인
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <a href="/signup">가입하기</a>
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;