import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiParam } from "@nestjs/swagger";
import { Ristorante } from "@prisma/client";
import { RistoranteGuard } from "src/guards/ristorante.guard";
import { RistoranteService } from "src/services/ristorante.service";

@Controller('/ristorante')
@ApiHeader({
    name: 'pass-ristorante',
    description: 'stringa statica per avviare le API /ristorante; è definita come: ristorante-bodyguard',
})
@UseGuards(RistoranteGuard)
export class RistoranteController {
    constructor(private readonly ristorante: RistoranteService){}

    @Get('/ristorante/:id')
    @ApiParam({
        name: 'id ristorante',
        description: 'query per ottenere un singolo ristorante',
        schema: { properties: { id: { type: 'number' } } }
    })
    async getRistorante(@Param('id') idRistorante: number): Promise<Ristorante | NotFoundException> {
        return this.ristorante.ristorante({id: idRistorante});
    }

    @Get('/list')
    async getAllRistoranti(): Promise<Ristorante[]> { return this.ristorante.ristoranti({}); }

    @Post('/crea')
    @ApiBody({
        description: 'inserisci i dati per creare un nuovo ristorante',
        schema: {
            properties: {
                nome: {type: 'string'},
                indirizzo: {type: 'string'},
                tipo_cucina: {type: 'array', items: {type: 'string'}},
                max_coperti: {type: 'number'},
                fasce_orarie: {type: 'array', items: {type: 'string'}},
            }
        }
    })
    async creaRistorante(@Body() datiRistorante: {
        nome: string;
        indirizzo: string;
        tipo_cucina: string[];
        max_coperti: number;
        fasce_orarie: string[];
    }): Promise<Ristorante> {
        return this.ristorante.createRistorante(datiRistorante);
    }

    @Put('/update/:id')
    @ApiBody({
        description: 'modifica i dati di un ristorante, scelto tramite (parametro url) id',
        schema: {
            properties: {
                nome: {type: 'string'},
                indirizzo: {type: 'string'},
                tipo_cucina: {type: 'array', items: {type: 'string'}},
                max_coperti: {type: 'string'},
                fasce_orarie: {type: 'array', items: {type: 'string'}},
            }
        }
    })
    async updateRistorante(@Param('id') idRistorante: number, @Body() datiUpdate: {
        nome?: string;
        indirizzo?: string;
        tipo_cucina?: string[];
        max_coperti?: number;
        fasce_orarie?: string[];
    }): Promise<Ristorante> {
        return this.ristorante.updateRistorante({ where: {id: +idRistorante}, data: datiUpdate })
    }

    @Delete('/delete/:id')
    async deleteRistorante(@Param('id') id: number): Promise<Ristorante> {
        return this.ristorante.deleteRistorante({ id });
    }

}