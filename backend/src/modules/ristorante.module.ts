import { Module } from "@nestjs/common";
import { RistoranteController } from "src/controllers/ristorante.controller";
import { PrismaService } from "src/prisma.service";
import { RistoranteService } from "src/services/ristorante.service";

@Module({
    controllers: [RistoranteController],
    providers: [RistoranteService, PrismaService]
})
export class RistoranteModule {}