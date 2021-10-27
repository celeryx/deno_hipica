export class CampaniaRaceRequestModel {


    fecha: string;
    numero_carrera: number;
    hipodromo: string;
    retrospecto: number;
    estado_pista: string;
    sup_inf: string;
    partidor: number;
    edad_ejemplar: number;
    peso_ejemplar: number;
    resultado: number;
    tiempo: string;
    handicap: number;
    dividendo: string;
    distancia_1: string;
    distancia_2: string;
    nombre_jinete: string;
    peso_jinete: number;
    nombre_ejemplar_ganador: string;
    rut_ejemplar_ganador: number;
    video_youtube: string


    constructor(fecha?: string, numero_carrera?: number, hipodromo?: string, retrospecto?: number, estado_pista?: string,
                sup_inf?: string, partidor?: number, edad_ejemplar?: number, peso_ejemplar?: number, resultado?: number,
                tiempo?: string, handicap?: number, dividendo?: string, distancia_1?: string, distancia_2?: string,
                nombre_jinete?: string, peso_jinete?: number, nombre_ejemplar_ganador?: string,
                rut_ejemplar_ganador?: number, video_youtube?: string) {


        this.fecha = fecha || '';
        this.numero_carrera = numero_carrera || -1;
        this.hipodromo = hipodromo || '';
        this.retrospecto = retrospecto || -1;
        this.estado_pista = estado_pista || '';
        this.sup_inf = sup_inf || '';
        this.partidor = partidor || -1;
        this.edad_ejemplar = edad_ejemplar || -1;
        this.peso_ejemplar = peso_ejemplar || -1;
        this.resultado = resultado || -1;
        this.tiempo = tiempo || '';
        this.handicap = handicap || -1;
        this.dividendo = dividendo || '';
        this.distancia_1 = distancia_1 || '';
        this.distancia_2 = distancia_2 || '';
        this.nombre_jinete = nombre_jinete || '';
        this.peso_jinete = peso_jinete || -1;
        this.nombre_ejemplar_ganador = nombre_ejemplar_ganador || '';
        this.rut_ejemplar_ganador = rut_ejemplar_ganador || -1;
        this.video_youtube = video_youtube || '';
    }

}
