export class TrainerModel {

    id: string | number;
    nombre_preparador: string;
    rut_preparador: number;
    dv_preparador: string;

    constructor(id?: string | number, nombre_preparador?: string, rut_preparador?: number, dv_preparador?: string) {

        this.id = id || -1;
        this.nombre_preparador = nombre_preparador || '';
        this.rut_preparador = rut_preparador || -1;
        this.dv_preparador = dv_preparador || '';
    }
}
