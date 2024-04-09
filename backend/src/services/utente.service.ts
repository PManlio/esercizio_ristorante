import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Utente, Prisma } from '@prisma/client';
import { SecurityService } from '../security/security.service';
import { JwtService } from 'src/security/jwt.service';


@Injectable()
export class UtenteService {
    
    constructor(private prisma: PrismaService, private security: SecurityService, private jwt: JwtService) {}

    async utente(utenteWhereUniqueInput: Prisma.UtenteWhereUniqueInput): Promise<Utente | null> {
        return this.prisma.utente.findUnique({
            where: utenteWhereUniqueInput
        });
    }

    async utenti(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UtenteWhereUniqueInput;
        where?: Prisma.UtenteWhereInput;
        orderBy?: Prisma.UtenteOrderByWithRelationInput
    }): Promise<Utente[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.utente.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async createUtente(data: Prisma.UtenteCreateInput): Promise<Utente> {
        return this.security.generatePassword(data["password"]).then(hash => {
            data["password"] = hash;
        }).then(() => this.prisma.utente.create({data}));
    }

    async updateUtente(params: {
        where: Prisma.UtenteWhereUniqueInput;
        data: Prisma.UtenteUpdateInput;
    }) : Promise<Utente> {
        if(params["data"]["password"]) params["data"]["password"] = await this.security.generatePassword(params["data"]["password"]);
        const { where, data } = params;
        return this.prisma.utente.update({
            data,
            where
        });
    }

    async deleteUtente(where: Prisma.UtenteWhereUniqueInput): Promise<Utente> {
        return this.prisma.utente.delete({where});
    }

    async login(data: {username:string; password:string;}): Promise<{user: Utente, token: string} | NotFoundException | UnauthorizedException> {
        const utente = await this.prisma.utente.findUnique({
            where: {
                username: data.username,
            }
        });
        if(!utente) return new NotFoundException("Utente non trovato");
        let isUser = await this.security.comparePassword(data.password, utente.password);
        let jwt    = this.jwt.createJwt(utente.username)
        return isUser ? {user: utente, token: jwt} : new UnauthorizedException ("Username o password errati"); 
    }
}