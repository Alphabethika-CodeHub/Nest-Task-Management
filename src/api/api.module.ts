import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, RoleModule, TaskModule],
})
export class ApiModule {}
