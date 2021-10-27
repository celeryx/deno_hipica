export class StudModel {

    id: string | number;
    nombre_stud: string;
    rut_stud: number;
    dv_stud: string;


    constructor(id?: string | number, nombre_stud?: string, rut_stud?: number, dv_stud?: string) {
        this.id = id || -1;
        this.nombre_stud = nombre_stud || '';
        this.rut_stud = rut_stud || -1;
        this.dv_stud = dv_stud || '';
    }
}
