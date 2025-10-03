// Dto Pour valider les données des tasks et typer

export interface Task {
  id: number;
  title: string;
  description: string;
  date?: number;
}
  
export interface Row {
    title: string;
    taskInput: string;
    tasks: Task[];
    status: string;
  }