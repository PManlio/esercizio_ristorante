import { Body, Controller, Get, Post } from '@nestjs/common';
import { UtenteService } from 'src/services/utente.service';
import { Utente } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { UtenteModel } from 'src/models/UtenteModel';

@Controller('/utente')
export class UtenteController {
    constructor(private readonly utente: UtenteService) {}

    @ApiBody({
        description: 'POST di creazione utente',
        type: UtenteModel
    })
    @Post('/signin')
    async signInUtente(@Body() datiUtente: { 
        username: string;
        email: string;
        password: string; 
    }): Promise<Utente> {
        return this.utente.createUtente(datiUtente);
    }

    // per test momentaneo
    @Get('/list')
    async getAllUtenti(): Promise<Utente[]> {
        return this.utente.utenti({});
    }
}