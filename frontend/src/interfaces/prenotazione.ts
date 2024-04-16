import { Ristorante } from "./ristorante";

export interface Prenotazione {
    id: number;
    id_prenotante: number;
    id_ristorante: number;
    fasciaOraria: string;
    numeroPersone: number;
    ristorante: Ristorante;
}