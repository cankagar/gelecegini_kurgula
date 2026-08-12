"use client";

import { useState } from "react";
import { useCreateClassroomMutation, type Classroom } from "@/entities/classroom";
import { Modal, ModalTitle } from "@/shared/ui/modal";

type CreateClassroomModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (classroom: Classroom) => void;
};

export function CreateClassroomModal({ open, onClose, onCreated }: CreateClassroomModalProps) {
  const [name, setName] = useState("");
  const createClassroom = useCreateClassroomMutation();

  function handleClose() {
    setName("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const classroom = await createClassroom.mutateAsync(trimmed);
      setName("");
      onCreated(classroom);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Sınıf Oluştur">
      <ModalTitle>Sınıf Oluştur</ModalTitle>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="text-[0.8rem] font-medium text-text">Sınıf adı</label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ör. 10-A Matematik"
          className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={createClassroom.isPending || !name.trim()}
          className="mt-4 w-full rounded-md bg-primary px-3.5 py-2 text-[0.85rem] font-semibold text-cta-text transition-opacity duration-150 hover:bg-primary-hover disabled:opacity-50"
        >
          {createClassroom.isPending ? "Oluşturuluyor..." : "Sınıfı Oluştur"}
        </button>
        {createClassroom.isError && <p className="mt-2 text-[0.8rem] text-danger">Sınıf oluşturulamadı.</p>}
      </form>
    </Modal>
  );
}
