import {CampaniasModel} from "./campanias.model.ts";
import {ContratiemposModel} from "./contratiempos.model.ts";
import {EstadisticaCaballoModel} from "./estadisticaCaballo.model.ts";
import {TrainerModel} from "./trainer.model.ts";
import {CarreraCaballoJineteModel} from "./carreraCaballoJinete.model.ts";
import {HarasModel} from "./haras.model.ts";
import {StudModel} from "./stud.model.ts";
import {RiderModel} from "./rider.model.ts";

export class HorseModel {

    id: string | number;
    nombre_ejemplar: string;
    rut_ejemplar: number;
    dv_ejemplar: string;
    sexo: string;
    nombre_padre: string;
    nombre_madre: string;
    nombre_abuelo_materno: string;
    glosa_contratiempo: string;
    debutante: boolean;
    campanias_debutante: Array<CampaniasModel>;
    campanias_ganador: Array<CampaniasModel>;
    campanias_top: Array<CampaniasModel>;
    contratiempos_pasados: Array<ContratiemposModel>;
    perfil_fs: EstadisticaCaballoModel;


    carreraCaballoJinete: CarreraCaballoJineteModel;
    preparador: TrainerModel;
    haras: HarasModel;
    stud: StudModel;
    jinete: RiderModel;


    constructor(id?: string | number, nombre_ejemplar?: string, rut_ejemplar?: number, dv_ejemplar?: string, sexo?: string,
                nombre_padre?: string, nombre_madre?: string, nombre_abuelo_materno?: string,
                glosa_contratiempo?: string, debutante?: boolean, campanias_debutante?: Array<CampaniasModel>,
                campanias_ganador?: Array<CampaniasModel>, campanias_top?: Array<CampaniasModel>, jinete?: RiderModel,
                contratiempos_pasados?: Array<ContratiemposModel>, perfil_fs?: EstadisticaCaballoModel,
                preparador?: TrainerModel, carreraCaballoJinete?: CarreraCaballoJineteModel, haras?: HarasModel, stud?: StudModel) {

        this.id = id || -1;
        this.nombre_ejemplar = nombre_ejemplar || '';
        this.rut_ejemplar = rut_ejemplar || -1;
        this.dv_ejemplar = dv_ejemplar || '';
        this.sexo = sexo || '';
        this.nombre_padre = nombre_padre || '';
        this.nombre_madre = nombre_madre || '';
        this.nombre_abuelo_materno = nombre_abuelo_materno || '';
        this.glosa_contratiempo = glosa_contratiempo || '';
        this.debutante = debutante || false;
        this.campanias_debutante = campanias_debutante || new Array<CampaniasModel>();
        this.campanias_ganador = campanias_ganador || new Array<CampaniasModel>();
        this.campanias_top = campanias_top || new Array<CampaniasModel>();
        this.contratiempos_pasados = contratiempos_pasados || new Array<ContratiemposModel>();
        this.perfil_fs = perfil_fs || new EstadisticaCaballoModel();
        this.preparador = preparador || new TrainerModel();
        this.jinete = jinete || new RiderModel();
        this.carreraCaballoJinete = carreraCaballoJinete || new CarreraCaballoJineteModel();
        this.haras = haras || new HarasModel();
        this.stud = stud || new StudModel();
    }
}
