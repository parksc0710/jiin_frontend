import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-b from-primary-light to-background py-24 md:py-32">
      <div className="container mx-auto px-6 text-center">
        {/* 서브텍스트 */}
        <p className="text-sm font-medium tracking-wide text-primary">
          새로운 사람들과 함께하는 경험
        </p>

        {/* 메인 타이틀 */}
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          삶의 결이 같은 크리스천,<br />
          지인살롱에서 만나다<br />
          <span className="text-primary">특별한 모임</span>을 시작하세요
        </h1>

        {/* 설명 */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          믿음 안에서 삶의 고민과 가치관을 나누는 우리들만의 공간입니다.<br />
          조건보다 중심을 보는 '지인 만남'부터, 말씀과 지혜를 나누는 '지인 독서'까지.<br />
          지인살롱에서 당신의 소중한 지체들을 만나보세요.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 bg-primary px-8 hover:bg-primary/90">
            모임 둘러보기
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-border px-8 hover:bg-accent">
            모임 만들기
          </Button>
        </div>

        {/* 통계 */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 border-t border-border/50 pt-10 md:grid-cols-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">Faith</p>
            <p className="mt-2 text-sm font-medium text-foreground">신앙 기반의 커뮤니티</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">세상의 기준이 아닌 하나님 나라의 가치관을 먼저 생각합니다.</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">Growth</p>
            <p className="mt-2 text-sm font-medium text-foreground">함께하는 영적 성장</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">지인 독서와 나눔을 통해 삶의 지혜를 함께 채워갑니다.</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">Connect</p>
            <p className="mt-2 text-sm font-medium text-foreground">진실한 지체와의 만남</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">조건이라는 편견 없이 서로의 중심을 마주하는 연결을 꿈꿉니다.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;