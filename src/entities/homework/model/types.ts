export type Homework = {
  id: string;
  classroom_id: string;
  title: string;
  description: string;
  due_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type HomeworkCreateInput = {
  title: string;
  description?: string;
  due_date: string;
};
