import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Prenotazione } from "@prisma/client";
import { JwtGuard } from "src/guards/jwt.guard";
import { PrenotazioneService } from "src/services/prenotazione.service";

@ApiTags("prenotazione")
@ApiBearerAuth()
@Controller("/prenotazione")
@UseGuards(JwtGuard)
export class PrenotazioneController {
    constructor(private readonly prenotazione: PrenotazioneService) { }

    @Get("/prenotazione/:id")
    async getPrenotazione(@Param('id') idPrenotazione: number): Promise<Prenotazione> {
        return await this.prenotazione.prenotazione({ id: idPrenotazione })
    }
}