import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MeetingCard from "@/components/MeetingCard";
import Footer from "@/components/Footer";
import { useMeetings } from "@/hooks/useMeetings";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
    <p className="mt-2 text-muted-foreground">{subtitle}</p>
  </div>
);

const Index = () => {
  const { meetingCategory, readingCategory, ended, loading } = useMeetings();
  const [showAllPast, setShowAllPast] = useState(false);

  // 최신 3개만 먼저 보여주기
  const visiblePast = ended.slice(0, 3);
  const hiddenPast = ended.slice(3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* 지인 만남 섹션 */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <SectionHeader
              title="지인 만남"
              subtitle="조건보다 중심을 마주하는 6대6 미팅 모임"
            />
            {loading ? (
              <p className="text-muted-foreground">불러오는 중...</p>
            ) : (
              <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4 md:-ml-6">
                  {meetingCategory.map((m) => (
                    <CarouselItem key={m.id} className="pl-4 md:pl-6 basis-[85%] sm:basis-[70%] lg:basis-[45%]">
                      <MeetingCard
                        id={m.id}
                        image={m.image}
                        category={m.category}
                        title={m.title}
                        description={m.description}
                        date={m.date}
                        currentMembers={m.current_members}
                        maxMembers={m.max_members}
                        isNew={m.is_new}
                        isClosed={m.is_closed}
                        ageRange={m.age_range ?? undefined}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:inline-flex -left-5 border-border bg-card hover:bg-accent" />
                <CarouselNext className="hidden md:inline-flex -right-5 border-border bg-card hover:bg-accent" />
              </Carousel>
            )}
          </div>
        </section>

        {/* 지인 독서 섹션 */}
        <section className="py-16 md:py-24 bg-accent/30">
          <div className="container mx-auto px-6">
            <SectionHeader
              title="지인 독서"
              subtitle="말씀과 지혜를 나누는 깊이 있는 독서 모임"
            />
            {loading ? (
              <p className="text-muted-foreground">불러오는 중...</p>
            ) : (
              <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4 md:-ml-6">
                  {readingCategory.map((m) => (
                    <CarouselItem key={m.id} className="pl-4 md:pl-6 basis-[85%] sm:basis-[70%] lg:basis-[45%]">
                      <MeetingCard
                        id={m.id}
                        image={m.image}
                        category={m.category}
                        title={m.title}
                        description={m.description}
                        date={m.date}
                        currentMembers={m.current_members}
                        maxMembers={m.max_members}
                        isNew={m.is_new}
                        isClosed={m.is_closed}
                        ageRange={m.age_range ?? undefined}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:inline-flex -left-5 border-border bg-card hover:bg-accent" />
                <CarouselNext className="hidden md:inline-flex -right-5 border-border bg-card hover:bg-accent" />
              </Carousel>
            )}
          </div>
        </section>

        {/* 지난 기록 */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <SectionHeader
              title="지인살롱의 지난 기록"
              subtitle="소중했던 만남의 기록들"
            />
            
            {/* 처음 3개 카드 */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-60">
              {visiblePast.map((m) => (
                <MeetingCard
                  key={m.id}
                  id={m.id}
                  image={m.image}
                  category={m.category}
                  title={m.title}
                  description={m.description}
                  date={m.date}
                  currentMembers={m.current_members}
                  maxMembers={m.max_members}
                  isClosed
                  isEnded
                  ageRange={m.age_range ?? undefined}
                />
              ))}
            </div>

            {/* 더보기 버튼 및 펼쳐진 카드들 */}
            {hiddenPast.length > 0 && (
              <div className="mt-8">
                {showAllPast && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-60 animate-in slide-in-from-top-4 duration-500">
                    {hiddenPast.map((m) => (
                      <MeetingCard
                        key={m.id}
                        id={m.id}
                        image={m.image}
                        category={m.category}
                        title={m.title}
                        description={m.description}
                        date={m.date}
                        currentMembers={m.current_members}
                        maxMembers={m.max_members}
                        isClosed
                        isEnded
                        ageRange={m.age_range ?? undefined}
                      />
                    ))}
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAllPast(!showAllPast)}
                    className="gap-2"
                  >
                    {showAllPast ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        접기
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        지난 기록 더보기
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
