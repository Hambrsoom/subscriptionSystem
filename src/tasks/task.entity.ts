import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'; 
import { TaskStatus } from './task-status.enum';


export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}