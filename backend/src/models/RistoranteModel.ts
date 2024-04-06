import { ApiProperty } from "@nestjs/swagger";
import { PrenotazioneModel } from "./PrenotazioneModel";

export class RistoranteModel {
    id:             number;
    @ApiProperty()
    nome:           string;
    @ApiProperty()
    indirizzo:      string;
    @ApiProperty()
    tipo_cucina:    string[];
    @ApiProperty()
    max_coperti:    number;
    @ApiProperty()
    fasce_orarie:   string[];
    @ApiProperty()
    prenotazioni:   PrenotazioneModel[];
}