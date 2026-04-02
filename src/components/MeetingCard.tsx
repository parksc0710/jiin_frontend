import { Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface MeetingCardProps {
  id?: number;
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  currentMembers?: number;
  maxMembers?: number;
  isNew?: boolean;
  isClosed?: boolean;
  isAlmostClosed?: boolean;
  almostClosedText?: string;
  ageRange?: string;
  isEnded?: boolean;
}

const MeetingCard = ({
  id,
  image,
  category,
  title,
  description,
  date,
  currentMembers,
  maxMembers,
  isNew,
  isClosed,
  isAlmostClosed,
  almostClosedText,
  ageRange,
  isEnded,
}: MeetingCardProps) => {
  const content = (
    <article className="group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* 이미지 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isEnded && (
          <Badge variant="closed" className="absolute left-3 top-3">
            종료
          </Badge>
        )}
        {isNew && !isEnded && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            NEW
          </Badge>
        )}
        {isClosed && !isEnded && (
          <Badge variant="closed" className="absolute left-3 top-3">
            마감
          </Badge>
        )}
        {isAlmostClosed && !isClosed && !isEnded && (
          <Badge variant="almostClosed" className="absolute left-3 top-3">
            마감 임박
          </Badge>
        )}
        {ageRange && (
          <Badge variant="secondary" className="absolute right-3 top-3 bg-accent text-accent-foreground font-bold">
            {ageRange}
          </Badge>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-5">
        {/* 카테고리 */}
        <span className="text-xs font-medium text-primary">{category}</span>

        {/* 제목 */}
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* 설명 */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* 정보 */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        </div>

        {/* 모집 현황 */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            {isClosed ? (
              <span className="font-medium text-muted-foreground">
                {currentMembers && maxMembers
                  ? `${currentMembers}/${maxMembers}명 신청 완료`
                  : "마감 완료"}
              </span>
            ) : (
              <span className="font-medium text-foreground">
                {currentMembers}/{maxMembers}명 신청 중
              </span>
            )}
          </div>
          {isAlmostClosed && !isClosed && (
            <span className="text-xs font-medium text-orange-500">
              {almostClosedText}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (id) {
    return <Link to={`/meeting/${id}`} className="block">{content}</Link>;
  }
  return content;
};

export default MeetingCard;