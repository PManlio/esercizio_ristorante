import { Module } from "@nestjs/common";
import { UtenteController } from "src/controllers/utente.controller";
import { PrismaService } from "src/prisma.service";
import { SecurityService } from "src/security/security.service";
import { UtenteService } from "src/services/utente.service";
import { JwtService } from "src/security/jwt.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET || 'supersegreto-jwt',
        signOptions: {
            expiresIn: '24h'
        }
    })],
    controllers: [UtenteController],
    providers: [UtenteService, SecurityService, PrismaService, JwtService]
})
export class UtenteModule {}