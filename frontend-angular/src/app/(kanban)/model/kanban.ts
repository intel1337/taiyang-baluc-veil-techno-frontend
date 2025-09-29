export interface Task {
    id: number;
    title: string;
    description: string;
  }
  
export interface Row {
    title: string;
    taskInput: string;
    tasks: Task[];
  }