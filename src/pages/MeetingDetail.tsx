import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Meeting {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  max_members: number;
  current_members: number;
  is_new: boolean;
  is_closed: boolean;
  is_ended: boolean;
  age_range: string | null;
  google_form_url: string | null;
}

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    apiRequest<Meeting>(`/api/meetings/${id}`)
      .then((data) => setMeeting(data))
      .catch(() => setMeeting(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!meeting || meeting.is_closed || meeting.is_ended) return;
    if (meeting.current_members >= meeting.max_members) return;

    setApplying(true);
    try {
      await apiRequest("/api/applications", {
        method: "POST",
        body: JSON.stringify({ meeting_id: meeting.id }),
      });

      toast.success("신청이 완료되었습니다!");
      setMeeting((prev) =>
        prev ? { ...prev, current_members: prev.current_members + 1 } : prev
      );

      if (meeting.google_form_url) {
        window.open(meeting.google_form_url, "_blank", "noopener,noreferrer");
      }
    } catch {
      toast.error("신청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
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

  if (!meeting) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">모임을 찾을 수 없습니다.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isFull = meeting.current_members >= meeting.max_members;

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

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={meeting.image}
                alt={meeting.title}
                className="aspect-[4/3] w-full object-cover"
              />
              {meeting.age_range && (
                <Badge variant="secondary" className="absolute right-4 top-4 bg-accent text-accent-foreground font-bold">
                  {meeting.age_range}
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-sm font-medium text-primary">{meeting.category}</span>
                <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                  {meeting.title}
                </h1>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {meeting.description}
                </p>
              </div>

              <div className="space-y-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">일시</p>
                    <p className="font-medium text-foreground">{meeting.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">장소</p>
                    <p className="font-medium text-foreground">{meeting.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">모집 현황</p>
                    <p className="font-medium text-foreground">
                      {meeting.current_members}/{meeting.max_members}명
                      {isFull ? " (마감)" : " 신청 중"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(meeting.current_members / meeting.max_members) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {meeting.max_members - meeting.current_members}자리 남음
                </p>
              </div>

              {meeting.is_ended ? (
                <Button disabled size="lg" className="w-full">
                  종료된 모임입니다
                </Button>
              ) : isFull || meeting.is_closed ? (
                <Button disabled size="lg" className="w-full">
                  마감되었습니다
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full text-base"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? "신청 중..." : "신청하기"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetingDetail;
