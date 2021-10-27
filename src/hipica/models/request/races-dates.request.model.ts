export class RacesDatesRequestModel {

    numero_reunion: number;
    fecha_reunion: string;
    carreras: boolean;

    constructor(numero_reunion?: number, fecha_reunion?: string, carreras?: boolean) {

        this.numero_reunion = numero_reunion || -1;
        this.fecha_reunion = fecha_reunion || '';
        this.carreras = carreras || false;

    }

}
