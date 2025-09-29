export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
}

export interface CreateTaskDto {
    title: string;
    description?: string;
    completed?: boolean;
}