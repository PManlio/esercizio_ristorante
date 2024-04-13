import { Injectable } from "@nestjs/common";
import { Prenotazione, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { RistoranteService } from "./ristorante.service";

@Injectable()
export class PrenotazioneService {

    constructor(private prisma: PrismaService, private ristorante: RistoranteService) { }

    async createPrenotazione(data: Prisma.PrenotazioneCreateInput): Promise<Prenotazione | false> {
        
        // devo trovare il ristorante che sto prenotando perché mi devo calcolare delle informazioni
        const trovaRistorante = await this.ristorante.ristorante({id: data.ristorante.connect.id });

        // del ristorante soprastante, devo trovare le sue prenotazioni
        const trovaPrenotazioniRistorante = await this.getAllPrenotazioni({
            where: { id_ristorante: trovaRistorante.id }
        });

        // controllo se sono già presenti prenotazioni per quel ristorante, altrimenti (fuori if) la creo direttamente
        if(trovaPrenotazioniRistorante && trovaPrenotazioniRistorante.length > 0) {
            
            // seleziono tutte le prenotazioni della fascia oraria voluta...
            const prenotazioniPerFasciaOraria = trovaPrenotazioniRistorante.filter(el => el.fasciaOraria == data.fasciaOraria);
            
            //... e vedo se ci sono prenotazioni per quella fascia oraria. Se non ce ne sono (fuori if) la creo direttamente
            if(prenotazioniPerFasciaOraria.length > 0) {

                // quindi conto i coperti prenotati per quella fascia oraria...
                let totaleCopertiPrenotati = 0;
                prenotazioniPerFasciaOraria.forEach(el => totaleCopertiPrenotati+=el.numeroPersone);
                
                // se rientro nei coperti con la mia prenotazione, prenoto, altrimenti (else) ritorno che la prenotazione non si può fare
                if((data.numeroPersone + totaleCopertiPrenotati) < trovaRistorante.max_coperti) return this.prisma.prenotazione.create({data});
                else return false; 
            
            }
        }
        return this.prisma.prenotazione.create({data});
    }

    async prenotazione(data: Prisma.PrenotazioneWhereUniqueInput): Promise<Prenotazione> {
        return this.prisma.prenotazione.findUnique({where: data});
    }

    async getAllPrenotazioni(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PrenotazioneWhereUniqueInput;
        where?: Prisma.PrenotazioneWhereInput;
        orderBy?: Prisma.PrenotazioneOrderByWithRelationInput;
    }, selectPrenotanti: boolean = false, selectRistoranti: boolean = false): Promise<Prenotazione[]> { 
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.prenotazione.findMany({skip, take, cursor, where, orderBy, include: {
            ristorante: selectRistoranti,
            prenotante: selectPrenotanti,
        }});
    }

    async updatePrenotazione(params: {
        where: Prisma.PrenotazioneWhereUniqueInput;
        data: Prisma.PrenotazioneUpdateInput;
    }): Promise<Prenotazione> {
        const { where, data } = params;
        return this.prisma.prenotazione.update({where, data});
    }

    async deletePrenotazione(where: Prisma.PrenotazioneWhereUniqueInput): Promise<Prenotazione> {
        return this.prisma.prenotazione.delete({where});
    }
}