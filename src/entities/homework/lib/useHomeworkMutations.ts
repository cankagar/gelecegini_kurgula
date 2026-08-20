"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHomework, deleteHomework, updateHomework } from "@/entities/homework/api/homeworkApi";
import type { HomeworkCreateInput, HomeworkUpdateInput } from "@/entities/homework/model/types";

export function useHomeworkMutations(classroomId: string) {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["homework", classroomId] });

  const create = useMutation({
    mutationFn: (input: HomeworkCreateInput) => createHomework(classroomId, input),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ homeworkId, input }: { homeworkId: string; input: HomeworkUpdateInput }) =>
      updateHomework(classroomId, homeworkId, input),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (homeworkId: string) => deleteHomework(classroomId, homeworkId),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
