export type Announcement = {
  id: string;
  title: string;
  body: string;
  created_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
};

export type AnnouncementPage = {
  items: Announcement[];
  total: number;
  skip: number;
  limit: number;
};
