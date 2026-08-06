"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyDemographics } from "@/entities/student-demographics/api/studentDemographicsApi";
import type { StudentDemographicsUpdate } from "@/entities/student-demographics/model/types";

export function useUpdateMyDemographicsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: StudentDemographicsUpdate) => updateMyDemographics(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStudentDemographics"] });
    },
  });
}
