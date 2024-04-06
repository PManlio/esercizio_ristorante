import { ApiProperty } from "@nestjs/swagger";
import { RistoranteModel } from "./RistoranteModel";
import { UtenteModel } from "./UtenteModel";

export class PrenotazioneModel {
    id:            number;
    @ApiProperty()
    id_prenotante: number;
    @ApiProperty()
    prenotante:    UtenteModel;
    @ApiProperty()
    id_ristorante: number;
    @ApiProperty()
    ristorante:    RistoranteModel;
    @ApiProperty()
    fasciaOraria:  string;
    @ApiProperty()
    numeroPersone: number;
}