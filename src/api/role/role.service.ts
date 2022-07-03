import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  async create(createRoleDto: CreateRoleDto): Promise<object | never> {
    const isExistRole = await this.roleRepository
      .createQueryBuilder('roles')
      .where(`roles.name ilike '%${createRoleDto.name}%'`)
      .getOne();

    if (isExistRole) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: `Role ${createRoleDto.name} already exist!`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      const role = new Role();
      role.name = createRoleDto.name;
      role.status = true;
      await this.roleRepository.insert(role);

      return role;
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

  async findAll(): Promise<object | never> {
    try {
      const roles = await this.roleRepository.find({
        where: { deletedAt: null },
      });
      return roles;
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

  async findOne(id: string): Promise<object | never> {
    const ifExist = await this.roleRepository.findOne({
      where: { id: id, deletedAt: null },
    });
    if (!ifExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: `Role not found!`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const findRole = await this.roleRepository.findOne({
        where: { id: id, deletedAt: null },
      });
      return findRole;
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

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const ifExist = await this.roleRepository.findOne({
      where: { id: id, deletedAt: null },
    });
    if (!ifExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: `Role not found!`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.roleRepository.update({ id: id }, updateRoleDto);
      const findUpdatedRole = await this.roleRepository.findOne({
        where: { id: id, deletedAt: null },
      });
      return findUpdatedRole;
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

  async delete(id: string): Promise<object | string | never> {
    const ifExist = await this.roleRepository.findOneBy({ id: id });

    if (!ifExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: `Role not found!`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.roleRepository.update(
        { id: id },
        {
          deletedAt: new Date(),
          status: false,
        },
      );
      return 'Role has been deleted!';
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
