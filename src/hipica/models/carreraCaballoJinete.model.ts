export class CarreraCaballoJineteModel {

    id: string | number;
    partidor: number;
    indice_inscrito: number;
    ajuste_indice: number;
    reajuste_indice: number;
    peso_ejemplar: number;
    dividendo: number;
    posicion_llegada: number;
    tiempo: string;
    distanciamiento: string;
    velocidad_promedio: number;
    estado_inscripcion: string;
    anteojeras_caballo: string;
    nombre_jinete: string;
    peso_jinete: number;

    constructor(id?: string | number, partidor?: number, indice_inscrito?: number, ajuste_indice?: number, reajuste_indice?: number,
                peso_ejemplar?: number, dividendo?: number, posicion_llegada?: number, tiempo?: string,
                distanciamiento?: string, velocidad_promedio?: number, estado_inscripcion?: string,
                anteojeras_caballo?: string, nombre_jinete?: string, peso_jinete?: number) {

        this.id = id || -1;
        this.partidor = partidor || -1;
        this.indice_inscrito = indice_inscrito || -1;
        this.ajuste_indice = ajuste_indice || -1;
        this.reajuste_indice = reajuste_indice || -1;
        this.peso_ejemplar = peso_ejemplar || -1;
        this.dividendo = dividendo || -1;
        this.posicion_llegada = posicion_llegada || -1;
        this.tiempo = tiempo || '';
        this.distanciamiento = distanciamiento || '';
        this.velocidad_promedio = velocidad_promedio || -1;
        this.estado_inscripcion = estado_inscripcion || '';
        this.anteojeras_caballo = anteojeras_caballo || '';
        this.nombre_jinete = nombre_jinete || '';
        this.peso_jinete = peso_jinete || -1;
    }

}
