import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phoneNumber: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsBoolean()
  isActive?: boolean;

  @IsString()
  photoUrl?: string;
}
