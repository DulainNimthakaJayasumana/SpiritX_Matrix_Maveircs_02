import {IsNotEmpty, IsString} from "class-validator";
import {Role} from "@prisma/client";

export class AuthSigUpDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    role: Role;
}


