export class ContratiemposModel {

    id: string | number;
    fecha_carrera: string;
    glosa: string;
    observaciones: string;

    constructor(id?: string | number, fecha_carrera?: string, glosa?: string, observaciones?: string) {

        this.id = id || -1;
        this.fecha_carrera = fecha_carrera || '';
        this.glosa = glosa || '';
        this.observaciones = observaciones || '';
    }

}
