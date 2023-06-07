import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';
export class CreateUserDto {
  @Length(3)
  fullName: string;

  // @UniqueOnDatabase(UserEntity)
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 32, { message: 'Password should be at least 6 characters' })
  password?: string;
}
