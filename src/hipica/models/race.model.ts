import {BreederModel} from "./breeder.model.ts";
import {HorseModel} from "./horses.model.ts";
import {RiderModel} from "./rider.model.ts";
import {TrackModel} from "./track.model.ts";
import {Person_forecastModel} from "./person_forecast.model.ts";

export class RaceModel {

    id: string | number;
    fecha_carrera: string;
    hora_carrera: string;
    numero_carrera: string;
    distancia: number;
    numero_pista: number;
    peso_pedido: number;
    edad: string;
    sexo: string;
    nombre_carrera: string;
    tipo_carrera: string;
    indice_superior: number;
    indice_inferior: number;

    caballos: Array<HorseModel>;
    track: TrackModel;
    forecast: Array<Person_forecastModel>;


    constructor(id?: string | number, fecha_carrera?: string, hora_carrera?: string, numero_carrera?: string, edad?: string, sexo?: string,
                nombre_carrera?: string, peso_pedido?: number, entrenador?: BreederModel, caballos?: Array<HorseModel>,
                jinete?: RiderModel, track?: TrackModel, forecast?: Array<Person_forecastModel>, distancia?: number,
                numero_pista?: number, tipo_carrera?: string, indice_superior?: number, indice_inferior?: number) {

        this.id = id || -1
        this.fecha_carrera = fecha_carrera || '';
        this.hora_carrera = hora_carrera || '';
        this.numero_carrera = numero_carrera || '';
        this.edad = edad || '';
        this.sexo = sexo || '';
        this.nombre_carrera = nombre_carrera || '';
        this.peso_pedido = peso_pedido || -1;
        this.distancia = distancia || -1;
        this.numero_pista = numero_pista || -1;
        this.tipo_carrera = tipo_carrera || '';
        this.indice_superior = indice_superior || -1;
        this.indice_inferior = indice_inferior || -1;

        this.caballos = caballos || new Array<HorseModel>();
        this.track = track || new TrackModel();
        this.forecast = forecast || new Array<Person_forecastModel>();

    }

}
