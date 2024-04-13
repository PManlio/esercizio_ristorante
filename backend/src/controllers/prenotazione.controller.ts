import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
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
        return await this.prenotazione.prenotazione({ id: +idPrenotazione })
    }

    @Get("/prenotazioniristorante/:idRistorante")
    async getAllPrenotazioniOfRistorante(@Param("idRistorante") id: number): Promise<Prenotazione[]> {
        return this.prenotazione.getAllPrenotazioni({
            where: {
                id_ristorante: +id
            }
        }, true);
    }

    @Get("/prenotazioniutente/:idUtente")

    async getAllPrenotazioniOfUser(@Param("idUtente") id: number): Promise<Prenotazione[]> {
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
        prenotante: number; // -> { connect: { id: number } };
        ristorante: number; // -> { connect: { id: number } };
    }): Promise<Prenotazione | false> {
        const data = {
            fasciaOraria: datiPrenotazione.fasciaOraria,
            numeroPersone: datiPrenotazione.numeroPersone,
            prenotante: { connect: { id: datiPrenotazione.prenotante } },
            ristorante: { connect: { id: datiPrenotazione.ristorante } },
        }
        return this.prenotazione.createPrenotazione(data);
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
        prenotante?: number; // -> { connect: { id: number } };
        ristorante?: number; // -> { connect: { id: number } };
    }): Promise<Prenotazione> {
        return this.prenotazione.updatePrenotazione({
            where: { id: +idPrenotazione },
            data: {
                fasciaOraria: datiUpdate?.fasciaOraria,
                numeroPersone: datiUpdate?.numeroPersone,
                prenotante: { connect: { id: datiUpdate?.prenotante } },
                ristorante: { connect: { id: datiUpdate?.ristorante } },
            }
        })
    }

    @Delete("/delete/:idPrenotazione")
    async deletePrenotazione(@Param('idPrenotazione') idPrenotazione: number): Promise<Prenotazione> {
        return this.prenotazione.deletePrenotazione({id: +idPrenotazione});
    }
}