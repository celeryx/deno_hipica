export class ForecastModel {

    id: string | number;
    nombre_cab1: string;
    numero_cab1: string;
    nombre_cab2: string;
    numero_cab2: string;
    numero_carrera: number;

    constructor(id?: string | number, nombre_cab1?: string, numero_cab1?: string, nombre_cab2?: string, numero_cab2?: string,
                numero_carrera?: number) {

        this.id = id || -1;
        this.nombre_cab1 = nombre_cab1 || '';
        this.numero_cab1 = numero_cab1 || '';
        this.nombre_cab2 = nombre_cab2 || '';
        this.numero_cab2 = numero_cab2 || '';
        this.numero_carrera = numero_carrera || -1;
    }
}
