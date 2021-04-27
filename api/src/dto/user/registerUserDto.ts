import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RegisterUserDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    userName!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;
}