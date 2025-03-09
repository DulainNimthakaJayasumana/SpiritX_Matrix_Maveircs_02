import {Body, Controller, Post} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthLogInDto, AuthSigUpDto} from "./AuthDTO";

@Controller('auth')
export class AuthController {

    constructor(private prisma: PrismaService){}

    @Post('signUp')
    signUp(@Body() dto:AuthSigUpDto){

    }

    @Post('logIn')
    logIn(@Body() dto: AuthLogInDto){

    }


}
