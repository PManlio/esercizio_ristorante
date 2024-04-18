import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { Ristorante } from "@prisma/client";
import { RistoranteGuard } from "src/guards/ristorante.guard";
import { RistoranteService } from "src/services/ristorante.service";

@Controller('/ristorante')
@ApiTags("ristorante")
export class RistoranteController {
    constructor(private readonly ristorante: RistoranteService){}

    @Get('/ristorante/:id')
    async getRistorante(@Param('id') idRistorante: number): Promise<Ristorante | NotFoundException> {
        return this.ristorante.ristorante({id: +idRistorante});
    }

    @Post('/list')
    @ApiBody({
        description: 'restituisce la lista dei ristoranti. Lasciare vuoti gli array per ottenere tutti i ristoranti',
        schema: {
            properties: {
                tipo_cucina: {type: 'array', items: {type: 'string'}},
                fasce_orarie: {type: 'array', items: {type: 'string'}},
            }
        }
    })
    async getAllRistoranti(@Body() datiRicerca: {
        tipo_cucina: string[];
        fasce_orarie:string[];
    }): Promise<Ristorante[]> { 
        
        return this.ristorante.ristoranti({ where: {
            tipo_cucina: { hasEvery: datiRicerca.tipo_cucina },
            fasce_orarie: { hasEvery: datiRicerca.fasce_orarie }
        } }); 
    }

    @Post('/crea')
    @ApiHeader({
        name: 'pass-ristorante',
        description: 'stringa statica per avviare le API /ristorante; è definita come: ristorante-bodyguard',
    })
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
    @UseGuards(RistoranteGuard)
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
    @ApiHeader({
        name: 'pass-ristorante',
        description: 'stringa statica per avviare le API /ristorante; è definita come: ristorante-bodyguard',
    })
    @ApiBody({
        description: 'modifica i dati di un ristorante, scelto tramite (parametro url) id',
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
    @UseGuards(RistoranteGuard)
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
        return this.ristorante.deleteRistorante({ id: +id });
    }

}