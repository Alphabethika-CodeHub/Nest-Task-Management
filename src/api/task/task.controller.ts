import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  private async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('/')
  private async findAll() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  private async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch('/update/:id')
  private async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete('/delete/:id')
  private async remove(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
