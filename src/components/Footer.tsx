const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">모</span>
            </div>
            <span className="text-lg font-semibold text-foreground">모임터</span>
          </div>

          {/* 링크 */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              서비스 소개
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              이용약관
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              개인정보처리방침
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              자주 묻는 질문
            </a>
          </nav>

          {/* 저작권 */}
          <p className="text-xs text-muted-foreground">
            © 2024 모임터. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
