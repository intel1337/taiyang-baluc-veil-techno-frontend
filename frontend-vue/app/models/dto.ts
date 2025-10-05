// types/dto.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  date?: number;
}

export interface Row {
  id: number;           
  title: string;
  taskInput: string;
  tasks: Task[];
  status: string;
}
