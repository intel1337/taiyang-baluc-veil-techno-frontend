import { Injectable } from '@nestjs/common';
import { Task, CreateTaskDto } from '../models/tasks.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany({
            orderBy: {
                id: 'desc' 
            }
        });
    }
    
    async createTask(taskData: CreateTaskDto) : Promise<Task> {


        
        const task = await this.prisma.task.create({
            data: {
                title: taskData.title,
                description: taskData.description || null,
                completed: taskData.completed || false
            }
        });


        return task;
    }

    async updateTask(id: number, taskData: Partial<CreateTaskDto>): Promise<Task> {

        
        const task = await this.prisma.task.update({
            where: { id },
            data: {
                ...(taskData.title && { title: taskData.title }),
                ...(taskData.description !== undefined && { description: taskData.description }),
                ...(taskData.completed !== undefined && { completed: taskData.completed })
            }
        });


        return task;
    }

    async deleteTask(id: number): Promise<void> {

        
        await this.prisma.task.delete({
            where: { id }
        });


    }
}
