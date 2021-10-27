export class ContratiemposRaceRequestModel {

    fecha_carrera: string;
    glosa: string;
    observaciones: string;

    constructor(fecha_carrera?: string, glosa?: string, observaciones?: string) {

        this.fecha_carrera = fecha_carrera || '';
        this.glosa = glosa || '';
        this.observaciones = observaciones || '';
    }
}
