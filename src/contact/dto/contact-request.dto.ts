import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  fullname: string; // this names should be written with the same way of database

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  nationality: string;
}
