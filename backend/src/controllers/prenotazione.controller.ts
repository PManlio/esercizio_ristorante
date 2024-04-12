import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
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
    @ApiBody({
        description: "ritorna la prenotazione per singolo id"
    })
    async getPrenotazione(@Param('id') idPrenotazione: number): Promise<Prenotazione> {
        return await this.prenotazione.prenotazione({ id: +idPrenotazione })
    }

    @Get("/prenotazioniristorante/:id")
    @ApiBody({
        description: "ritorna le prenotazioni del ristorante con l'elenco dei prenotati"
    })
    async getAllPrenotazioniOfRistorante(@Param("id") id: number): Promise<Prenotazione[]> {
        return this.prenotazione.getAllPrenotazioni({
            where: {
                id_ristorante: +id
            }
        }, true);
    }

    @Get("/prenotazioniutente/:id")
    @ApiBody({
        description: "ritorna l'elenco dei ristoranti dove si è prenotato un utente"
    })
    async getAllPrenotazioniOfUser(@Param("id") id: number): Promise<Prenotazione[]> {
        return this.prenotazione.getAllPrenotazioni({
            where: {
                id_prenotante: +id
            }
        }, false, true);
    }

    @Post("/crea")
    @ApiBody({
        description: "Crea prenotazione",
        schema: { 
            properties: { 
                fasciaOraria: { type: "string" },
                numeroPersone: {type: "number"},
                prenotante: {type:"number"},
                ristorante: {type: "number"},
            }
        }
    })
    async createPrenotazione(@Body() datiPrenotazione: {
        fasciaOraria: string;
        numeroPersone: number;
        prenotante: { connect: { id: number } };
        ristorante: { connect: { id: number } };
    }): Promise<Prenotazione | false> {
        return this.prenotazione.createPrenotazione(datiPrenotazione);
    }

    @Put("/update/:id")
    @ApiBody({
        description: "Modifica la prenotazione (i campi sono opzionali, così si può modificare ciò che si preferisce)",
        schema: { 
            properties: { 
                fasciaOraria: { type: "string" },
                numeroPersone: {type: "number"},
                prenotante: {type:"number"},
                ristorante: {type: "number"},
            }
        }
    })
    async updatePrenotazione(@Param('id') idPrenotazione: number, @Body() datiUpdate: {
        fasciaOraria?: string;
        numeroPersone?: number;
        prenotante?: { connect: { id: number } };
        ristorante?: { connect: { id: number } };
    }): Promise<Prenotazione> {
        return this.prenotazione.updatePrenotazione({
            where: { id: idPrenotazione },
            data: datiUpdate
        })
    }

    @Delete("/delete/:id")
    @ApiBody({description: "rimuove una prenotazione per id prenotazione"})
    async deletePrenotazione(@Param('id') idPrenotazione: number): Promise<Prenotazione> {
        return this.prenotazione.deletePrenotazione({id: idPrenotazione});
    }
}