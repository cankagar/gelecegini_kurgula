"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  GENDER_LABELS,
  PARENT_RELATION_LABELS,
  useMyDemographicsQuery,
  useUpdateMyDemographicsMutation,
  type Gender,
  type ParentRelation,
  type StudentDemographicsUpdate,
} from "@/entities/student-demographics";
import { PenIcon } from "@/shared/ui/icons";

type Draft = {
  birth_date: string;
  gender: Gender | "";
  school: string;
  grade: string;
  city: string;
  district: string;
  phone: string;
  parent_name: string;
  parent_relation: ParentRelation | "";
  parent_phone: string;
  second_parent_phone: string;
  mother_occupation: string;
  father_occupation: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  previously_attended: boolean;
  interest_areas: string;
  program: string;
  registration_date: string;
};

const inputClass =
  "rounded-xl border border-border bg-bg-alt px-3.5 py-2.5 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60";
const labelClass = "text-[0.78rem] text-text-muted";
const EASE = [0.32, 0.72, 0, 1] as const;

function toDraft(data: {
  birth_date: string | null;
  gender: Gender | null;
  school: string | null;
  grade: string | null;
  city: string | null;
  district: string | null;
  phone: string | null;
  parent_name: string | null;
  parent_relation: ParentRelation | null;
  parent_phone: string | null;
  second_parent_phone: string | null;
  mother_occupation: string | null;
  father_occupation: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  previously_attended: boolean | null;
  interest_areas: string[] | null;
  program: string | null;
  registration_date: string | null;
}): Draft {
  return {
    birth_date: data.birth_date ?? "",
    gender: data.gender ?? "",
    school: data.school ?? "",
    grade: data.grade ?? "",
    city: data.city ?? "",
    district: data.district ?? "",
    phone: data.phone ?? "",
    parent_name: data.parent_name ?? "",
    parent_relation: data.parent_relation ?? "",
    parent_phone: data.parent_phone ?? "",
    second_parent_phone: data.second_parent_phone ?? "",
    mother_occupation: data.mother_occupation ?? "",
    father_occupation: data.father_occupation ?? "",
    emergency_contact_name: data.emergency_contact_name ?? "",
    emergency_contact_phone: data.emergency_contact_phone ?? "",
    previously_attended: data.previously_attended ?? false,
    interest_areas: (data.interest_areas ?? []).join(", "),
    program: data.program ?? "",
    registration_date: data.registration_date ?? "",
  };
}

function toUpdate(draft: Draft): StudentDemographicsUpdate {
  return {
    birth_date: draft.birth_date || null,
    gender: draft.gender || null,
    school: draft.school.trim() || null,
    grade: draft.grade.trim() || null,
    city: draft.city.trim() || null,
    district: draft.district.trim() || null,
    phone: draft.phone.trim() || null,
    parent_name: draft.parent_name.trim() || null,
    parent_relation: draft.parent_relation || null,
    parent_phone: draft.parent_phone.trim() || null,
    second_parent_phone: draft.second_parent_phone.trim() || null,
    mother_occupation: draft.mother_occupation.trim() || null,
    father_occupation: draft.father_occupation.trim() || null,
    emergency_contact_name: draft.emergency_contact_name.trim() || null,
    emergency_contact_phone: draft.emergency_contact_phone.trim() || null,
    previously_attended: draft.previously_attended,
    interest_areas: draft.interest_areas
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    program: draft.program.trim() || null,
    registration_date: draft.registration_date || null,
  };
}

