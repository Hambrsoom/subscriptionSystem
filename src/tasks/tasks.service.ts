import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // getAllTasks(): Task[] { 
    //     return this.tasks;
    // }
    async getTaskById(id: number): Promise<Task> {
        console.log('I am here');
        return null;
        // const taskFound = await this.taskRepository.findOne(id);
        // if (!taskFound) {
        //     throw new NotFoundException('Task with ID '+ id + " not found");
        // } 
        // return taskFound;
    }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if(search) {
    //         tasks = tasks.filter( task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //             );
    //     }

    //     return tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;

    //     const task: Task =  {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTaskById(id: string): void {
    //     const foundTaskById = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

