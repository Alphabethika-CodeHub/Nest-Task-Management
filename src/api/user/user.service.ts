import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async getAllUser(): Promise<object | never> {
    try {
      const users = await this.userRepository.find({
        where: { deletedAt: null },
      });
      return {
        data: users,
      };
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

  async findUser(id): Promise<object | never> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: id, deletedAt: null },
        relations: ['role', 'task'],
      });
      return user;
    } catch (error) {
      console.log('Error: ', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: `User Not Found!`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    try {
      const user: User = <User>req.user;
      user.name = body.name;
      return this.userRepository.save(user);
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
}
