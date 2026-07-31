"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMemberToClassroom,
  closeClassroom,
  createClassroom,
  deleteClassroom,
  reopenClassroom,
  removeMemberFromClassroom,
  updateClassroom,
} from "@/entities/classroom/api/classroomApi";

export function useCreateClassroomMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createClassroom(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classrooms"] }),
  });
}

export function useClassroomMutations(classroomId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["classroom", classroomId] });
    queryClient.invalidateQueries({ queryKey: ["classrooms"] });
    queryClient.invalidateQueries({ queryKey: ["classroomsForMember"] });
    queryClient.invalidateQueries({ queryKey: ["myClassrooms"] });
  };

  const update = useMutation({
    mutationFn: (name: string) => updateClassroom(classroomId, name),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () => deleteClassroom(classroomId),
    onSuccess: invalidate,
  });

  const addMember = useMutation({
    mutationFn: (memberId: string) => addMemberToClassroom(classroomId, memberId),
    onSuccess: invalidate,
  });

  const removeMember = useMutation({
    mutationFn: (memberId: string) => removeMemberFromClassroom(classroomId, memberId),
    onSuccess: invalidate,
  });

  const close = useMutation({
    mutationFn: () => closeClassroom(classroomId),
    onSuccess: invalidate,
  });

  const reopen = useMutation({
    mutationFn: () => reopenClassroom(classroomId),
    onSuccess: invalidate,
  });

  return { update, remove, addMember, removeMember, close, reopen };
}
