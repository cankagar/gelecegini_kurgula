"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertImageToWebp } from "@/shared/lib";
import { confirmAvatarUpload, getAvatarUploadUrl } from "@/entities/user/api/userApi";

const AVATAR_MAX_BYTES = 3 * 1024 * 1024;

export function useAvatarUploadMutation(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const webp = await convertImageToWebp(file, AVATAR_MAX_BYTES);
      const { upload_url } = await getAvatarUploadUrl(userId, webp.size);
      // S3'e direkt PUT — backend'in httpClient'ı değil, presigned URL zaten
      // yetkilendirme taşıyor, cookie/baseURL karışmasın.
      await axios.put(upload_url, webp, { headers: { "Content-Type": "image/webp" } });
      return confirmAvatarUpload(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["adminUser", userId] });
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}
