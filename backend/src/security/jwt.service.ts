import { Injectable } from "@nestjs/common";
import { JwtService as NestJwt } from "@nestjs/jwt";

@Injectable()
export class JwtService {

    constructor(private jwtService: NestJwt) { }

    createJwt(username: string) {
        return this.jwtService.sign({username})
    }

    verificaJwt(jwt: string) { 
        return this.jwtService.verify(jwt);
    }

}