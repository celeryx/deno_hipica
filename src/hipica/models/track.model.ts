export class TrackModel {

    id: string | number;
    tipo_pista: string;
    cancha: string;
    humedad: string;
    dureza: string;
    rodillo: string;
    corte_pasto: string;
    rastra: string;
    acondicionador: string;
    profundidad_de_rastra: string;

    constructor(id?: string | number, tipo_pista?: string, cancha?: string, humedad?: string, dureza?: string, rodillo?: string,
                corte_pasto?: string, rastra?: string, acondicionador?: string, profundidad_de_rastra?: string) {


        this.id = id || -1;
        this.tipo_pista = tipo_pista || '';
        this.cancha = cancha || '';
        this.humedad = humedad || '';
        this.dureza = dureza || '';
        this.rodillo = rodillo || '';
        this.corte_pasto = corte_pasto || '';
        this.rastra = rastra || '';
        this.acondicionador = acondicionador || '';
        this.profundidad_de_rastra = profundidad_de_rastra || '';

    }
}
