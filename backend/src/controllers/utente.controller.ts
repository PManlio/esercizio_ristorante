import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UtenteService } from 'src/services/utente.service';
import { Utente } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UtenteModel } from 'src/models/UtenteModel';
import { LoginModel } from 'src/models/LoginModel';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('/utente')
@ApiTags("utente")
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
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async getAllUtenti(): Promise<Utente[]> {
        return this.utente.utenti({});
    }

    @Post('/login')
    @ApiBody({
        description: "POST Login",
        type: LoginModel
    })
    async login(@Body() login: {
        username: string;
        password: string;
    }): Promise<{user: Utente, token: string} | NotFoundException | UnauthorizedException> {
        return this.utente.login(login)
    }

    @Delete()
    @ApiBody({
        description: "Delete utente",
        schema: { properties: { 'id': { type: 'number' }} }
    })
    async deleteUser(@Body() userid:{id: number}) {
        return this.utente.deleteUtente(userid);
    }

    @Put('/update/:id')
    @ApiBody({
        description: "Aggiorna i campi utente",
        schema: { properties: { username: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' } } }
    })
    async updateUser(@Param('id') idUtente: number , @Body() datiUtente: { 
        username?: string;
        email?: string;
        password?: string;
    }): Promise<Utente> {
        return this.utente.updateUtente({where: {id:+idUtente}, data: datiUtente});
    }
}