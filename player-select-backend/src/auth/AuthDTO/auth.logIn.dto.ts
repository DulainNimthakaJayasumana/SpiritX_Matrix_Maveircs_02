import {IsNotEmpty, IsString} from "class-validator";

export class AuthLogInDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}