import { useState } from "react";

export interface Meeting {
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

export function useMeetings() {
  const [meetings] = useState<Meeting[]>([]);
  const [loading] = useState(false);

  const extractNumber = (title: string): number => {
    const match = title.match(/\[(\d+)차\]/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const active = meetings.filter((m) => !m.is_ended);
  const ended = meetings.filter((m) => m.is_ended);

  const sortActive = (list: Meeting[]) =>
    [...list].sort((a, b) => {
      if (a.is_new !== b.is_new) return a.is_new ? -1 : 1;
      if (a.is_closed !== b.is_closed) return a.is_closed ? 1 : -1;
      return 0;
    });

  const sortEnded = (list: Meeting[]) =>
    [...list].sort((a, b) => extractNumber(b.title) - extractNumber(a.title));

  const meetingCategory = sortActive(active.filter((m) => m.category === "지인 만남"));
  const readingCategory = sortActive(active.filter((m) => m.category === "지인 독서"));
  const sortedEnded = sortEnded(ended);

  return { meetings, meetingCategory, readingCategory, ended: sortedEnded, loading };
}
