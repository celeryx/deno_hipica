export class CampaniasModel {

    id: string | number;
    fecha: string;
    numero_carrera: number;
    estado_pista: string;
    partidor: number;
    edad_ejemplar: number;
    peso_ejemplar: number;
    resultado: number;
    tiempo: string;
    velocidad_promedio: number;
    handicap: number;
    dividendo: string;
    distancia_2: string;
    nombre_jinete: string;
    peso_jinete: number;

    constructor(id?: string | number, fecha?: string, numero_carrera?: number, estado_pista?: string, partidor?: number,
                edad_ejemplar?: number, peso_ejemplar?: number, resultado?: number, tiempo?: string,
                handicap?: number, dividendo?: string, distancia_2?: string, nombre_jinete?: string,
                peso_jinete?: number, velocidad_promedio?: number) {


        this.id = id || -1;
        this.fecha = fecha || '';
        this.numero_carrera = numero_carrera || -1;
        this.estado_pista = estado_pista || '';
        this.partidor = partidor || -1;
        this.edad_ejemplar = edad_ejemplar || -1;
        this.peso_ejemplar = peso_ejemplar || -1;
        this.resultado = resultado || -1;
        this.tiempo = tiempo || '';
        this.handicap = handicap || -1;
        this.dividendo = dividendo || '';
        this.distancia_2 = distancia_2 || '';
        this.nombre_jinete = nombre_jinete || '';
        this.peso_jinete = peso_jinete || -1;
        this.velocidad_promedio = velocidad_promedio || -1;
    }
}
