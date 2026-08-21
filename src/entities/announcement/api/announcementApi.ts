import { httpClient, toApiError } from "@/shared/api";
import type { Announcement, AnnouncementPage } from "@/entities/announcement/model/types";

// admin/teacher/student rolüne sahip olmayan hesaplar (örn. yalnızca author) için
// backend 403 döner — bu durumda banner'ı sessizce göstermiyoruz, hata fırlatmıyoruz.
export async function listActiveAnnouncements(): Promise<Announcement[]> {
  try {
    const { data } = await httpClient.get<Announcement[]>("/v1/announcements");
    return data;
  } catch (err) {
    const apiError = toApiError(err);
    if (apiError.status === 403) return [];
    throw apiError;
  }
}

export type ListAllAnnouncementsParams = {
  skip?: number;
  limit?: number;
};

// Admin-only — backend rejects with 403 for non-admins. Aktif/pasif ve süresi
// geçmiş dahil hepsini döner, en son güncellenen en üstte.
export async function listAllAnnouncements(
  params: ListAllAnnouncementsParams = {},
): Promise<AnnouncementPage> {
  try {
    const { data } = await httpClient.get<AnnouncementPage>("/v1/announcements/all", {
      params: { skip: params.skip, limit: params.limit },
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export type CreateAnnouncementParams = {
  title: string;
  body: string;
  expiresAt?: string;
};

// Admin-only — backend rejects with 403 for non-admins.
export async function createAnnouncement(params: CreateAnnouncementParams): Promise<Announcement> {
  try {
    const { data } = await httpClient.post<Announcement>("/v1/announcements", {
      title: params.title,
      body: params.body,
      expires_at: params.expiresAt || undefined,
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export type UpdateAnnouncementParams = {
  title?: string;
  body?: string;
  expiresAt?: string;
  isActive?: boolean;
};

// Admin-only — backend rejects with 403 for non-admins.
export async function updateAnnouncement(
  announcementId: string,
  params: UpdateAnnouncementParams,
): Promise<Announcement> {
  try {
    const { data } = await httpClient.patch<Announcement>(`/v1/announcements/${announcementId}`, {
      title: params.title,
      body: params.body,
      expires_at: params.expiresAt,
      is_active: params.isActive,
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Admin-only — backend rejects with 403 for non-admins. Kalıcı silme (soft-delete değil).
export async function deleteAnnouncement(announcementId: string): Promise<void> {
  try {
    await httpClient.delete(`/v1/announcements/${announcementId}`);
  } catch (err) {
    throw toApiError(err);
  }
}
