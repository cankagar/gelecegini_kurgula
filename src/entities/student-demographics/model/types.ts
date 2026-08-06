export type Gender = "female" | "male";

export type ParentRelation = "mother" | "father" | "other";

export type StudentDemographics = {
  id: string;
  user_id: string;
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
  created_at: string;
  updated_at: string;
};

export type StudentDemographicsUpdate = Partial<
  Omit<StudentDemographics, "id" | "user_id" | "created_at" | "updated_at">
>;
