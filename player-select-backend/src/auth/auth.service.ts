import {ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";
import * as argon from 'argon2';
import {AuthLogInDto, AuthSigUpDto} from "./AuthDTO";
import { JwtService } from '@nestjs/jwt';
import {Role} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ){}

    async signUp(dto: AuthSigUpDto){

        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    password: hash,
                    name: dto.name,
                    role: dto.role,
                },
                select: {
                    id: true,
                    username: true,
                    name: true,
                    role: true,
                }
            });




            return this.signToken(
                user.id,
                user.username,
                user.name,
                user.role
            );

        }catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }


    async signToken(
        sub: number,
        username: string,
        name: string,
        role: Role,
    ){

        const payload = {
            sub,
            username,
            role,
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret,
            });

        return {
          access_token:token,
        };


    }



    async login(dto: AuthLogInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            },
        });

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const matched = await argon.verify(user.password, dto.password);

        if (!matched) {
            throw new ForbiddenException('Credentials incorrect ');
        }





        return this.signToken(
            user.id,
            user.username,
            user.name,
            user.role
        );
    }


    





}
