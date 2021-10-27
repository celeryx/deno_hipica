export class TipoCampaniasModel {

    id: string | number;
    nombre_campania: string;

    constructor(id?: string | number, nombre_campania?: string) {

        this.id = id || -1;
        this.nombre_campania = nombre_campania || '';
    }
}
