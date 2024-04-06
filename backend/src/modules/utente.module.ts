import { Module } from "@nestjs/common";
import { UtenteController } from "src/controllers/utente.controller";
import { PrismaService } from "src/prisma.service";
import { SecurityService } from "src/security/security.service";
import { UtenteService } from "src/services/utente.service";


@Module({
    controllers: [UtenteController],
    providers: [UtenteService, SecurityService, PrismaService]
})
export class UtenteModule {}