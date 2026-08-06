"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyDemographics } from "@/entities/student-demographics/api/studentDemographicsApi";

export function useMyDemographicsQuery(enabled: boolean) {
  return useQuery({
    queryKey: ["myStudentDemographics"],
    queryFn: getMyDemographics,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
