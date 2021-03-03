import {
  IsBoolean,
  IsEmail,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly picture: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;
}
