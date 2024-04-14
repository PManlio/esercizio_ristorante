export interface Ristorante {
    id: number;
    nome: string;
    indirizzo: string;
    tipo_cucina: string[];
    max_coperti: number;
    fasce_orarie: string[];
}