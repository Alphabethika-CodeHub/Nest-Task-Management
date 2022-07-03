import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../user/auth/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<{ statusCode: any; message: string; data: object }> {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
      data: await this.roleService.create(createRoleDto),
    };
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findAll(): Promise<{
    statusCode: any;
    message: string;
    data: object;
  }> {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.roleService.findAll(),
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findOne(@Param('id') id: string): Promise<{
    statusCode: any;
    message: string;
    data: object;
  }> {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.roleService.findOne(id),
    };
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<{
    statusCode: any;
    message: string;
    data: string | object;
  }> {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.roleService.update(id, updateRoleDto),
    };
  }

  @Put('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async remove(@Param('id') id: string): Promise<{
    statusCode: any;
    message: string;
    data: string | object;
  }> {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.roleService.delete(id),
    };
  }
}
