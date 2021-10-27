import {RaceInscripcionesRequestModel} from "./race-inscripciones-request.model.ts";
import {Person_forecastModel} from "../person_forecast.model.ts";

export class RaceRequestModel {


    fecha_carrera: string;
    hora_carrera: string;
    numero_carrera: number;
    distancia: number;
    hipodromo: string;
    retrospecto: number;
    numero_pista: number;
    nombre_premio: string;
    peso_pedido: number;
    edad: string;
    sexo: string;
    tc_codigo_carrera: string;
    nombre_carrera: string;
    tipo_carrera: string;
    condicion_ganador: string;
    peso_hembra: number;
    peso_macho: number;
    resultados: boolean;
    video: string;
    link_video_front: string;
    indice_superior: number;
    indice_inferior: number;
    t1: string;
    mandil_favorito: string;
    estado_serie: string;
    dividendos_a_ganador: number;
    dividendos_place_1_lugar: number;
    dividendos_place_2_lugar: number;
    dividendos_place_3_lugar: number;
    dividendos_atercero_1_lugar: number;
    dividendos_atercero_2_lugar: number;
    dividendos_atercero_3_lugar: number;
    premio_1_lugar: number;
    premio_2_lugar: number;
    premio_3_lugar: number;
    premio_4_lugar: number;
    premio_5_lugar: number;
    premio_6_lugar: number;
    premio_1_lugar_pagado: number;
    premio_2_lugar_pagado: number;
    premio_3_lugar_pagado: number;
    premio_4_lugar_pagado: number;
    premio_5_lugar_pagado: number;
    premio_6_lugar_pagado: number;
    cantidad_retiros: number;
    dividendos_place_1_lugar_emp1: number;
    dividendos_place_1_lugar_emp2: number;
    inscripciones_resultados: Array<RaceInscripcionesRequestModel>;
    forecast: Person_forecastModel;


    constructor(fecha_carrera?: string, hora_carrera?: string, numero_carrera?: number, distancia?: number, hipodromo?: string,
                retrospecto?: number, numero_pista?: number, nombre_premio?: string, peso_pedido?: number, edad?: string, sexo?: string,
                tc_codigo_carrera?: string, nombre_carrera?: string, tipo_carrera?: string, condicion_ganador?: string,
                peso_hembra?: number, peso_macho?: number, resultados?: boolean, video?: string, link_video_front?: string,
                indice_superior?: number, indice_inferior?: number, t1?: string, mandil_favorito?: string, estado_serie?: string,
                dividendos_a_ganador?: number, dividendos_place_1_lugar?: number, dividendos_place_2_lugar?: number,
                dividendos_place_3_lugar?: number, dividendos_atercero_1_lugar?: number, dividendos_atercero_2_lugar?: number,
                dividendos_atercero_3_lugar?: number, premio_1_lugar?: number, premio_2_lugar?: number, premio_3_lugar?: number,
                premio_4_lugar?: number, premio_5_lugar?: number, premio_6_lugar?: number, premio_1_lugar_pagado?: number,
                premio_2_lugar_pagado?: number, premio_3_lugar_pagado?: number, premio_4_lugar_pagado?: number,
                premio_5_lugar_pagado?: number, premio_6_lugar_pagado?: number, cantidad_retiros?: number,
                dividendos_place_1_lugar_emp1?: number, dividendos_place_1_lugar_emp2?: number,
                inscripciones_resultados?: Array<RaceInscripcionesRequestModel>, forecast?: Person_forecastModel) {


        this.fecha_carrera = fecha_carrera || '';
        this.hora_carrera = hora_carrera || '';
        this.numero_carrera = numero_carrera || -1;
        this.distancia = distancia || -1;
        this.hipodromo = hipodromo || '';
        this.retrospecto = retrospecto || -1;
        this.numero_pista = numero_pista || -1;
        this.nombre_premio = nombre_premio || '';
        this.peso_pedido = peso_pedido || -1;
        this.edad = edad || '';
        this.sexo = sexo || '';
        this.tc_codigo_carrera = tc_codigo_carrera || '';
        this.nombre_carrera = nombre_carrera || '';
        this.tipo_carrera = tipo_carrera || '';
        this.condicion_ganador = condicion_ganador || '';
        this.peso_hembra = peso_hembra || -1;
        this.peso_macho = peso_macho || -1;
        this.resultados = resultados || false;
        this.video = video || '';
        this.link_video_front = link_video_front || '';
        this.indice_superior = indice_superior || -1;
        this.indice_inferior = indice_inferior || -1;
        this.t1 = t1 || '';
        this.mandil_favorito = mandil_favorito || '';
        this.estado_serie = estado_serie || '';
        this.dividendos_a_ganador = dividendos_a_ganador || -1;
        this.dividendos_place_1_lugar = dividendos_place_1_lugar || -1;
        this.dividendos_place_2_lugar = dividendos_place_2_lugar || -1;
        this.dividendos_place_3_lugar = dividendos_place_3_lugar || -1;
        this.dividendos_atercero_1_lugar = dividendos_atercero_1_lugar || -1;
        this.dividendos_atercero_2_lugar = dividendos_atercero_2_lugar || -1;
        this.dividendos_atercero_3_lugar = dividendos_atercero_3_lugar || -1;
        this.premio_1_lugar = premio_1_lugar || -1;
        this.premio_2_lugar = premio_2_lugar || -1;
        this.premio_3_lugar = premio_3_lugar || -1;
        this.premio_4_lugar = premio_4_lugar || -1;
        this.premio_5_lugar = premio_5_lugar || -1;
        this.premio_6_lugar = premio_6_lugar || -1;
        this.premio_1_lugar_pagado = premio_1_lugar_pagado || -1;
        this.premio_2_lugar_pagado = premio_2_lugar_pagado || -1;
        this.premio_3_lugar_pagado = premio_3_lugar_pagado || -1;
        this.premio_4_lugar_pagado = premio_4_lugar_pagado || -1;
        this.premio_5_lugar_pagado = premio_5_lugar_pagado || -1;
        this.premio_6_lugar_pagado = premio_6_lugar_pagado || -1;
        this.cantidad_retiros = cantidad_retiros || -1;
        this.dividendos_place_1_lugar_emp1 = dividendos_place_1_lugar_emp1 || -1;
        this.dividendos_place_1_lugar_emp2 = dividendos_place_1_lugar_emp2 || -1;
        this.inscripciones_resultados = inscripciones_resultados || new Array<RaceInscripcionesRequestModel>();
        this.forecast = forecast || new Person_forecastModel();
    }

}
