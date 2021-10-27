export class ClimateModel {

    id: string | number;
    temperatura_minima: string;
    temperatura_maxima: string;
    humedad: string;
    viento: string;
    posibilidad_de_lluvia: string;
    visibilidad: string;

    constructor(id?: string | number, temperatura_minima?: string, temperatura_maxima?: string, humedad?: string, viento?: string,
                posibilidad_de_lluvia?: string, visibilidad?: string) {

        this.id = id || -1;
        this.temperatura_minima = temperatura_minima || '';
        this.temperatura_maxima = temperatura_maxima || '';
        this.humedad = humedad || '';
        this.viento = viento || '';
        this.posibilidad_de_lluvia = posibilidad_de_lluvia || '';
        this.visibilidad = visibilidad || '';
    }

}
