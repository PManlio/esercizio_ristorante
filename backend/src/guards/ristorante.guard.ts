import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class RistoranteGuard implements CanActivate{
    private staticHeader = "ristorante-bodyguard";

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if(req.headers['pass-ristorante'] == this.staticHeader) return true;
        return false;
    }
}