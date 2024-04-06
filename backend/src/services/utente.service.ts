import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Utente, Prisma } from '@prisma/client';
import { SecurityService } from '../security/security.service';


@Injectable()
export class UtenteService {
    
    constructor(private prisma: PrismaService, private security: SecurityService) {}

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
        this.security.generatePassword(data["password"]).then(hash => {
            data["password"] = hash;
        })
        return this.prisma.utente.create({data});
    }

    async updateUtente(params: {
        where: Prisma.UtenteWhereUniqueInput;
        data: Prisma.UtenteUpdateInput;
    }) : Promise<Utente> {
        const { where, data } = params;
        return this.prisma.utente.update({
            data,
            where
        });
    }

    async deleteUtente(where: Prisma.UtenteWhereUniqueInput): Promise<Utente> {
        return this.prisma.utente.delete({where});
    }
}