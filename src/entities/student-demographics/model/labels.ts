import type { Gender, ParentRelation } from "@/entities/student-demographics/model/types";

export const GENDER_LABELS: Record<Gender, string> = {
  female: "Kız",
  male: "Erkek",
};

export const PARENT_RELATION_LABELS: Record<ParentRelation, string> = {
  mother: "Anne",
  father: "Baba",
  other: "Diğer",
};
