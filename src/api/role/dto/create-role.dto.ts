import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public readonly name: string;
}
