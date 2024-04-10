import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrenotazioneController } from "src/controllers/prenotazione.controller";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "src/security/jwt.service";
import { SecurityService } from "src/security/security.service";
import { PrenotazioneService } from "src/services/prenotazione.service";
import { RistoranteService } from "src/services/ristorante.service";

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET || 'supersegreto-jwt',
        signOptions: {
            expiresIn: '24h'
        }
    })],
    controllers: [PrenotazioneController],
    providers: [PrenotazioneService, PrismaService, RistoranteService, SecurityService, JwtService]
})
export class PrenotazioneModule { }