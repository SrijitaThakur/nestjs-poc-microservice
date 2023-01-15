import { IsDate, IsEmail, IsNotEmpty, IsObject, IsString, IsOptional } from 'class-validator';
//import {User} from '../schemas/user.schema';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  uid: string;

  /*@IsDate()
  @IsOptional()
  created_at: Date;
 
  @IsOptional()
  created_by: User;

  @IsDate()
 @IsOptional()
  updated_at: Date;
 
 @IsOptional()
  updated_by: User;
  @IsDate()
 @IsOptional()
  deleted_at: Date;
 
 @IsOptional()
  deleted_by: User;*/
}

