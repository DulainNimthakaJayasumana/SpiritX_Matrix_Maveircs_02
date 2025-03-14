import {createParamDecorator, ExecutionContext} from "@nestjs/common";


export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext)=>{
        const request: Express.Request = ctx.switchToHttp().getRequest();
        // console.log(request.user) //The request is being printed

        if (data && request.user) {
            return request.user[data];
        }

        return request.user; // undefined
    }
)