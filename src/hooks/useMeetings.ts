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
  const loading = false;

  const meetingCategory: Meeting[] = [];
  const readingCategory: Meeting[] = [];
  const ended: Meeting[] = [];

  return { meetings, meetingCategory, readingCategory, ended, loading };
}
