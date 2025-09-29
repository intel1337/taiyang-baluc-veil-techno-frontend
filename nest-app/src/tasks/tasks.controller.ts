import { Controller, Get, Param, Post, Body, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, CreateTaskDto } from '../models/tasks.dto';

@Controller('/api/tasks')
export class TasksController {
    constructor(private readonly _tasksService: TasksService) {
    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this._tasksService.getAllTasks();
    }
    
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() taskData: CreateTaskDto) : Promise<Task> {
        return this._tasksService.createTask(taskData);
    }

    @Put('/:id')
    async updateTask(@Param('id') id: string, @Body() taskData: Partial<CreateTaskDto>): Promise<Task> {
        const taskId = parseInt(id, 10);
        if (isNaN(taskId)) {
            throw new Error('ID de tâche invalide');
        }
        return this._tasksService.updateTask(taskId, taskData);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param('id') id: string): Promise<void> {
        const taskId = parseInt(id, 10);
        if (isNaN(taskId)) {
            throw new Error('ID de tâche invalide');
        }
        return this._tasksService.deleteTask(taskId);
    }
}
