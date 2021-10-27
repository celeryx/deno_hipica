import {PerfilFsRequestModel} from "./perfil-fs-request.model.ts";
import {CampaniaRaceRequestModel} from "./campania-race-request.model.ts";
import {ContratiemposRaceRequestModel} from "./contratiempos-race-request.model.ts";
import {PropetarioRaceRequestModel} from "./propetario-race-request.model.ts";

export class RaceInscripcionesRequestModel {


    nombre_ejemplar: string;
    rut_ejemplar: number;
    dv_ejemplar: string;
    sexo: string;
    color: string;
    fecha_nacimiento: string;
    nombre_padre: string;
    rut_padre: number;
    dv_padre: string;
    nombre_madre: string;
    rut_madre: number;
    dv_madre: string;
    nombre_abuelo_materno: string;
    rut_abuelo_materno: number;
    dv_abuelo_materno: string;
    nombre_jinete: string;
    rut_jinete: number;
    dv_jinete: string;
    nombre_preparador: string;
    rut_preparador: number;
    dv_preparador: string;
    nombre_stud: string;
    rut_stud: number;
    dv_stud: string;
    colores_stud: string;
    nombre_haras: string;
    rut_haras: number;
    dv_haras: string;
    partidor: number;
    peso_jinete: number;
    peso_pedido: number;
    peso_asignado: number;
    indice_inscrito: number;
    ajuste_indice: number;
    reajuste_indice: number;
    estado_inscripcion: string;
    peso_ejemplar: number;
    dividendo: number;
    posicion: number;
    tiempo: string;
    distanciamiento: string;
    glosa_contratiempo: string;
    grupo_pollon: number;
    anteojeras: string;
    debutante: string;
    campanas_ganador: Array<CampaniaRaceRequestModel>;
    campanas_top: Array<CampaniaRaceRequestModel>;
    campana_debutante: Array<CampaniaRaceRequestModel>;
    contratiempos_pasados: Array<ContratiemposRaceRequestModel>;
    propietario_anterior: Array<PropetarioRaceRequestModel>;
    perfil_fs: PerfilFsRequestModel;
    cambio_preparador: object;
    cambio_monta: Array<any>;


    constructor(nombre_ejemplar?: string, rut_ejemplar?: number, dv_ejemplar?: string, sexo?: string, color?: string,
                fecha_nacimiento?: string, nombre_padre?: string, rut_padre?: number, dv_padre?: string, nombre_madre?: string,
                rut_madre?: number, dv_madre?: string, nombre_abuelo_materno?: string, rut_abuelo_materno?: number,
                dv_abuelo_materno?: string, nombre_jinete?: string, rut_jinete?: number, dv_jinete?: string, nombre_preparador?: string,
                rut_preparador?: number, dv_preparador?: string, nombre_stud?: string, rut_stud?: number, dv_stud?: string,
                colores_stud?: string, nombre_haras?: string, rut_haras?: number, dv_haras?: string, partidor?: number,
                peso_jinete?: number, peso_pedido?: number, peso_asignado?: number, indice_inscrito?: number,
                ajuste_indice?: number, reajuste_indice?: number, estado_inscripcion?: string, peso_ejemplar?: number,
                dividendo?: number, posicion?: number, tiempo?: null, distanciamiento?: string, glosa_contratiempo?: string,
                grupo_pollon?: number, anteojeras?: string, debutante?: string, perfil_fs?: PerfilFsRequestModel,
                cambio_preparador?: object, cambio_monta?: Array<any>, campanas_ganador?: Array<CampaniaRaceRequestModel>,
                campanas_top?: Array<CampaniaRaceRequestModel>, campana_debutante?: Array<CampaniaRaceRequestModel>,
                contratiempos_pasados?: Array<ContratiemposRaceRequestModel>, propietario_anterior?: Array<PropetarioRaceRequestModel>) {


        this.nombre_ejemplar = nombre_ejemplar || '';
        this.rut_ejemplar = rut_ejemplar || -1;
        this.dv_ejemplar = dv_ejemplar || '';
        this.sexo = sexo || '';
        this.color = color || '';
        this.fecha_nacimiento = fecha_nacimiento || '';
        this.nombre_padre = nombre_padre || '';
        this.rut_padre = rut_padre || -1;
        this.dv_padre = dv_padre || '';
        this.nombre_madre = nombre_madre || '';
        this.rut_madre = rut_madre || -1;
        this.dv_madre = dv_madre || '';
        this.nombre_abuelo_materno = nombre_abuelo_materno || '';
        this.rut_abuelo_materno = rut_abuelo_materno || -1;
        this.dv_abuelo_materno = dv_abuelo_materno || '';
        this.nombre_jinete = nombre_jinete || '';
        this.rut_jinete = rut_jinete || -1;
        this.dv_jinete = dv_jinete || '';
        this.nombre_preparador = nombre_preparador || '';
        this.rut_preparador = rut_preparador || -1;
        this.dv_preparador = dv_preparador || '';
        this.nombre_stud = nombre_stud || '';
        this.rut_stud = rut_stud || -1;
        this.dv_stud = dv_stud || '';
        this.colores_stud = colores_stud || '';
        this.nombre_haras = nombre_haras || '';
        this.rut_haras = rut_haras || -1;
        this.dv_haras = dv_haras || '';
        this.partidor = partidor || -1;
        this.peso_jinete = peso_jinete || -1;
        this.peso_pedido = peso_pedido || -1;
        this.peso_asignado = peso_asignado || -1;
        this.indice_inscrito = indice_inscrito || -1;
        this.ajuste_indice = ajuste_indice || -1;
        this.reajuste_indice = reajuste_indice || -1
        this.estado_inscripcion = estado_inscripcion || '';
        this.peso_ejemplar = peso_ejemplar || -1;
        this.dividendo = dividendo || -1;
        this.posicion = posicion || -1;
        this.tiempo = tiempo || '';
        this.distanciamiento = distanciamiento || '';
        this.glosa_contratiempo = glosa_contratiempo || '';
        this.grupo_pollon = grupo_pollon || -1;
        this.anteojeras = anteojeras || '';
        this.debutante = debutante || '';
        this.campanas_ganador = campanas_ganador || new Array<CampaniaRaceRequestModel>();
        this.campanas_top = campanas_top || new Array<CampaniaRaceRequestModel>();
        this.campana_debutante = campana_debutante || new Array<CampaniaRaceRequestModel>();
        this.contratiempos_pasados = contratiempos_pasados || new Array<ContratiemposRaceRequestModel>();
        this.propietario_anterior = propietario_anterior || new Array<PropetarioRaceRequestModel>();
        this.perfil_fs = perfil_fs || new PerfilFsRequestModel();
        this.cambio_preparador = cambio_preparador || new Object();
        this.cambio_monta = cambio_monta || new Array<any>();


    }

}
