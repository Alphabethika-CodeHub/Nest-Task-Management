import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createTaskDto: CreateTaskDto) {
    try {
      const user = await this.userRepository.findOneBy({
        id: createTaskDto.userId,
      });

      const task = new Task();
      task.name = createTaskDto.name;
      task.todo = createTaskDto.todo;
      task.user = user;

      return await this.taskRepository.insert(task);
    } catch (error) {
      console.log('Error: ', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: `Error`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return `This action returns all task`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async delete(id: string) {
    return `This action removes a #${id} task`;
  }
}
