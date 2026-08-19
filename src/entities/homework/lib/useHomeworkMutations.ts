"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHomework, deleteHomework } from "@/entities/homework/api/homeworkApi";
import type { HomeworkCreateInput } from "@/entities/homework/model/types";

export function useHomeworkMutations(classroomId: string) {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["homework", classroomId] });

  const create = useMutation({
    mutationFn: (input: HomeworkCreateInput) => createHomework(classroomId, input),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (homeworkId: string) => deleteHomework(classroomId, homeworkId),
    onSuccess: invalidate,
  });

  return { create, remove };
}
