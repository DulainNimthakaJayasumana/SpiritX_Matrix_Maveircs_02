import {Body, Controller, Post} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthLogInDto, AuthSigUpDto} from "./AuthDTO";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('signUp')
    signUp(@Body() dto:AuthSigUpDto){
        return this.authService.signUp(dto);
    }

    @Post('logIn')
    logIn(@Body() dto: AuthLogInDto){
        return this.authService.login(dto);
    }


}
