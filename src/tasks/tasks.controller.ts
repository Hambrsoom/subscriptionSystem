import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';


@Controller('tasks')
export class TasksController {

    // Dependency Injection has been done in the constructor itself.
    constructor(
        private tasksService: TasksService
    ) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string
    ):Task {
        return this.tasksService.createTask(title, description);
    }
}
