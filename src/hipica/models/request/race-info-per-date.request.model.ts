export class RaceInfoPerDateRequestModel {

    fecha_carrera: string;
    hora_carrera: string;
    numero_carrera: string;
    distancia: number;
    numero_pista: number;
    edad: string;
    sexo: string;
    indice_superior: number;
    indice_inferior: number;

    constructor(fecha_carrera?: string, hora_carrera?: string, numero_carrera?: string, distancia?: number,
                numero_pista?: number, edad?: string, sexo?: string, indice_superior?: number, indice_inferior?: number) {

        this.fecha_carrera = fecha_carrera || '';
        this.hora_carrera = hora_carrera || '';
        this.numero_carrera = numero_carrera || '';
        this.distancia = distancia || -1;
        this.numero_pista = numero_pista || -1;
        this.edad = edad || '';
        this.sexo = sexo || '';
        this.indice_superior = indice_superior || -1;
        this.indice_inferior = indice_inferior || -1;
    }
}
