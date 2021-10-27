export class RiderModel {

    id: string | number;
    nombre_jinete: string;
    rut_jinete: number;
    dv_jinete: string;

    constructor(id?: string | number, nombre_jinete?: string, rut_jinete?: number, dv_jinete?: string) {

        this.id = id || -1;
        this.nombre_jinete = nombre_jinete || '';
        this.rut_jinete = rut_jinete || -1;
        this.dv_jinete = dv_jinete || '';
    }
}
