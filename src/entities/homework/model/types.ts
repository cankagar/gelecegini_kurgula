export type Homework = {
  id: string;
  classroom_id: string;
  title: string;
  description: string;
  due_date: string;
  created_by: string;
  created_by_first_name: string | null;
  created_by_last_name: string | null;
  created_at: string;
  updated_at: string;
};

export type HomeworkCreateInput = {
  title: string;
  description?: string;
  due_date: string;
};

export type HomeworkUpdateInput = {
  title?: string;
  description?: string;
  due_date?: string;
};
