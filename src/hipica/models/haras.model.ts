export class HarasModel {

    id: string | number;
    nombre_haras: string;
    rut_haras: number;
    dv_haras: string;

    constructor(id?: string | number, nombre_haras?: string, rut_haras?: number, dv_haras?: string) {

        this.id = id || -1;
        this.nombre_haras = nombre_haras || '';
        this.rut_haras = rut_haras || -1;
        this.dv_haras = dv_haras || '';
    }

}
