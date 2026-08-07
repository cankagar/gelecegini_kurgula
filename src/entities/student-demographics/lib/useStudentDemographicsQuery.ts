"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentDemographics } from "@/entities/student-demographics/api/studentDemographicsApi";

export function useStudentDemographicsQuery(userId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["studentDemographics", userId],
    queryFn: () => getStudentDemographics(userId),
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
