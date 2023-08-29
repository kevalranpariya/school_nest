import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'src/common/enums/roles';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
