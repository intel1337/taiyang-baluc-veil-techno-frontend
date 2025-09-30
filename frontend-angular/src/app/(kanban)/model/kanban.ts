// Dto Pour valider les données des tasks et typer

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