import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { JwtService } from "src/security/jwt.service";

@Injectable()
export class JwtGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            return req.headers['authorization'] ? this.jwtService.verificaJwt(req.headers["authorization"].split(' ')[1]) : false; // Bearer <token> -> prendiamo il token
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}