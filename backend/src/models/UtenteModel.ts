import { ApiProperty } from "@nestjs/swagger";
import { PrenotazioneModel } from "./PrenotazioneModel";

export class UtenteModel {
    id:             number;
    @ApiProperty()
    username:       string;
    @ApiProperty()
    email:          string;
    @ApiProperty()
    password:       string;
    @ApiProperty()
    isAdmin:        boolean;
    @ApiProperty()
    prenotazioni:   PrenotazioneModel[];
}