export interface Task {
    title: string;
  }
  
export interface Row {
    title: string;
    taskInput: string;
    tasks: Task[];
  }