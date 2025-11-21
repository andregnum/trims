import {
  IsEmail,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UserQueryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