export function StudentDemographicsForm() {
  const { data, isLoading, isError, refetch } = useMyDemographicsQuery(true);
  const updateDemographics = useUpdateMyDemographicsMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  if (isLoading) {
    return (
      <Shell>
        <p className="text-[0.72rem] uppercase tracking-[0.14em] text-text-muted">Öğrenci Bilgileri</p>
        <p className="mt-4 text-[0.85rem] text-text-muted">Yükleniyor...</p>
      </Shell>
    );
  }

  if (isError || !data) {
    return (
      <Shell>
        <p className="text-[0.72rem] uppercase tracking-[0.14em] text-text-muted">Öğrenci Bilgileri</p>
        <p className="mt-4 text-[0.85rem] text-danger">Bilgiler yüklenemedi.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full border border-border px-4 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-300 hover:text-text"
        >
          Tekrar dene
        </button>
      </Shell>
    );
  }

  const current = isEditing && draft ? draft : toDraft(data);

  function startEditing() {
    if (!data) return;
    setDraft(toDraft(data));
    setIsEditing(true);
  }

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function save() {
    if (!draft) return;
    try {
      await updateDemographics.mutateAsync(toUpdate(draft));
      setDraft(null);
      setIsEditing(false);
    } catch {
      // hata mesajı mutation state'inden okunuyor, formu açık bırak
    }
  }

  function cancelEditing() {
    setDraft(null);
    setIsEditing(false);
    updateDemographics.reset();
  }

  function toggleOpen() {
    if (isOpen && isEditing) cancelEditing();
    setIsOpen((v) => !v);
  }

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={toggleOpen}
          className="flex flex-1 items-center justify-between gap-4 text-left"
        >
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-text-muted">Öğrenci Bilgileri</p>
            <p className="mt-1.5 text-[0.85rem] text-text-muted">
              Demografik ve veli bilgilerini güncelle.
            </p>
          </div>
          <ChevronDown
            size={18}
            className={`shrink-0 text-text-muted transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && !isEditing && (
          <button
            onClick={startEditing}
            className="group ml-4 flex shrink-0 items-center gap-2.5 rounded-full bg-text pl-5 pr-1.5 py-1.5 text-[0.8rem] font-medium text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98]"
          >
            Düzenle
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <PenIcon size={13} />
            </span>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Doğum tarihi">
          <input
            type="date"
            disabled={!isEditing}
            value={current.birth_date}
            onChange={(e) => update("birth_date", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Cinsiyet">
          <select
            disabled={!isEditing}
            value={current.gender}
            onChange={(e) => update("gender", e.target.value as Gender | "")}
            className={inputClass}
          >
            <option value="">Seçilmedi</option>
            {Object.entries(GENDER_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Okulu">
          <input
            disabled={!isEditing}
            value={current.school}
            onChange={(e) => update("school", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Sınıfı">
          <input
            disabled={!isEditing}
            value={current.grade}
            onChange={(e) => update("grade", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="İl">
          <input
            disabled={!isEditing}
            value={current.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="İlçe">
          <input
            disabled={!isEditing}
            value={current.district}
            onChange={(e) => update("district", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Telefon">
          <input
            disabled={!isEditing}
            value={current.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Daha önce merkeze geldi mi?">
          <select
            disabled={!isEditing}
            value={current.previously_attended ? "true" : "false"}
            onChange={(e) => update("previously_attended", e.target.value === "true")}
            className={inputClass}
          >
            <option value="false">Hayır</option>
            <option value="true">Evet</option>
          </select>
        </Field>

        <Field label="Veli adı soyadı">
          <input
            disabled={!isEditing}
            value={current.parent_name}
            onChange={(e) => update("parent_name", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Veli yakınlık derecesi">
          <select
            disabled={!isEditing}
            value={current.parent_relation}
            onChange={(e) => update("parent_relation", e.target.value as ParentRelation | "")}
            className={inputClass}
          >
            <option value="">Seçilmedi</option>
            {Object.entries(PARENT_RELATION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Veli telefon">
          <input
            disabled={!isEditing}
            value={current.parent_phone}
            onChange={(e) => update("parent_phone", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="İkinci veli telefon">
          <input
            disabled={!isEditing}
            value={current.second_parent_phone}
            onChange={(e) => update("second_parent_phone", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Anne mesleği">
          <input
            disabled={!isEditing}
            value={current.mother_occupation}
            onChange={(e) => update("mother_occupation", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Baba mesleği">
          <input
            disabled={!isEditing}
            value={current.father_occupation}
            onChange={(e) => update("father_occupation", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Acil durumda aranacak kişi">
          <input
            disabled={!isEditing}
            value={current.emergency_contact_name}
            onChange={(e) => update("emergency_contact_name", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Acil durum telefonu">
          <input
            disabled={!isEditing}
            value={current.emergency_contact_phone}
            onChange={(e) => update("emergency_contact_phone", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="İlgilendiği alanlar (virgülle ayır)">
          <input
            disabled={!isEditing}
            value={current.interest_areas}
            onChange={(e) => update("interest_areas", e.target.value)}
            placeholder="Yazılım, Robotik, Yapay Zeka"
            className={inputClass}
          />
        </Field>

        <Field label="Katıldığı program / kurs / sınıf">
          <input
            disabled={!isEditing}
            value={current.program}
            onChange={(e) => update("program", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Kayıt tarihi">
          <input
            type="date"
            disabled={!isEditing}
            value={current.registration_date}
            onChange={(e) => update("registration_date", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {isEditing && (
        <div className="mt-6 flex items-center gap-2.5">
          <button
            onClick={save}
            disabled={updateDemographics.isPending}
            className="rounded-full bg-text px-5 py-2 text-[0.82rem] font-medium text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {updateDemographics.isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button
            onClick={cancelEditing}
            disabled={updateDemographics.isPending}
            className="rounded-full border border-border px-5 py-2 text-[0.82rem] font-medium text-text-muted transition-colors duration-300 hover:text-text disabled:opacity-50"
          >
            İptal
          </button>
        </div>
      )}

      {updateDemographics.isError && (
        <p className="mt-4 text-[0.8rem] text-danger">Kaydedilemedi. Lütfen tekrar dene.</p>
      )}
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
      className="mt-5 rounded-[2rem] bg-bg-alt p-2 ring-1 ring-border"
    >
      <div className="rounded-[calc(2rem-0.5rem)] bg-bg p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}
