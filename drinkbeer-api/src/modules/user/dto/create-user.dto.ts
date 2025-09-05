import { IsEmail, IsString, IsNotEmpty} from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

}