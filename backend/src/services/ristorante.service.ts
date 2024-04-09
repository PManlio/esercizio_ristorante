import { Injectable } from "@nestjs/common";
import { Prisma, Ristorante } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RistoranteService {

    constructor(private prisma: PrismaService){}

    async ristorante(ristoranteWhereUniqueInput: Prisma.RistoranteWhereUniqueInput): Promise<Ristorante> {
        return this.prisma.ristorante.findUnique({
            where: ristoranteWhereUniqueInput
        });
    }

    async ristoranti(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RistoranteWhereUniqueInput;
        where?: Prisma.RistoranteWhereInput;
        orderBy?: Prisma.RistoranteOrderByWithRelationInput;
    }): Promise<Ristorante[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.ristorante.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async createRistorante(data: Prisma.RistoranteCreateInput): Promise<Ristorante> {
        return this.prisma.ristorante.create({data});
    }

    async updateRistorante(params: {
        where: Prisma.RistoranteWhereUniqueInput;
        data: Prisma.RistoranteUpdateInput;
    }): Promise<Ristorante> {
        const { where, data } = params
        return this.prisma.ristorante.update({
            data,
            where
        })
    }

    async deleteRistorante(where: Prisma.RistoranteWhereUniqueInput) {
        return this.prisma.ristorante.delete({where});
    }
}