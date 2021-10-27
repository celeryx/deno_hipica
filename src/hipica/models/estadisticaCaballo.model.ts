export class EstadisticaCaballoModel {

    id: string | number;
    fs_rut: number;
    fs_dv: string;
    fecha_calculo: string;
    vel_maxima: number;
    vel_1rtos_200_t1: number;
    vel_tren_carr_t1: number;
    vel_pos_fs_t1: number;
    vel_ult_200_t1: number;
    vel_final_t1: number;
    perfil_fs_t1: string;
    perfil_fs_t2: string;


    constructor(id?: string | number, fs_rut?: number, fs_dv?: string, fecha_calculo?: string, vel_maxima?: number, vel_1rtos_200_t1?: number,
                vel_tren_carr_t1?: number, vel_pos_fs_t1?: number, vel_ult_200_t1?: number, vel_final_t1?: number,
                perfil_fs_t1?: string, perfil_fs_t2?: string) {

        this.id = id || -1;
        this.fs_rut = fs_rut || -1;
        this.fs_dv = fs_dv || '';
        this.fecha_calculo = fecha_calculo || '';
        this.vel_maxima = vel_maxima || -1;
        this.vel_1rtos_200_t1 = vel_1rtos_200_t1 || -1;
        this.vel_tren_carr_t1 = vel_tren_carr_t1 || -1;
        this.vel_pos_fs_t1 = vel_pos_fs_t1 || -1;
        this.vel_ult_200_t1 = vel_ult_200_t1 || -1;
        this.vel_final_t1 = vel_final_t1 || -1;
        this.perfil_fs_t1 = perfil_fs_t1 || '';
        this.perfil_fs_t2 = perfil_fs_t2 || '';
    }

}
