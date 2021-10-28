import { PoolClient, Pool } from "../deps.ts";
import {RaceModel} from "../models/race.model.ts";
import {TrackModel} from "../models/track.model.ts";
import {Person_forecastModel} from "../models/person_forecast.model.ts";
import {TipoCampaniasEnum} from "../enums/tipo-campanias.enum.ts";
import {HorseModel} from "../models/horses.model.ts";
import {CampaniasModel} from "../models/campanias.model.ts";


export class HipicaRepository {

    
    constructor(){
    }


    private crearConexion(): Promise<Pool> {

        const env = Deno.env;

        const client = new Pool({

            user: env.get('DB_USER'),
            hostname: env.get('DB_HOSTNAME'),
            database: env.get('DB_DATABASE'),
            password:env.get('DB_PASSWORD'),
            port: env.get('DB_PORT') || 5432
        }, 2000 , true);

    
        return Promise.resolve(client);
    }


    async guardarData(races: Array<RaceModel>) {

        try {

            const pool: Pool = await this.crearConexion();

            const client = await pool.connect();

            await this.setDateStyle(client);
            
            console.time('test');

            const promises = this.iterarData(races, pool);

            Promise.all(promises).then(() => {

                console.timeEnd('test');
                console.log("FIN");
            });

        } catch (err: any) {

            console.log('GUARDAR CATCH:: ', err?.message);
            throw new Error();
        }
    }


    private async setDateStyle(client: PoolClient) {

        await client.queryObject("SET datestyle to 'ISO, DMY'");
        //await client.queryObject("SET search_path TO 'hipica'")
        return Promise.resolve();

    }


    private iterarData(races: Array<RaceModel>, pool: Pool): Array<Promise<void>> {

        const list: Array<Promise<void>> = [];

        for (const race of races) {
            
            const p1 = (async () => {

                const client: PoolClient = await pool.connect();

                console.log(race.fecha_carrera + '  ' + race.numero_carrera);
    
                await this.guardarPista(race.track, client);
    
                const p0 = this.guardarCarrera(race, client);
                const pt = this.guardarTipoPronosticos(race.forecast, client);
    
                await Promise.all([p0, pt]).then(async _ => {
                    this.guardarPronosticos(race, client);
                    await this.guardarTipoCampania(client);
                });
    
    
                for (const caballo of race.caballos) {
    
                    const pj = this.guardarJinetes(caballo, client);
    
                    const p1 = this.guardarHaras(caballo, client);
                    const p2 = this.guardarStud(caballo, client);
                    const p3 = this.guardarPreparador(caballo, client);
    
                    await Promise.all([p1, p2, p3]).then(async _ => {
                        await this.guardarCaballos(caballo, client);
                    });
    
                    const p4 = this.guardarEstadisticaCaballo(caballo, client);
                    const p5 = this.guardarContratiempos(caballo, client);
                    const p6 = this.guardarCampanias(caballo, client);
    
                    await Promise.all([pj, p4, p5, p6]).then(async _ => {
                        await this.guardarCarreraCaballoJinete(race.id, caballo, client);
                    });
                }
    
                client.release();
            });
            
            list.push(p1());

        }
        
        return list;
    }


    private async guardarPista(track: TrackModel, client: PoolClient): Promise<void> {

        const query = `with s as (select id_pista
                                  from pista
                                  where tipo_pista ilike $1),
                            i as (insert into pista (tipo_pista, cancha, humedad, dureza, rodillo, corte_pasto,
                                                     rastra, acondicionador, profundidad_de_rastra)
                                (select $1,
                                        $2,
                                        $3,
                                        $4,
                                        $5,
                                        $6,
                                        $7,
                                        $8,
                                        $9
                                 where not exists(select 1 from s))
                                returning id_pista)
                       select id_pista
                       from i
                       union all
                       select id_pista
                       from s`;


        const values = [track.tipo_pista, track.cancha, track.humedad, track.dureza, track.rodillo,
            track.corte_pasto, track.rastra, track.acondicionador, track.profundidad_de_rastra];


        try {

            const result: any = await client.queryObject({text: query, args:values});
            track.id = result?.rows[0]?.id_pista;

        } catch (err: any) {

            console.log('GUARDAR PISTA CATCH:: ', err?.message);
            throw new Error();
        }

        return Promise.resolve();
    }


    private async guardarCarrera(race: RaceModel, client: PoolClient): Promise<void> {

        const query = `with s as (select id_carrera
                                  from carrera
                                  where fecha_carrera ilike $1
                                    and hora_carrera ilike $2
                                    and numero_carrera = $3),
                            i as (insert into carrera (fecha_carrera, hora_carrera, numero_carrera, distancia,
                                                       numero_pista, peso_pedido, edad, sexo, nombre_carrera,
                                                       tipo_carrera, indice_superior, indice_inferior, id_pista)
                                values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                                returning id_carrera)
                       select id_carrera
                       from s
                       union all
                       select id_carrera
                       from i`;


        const values = [race.fecha_carrera, race.hora_carrera, race.numero_carrera, race.distancia, race.numero_pista,
            race.peso_pedido, race.edad, race.sexo, race.nombre_carrera, race.tipo_carrera, race.indice_superior,
            race.indice_inferior, race.track.id];

        try {

            const result: any = await client.queryObject({text: query, args:values});
            race.id = result?.rows[0]?.id_carrera;

        } catch (err: any) {
            console.log('GUARDAR CARRERA CATCH:: ', err?.message);
            throw new Error();
        }

        return Promise.resolve();
    }


    private async guardarTipoPronosticos(forecast: Array<Person_forecastModel>, client: PoolClient): Promise<void> {

        for (const pronostico_nombre of forecast) {

            const query = `with s as (select id_tipo_pronostico
                                      from tipo_pronostico
                                      where nombre ilike $1),
                                i as (insert into tipo_pronostico (nombre)
                                    select ($1)
                                    where not exists(select 1 from s)
                                    returning id_tipo_pronostico)
                           select id_tipo_pronostico
                           from i
                           union all
                           select id_tipo_pronostico
                           from s`;


            const values = [pronostico_nombre.name];


            try {

                let result:any = await client.queryObject({text: query, args:values});
                pronostico_nombre.id = result?.rows[0]?.id_tipo_pronostico;


            } catch (err: any) {

                console.log('GUARDAR CARRERA CATCH:: ', err?.message);
                throw new Error();
            }
        }

        return Promise.resolve();
    }


    private async guardarPronosticos(race: RaceModel, client: PoolClient): Promise<void> {


        for (const pronostico_tipo of race.forecast) {

            for (const pronostico of pronostico_tipo.forecasts) {

                try {

                    const queryPronostico = `insert into pronostico (nombre_cab1, numero_cab1,
                                                                     nombre_cab2, numero_cab2, numero_carrera,
                                                                     id_tipo_pronostico, id_carrera)
                                             values ($1, $2, $3, $4, $5, $6, $7)
                                             returning id_pronostico`;

                    const values = [pronostico.nombre_cab1, pronostico.numero_cab1, pronostico.nombre_cab2,
                        pronostico.numero_cab2, pronostico.numero_carrera, pronostico_tipo.id, race.id];

                        await client.queryObject({text: queryPronostico, args:values});


                } catch (err: any) {

                    console.log('GUARDAR CARRERA CATCH:: ', err?.message);
                    throw new Error();
                }
            }
        }

        return Promise.resolve();
    }


    private async guardarTipoCampania(client: PoolClient): Promise<void> {

        const campanias: Array<string> = ['campanias_ganador','campanias_top', 'campanias_debutante'];

        for (const tipo_campania of campanias) {

            const query = `with s as (select id_tipo_campanias
                                        from tipo_campanias
                                        where nombre_campania ilike $1),
                                i as (insert into tipo_campanias (nombre_campania)
                                    (select $1
                                    where not exists(select 1 from s))
                                    returning id_tipo_campanias
                                )
                            select id_tipo_campanias
                            from i
                            union all
                            select id_tipo_campanias
                            from s`;

            const tipo = [tipo_campania];

            try {
                
                const result = await client.queryObject<any>({text: query, args:tipo});
                const id: number = result.rows[0].id_tipo_campanias;

            } catch (err: any) {

                console.log('GUARDAR TIPO CAMPANIA CATCH:: ', err?.message);
                throw new Error();

            }
        }


        Promise.resolve();
    }


    private async guardarHaras(caballo: HorseModel, client: PoolClient): Promise<void> {

        const query = `with s as (select id_haras
                                  from haras
                                  where rut_haras = $2
                                    and dv_haras ilike $3),
                            i as (insert into haras (nombre_haras, rut_haras, dv_haras)
                                (select $1, $2, $3
                                 where not exists(select 1 from s))
                                returning id_haras)
                       select id_haras
                       from s
                       union all
                       select id_haras
                       from i`;

        const values = [caballo.haras.nombre_haras, caballo.haras.rut_haras, caballo.haras.dv_haras];

        try {

            const result: any = await client.queryObject({text: query, args:values});
            caballo.haras.id = result?.rows[0]?.id_haras;


        } catch (err: any) {
            console.log('GUARDAR HARAS CATCH:: ', err?.message);
            throw new Error();
        }


        return Promise.resolve();
    }


    private async guardarStud(caballo: HorseModel, client: PoolClient): Promise<void> {

        const query = `with s as (select id_stud
                                  from stud
                                  where rut_stud = $2
                                    and dv_stud ilike $3),
                            i as (insert into stud (nombre_stud, rut_stud, dv_stud)
                                (select $1, $2, $3
                                 where not exists(select 1 from s))
                                returning id_stud)
                       select id_stud
                       from s
                       union all
                       select id_stud
                       from i`;

        const values = [caballo.stud.nombre_stud, caballo.stud.rut_stud, caballo.stud.dv_stud];

        try {

            const result: any = await client.queryObject({text: query, args:values});
            caballo.stud.id = result?.rows[0]?.id_stud;


        } catch (err: any) {
            console.log('GUARDAR STUD CATCH:: ', err?.message);
            throw new Error();
        }

        return Promise.resolve();
    }


    private async guardarJinetes(caballo: HorseModel, client: PoolClient): Promise<void> {

        const query = `with s as (select id_jinete
                                  from jinete
                                  where rut_jinete = $2
                                    and dv_jinete ilike $3),
                            i as (insert into jinete (nombre_jinete, rut_jinete, dv_jinete)
                                (select $1, $2, $3
                                 where not exists(select 1 from s))
                                returning id_jinete)
                       select id_jinete
                       from jinete
                       union all
                       select id_jinete
                       from i`;

        const values = [caballo.jinete.nombre_jinete, caballo.jinete.rut_jinete, caballo.jinete.dv_jinete];

        try {

            const result: any = await client.queryObject({text: query, args:values});            
            caballo.jinete.id = result?.rows[0]?.id_jinete;


        } catch (err: any) {
            console.log('GUARDAR JINETES CATCH:: ', err?.message);
            throw new Error();
        }


        return Promise.resolve();

    }


    private async guardarPreparador(caballo: HorseModel, client: PoolClient): Promise<void> {


        const query = `with s as (select id_preparador
                                  from preparador
                                  where rut_preparador = $2
                                    and dv_preparador ilike $3),
                            i as (insert into preparador (nombre_preparador, rut_preparador, dv_preparador)
                                (select $1, $2, $3
                                 where not exists(select 1 from s))
                                returning id_preparador)
                       select id_preparador
                       from i
                       union all
                       select id_preparador
                       from s`;

        const values = [caballo.preparador.nombre_preparador, caballo.preparador.rut_preparador, caballo.preparador.dv_preparador];

        try {

            const result: any = await client.queryObject({text: query, args:values});
            caballo.preparador.id = result?.rows[0]?.id_preparador;


        } catch (err: any) {
            console.log('GUARDAR PREPARADOR CATCH:: ', err?.message);
            throw new Error();
        }


        return Promise.resolve();
    }


    private async guardarCaballos(caballo: HorseModel, client: PoolClient): Promise<void> {


        const query = `with s as (select id_caballo
                                  from caballo
                                  where rut_ejemplar = $2
                                    and dv_ejemplar ilike $3),

                            i as (insert into caballo (nombre_ejemplar, rut_ejemplar, dv_ejemplar, sexo,
                                                       nombre_padre, nombre_madre, nombre_abuelo_materno,
                                                       glosa_contratiempo, debutante, id_preparador)
                                select $1,
                                       $2,
                                       $3,
                                       $4,
                                       $5,
                                       $6,
                                       $7,
                                       $8,
                                       $9,
                                       $10
                                where not exists(select id_caballo from s)
                                returning id_caballo)
                       select id_caballo
                       from i
                       union all
                       select id_caballo
                       from s;`

        const values = [caballo.nombre_ejemplar, caballo.rut_ejemplar, caballo.dv_ejemplar, caballo.sexo,
            caballo.nombre_padre, caballo.nombre_madre, caballo.nombre_abuelo_materno, caballo.glosa_contratiempo,
            caballo.debutante, caballo.preparador.id];

        try {

            const result: any = await client.queryObject({text: query, args:values});
            caballo.id = result?.rows[0]?.id_caballo;

        } catch (err: any) {
            console.log('GUARDAR CABALLO CATCH:: ', err?.message);
            throw new Error();
        }


        return Promise.resolve();

    }


    private async guardarEstadisticaCaballo(caballo: HorseModel, client: PoolClient): Promise<void> {


        const pfs = caballo.perfil_fs;

        if (pfs !== null && pfs !== undefined) {

            const query = `with s as (select id_estadistica_caballo
                                      from estadistica_caballo
                                      where fs_rut = $1
                                        and fs_dv ilike $2
                                        and fecha_calculo = $3),
                                i as (insert into estadistica_caballo (fs_rut, fs_dv, fecha_calculo, vel_maxima,
                                                                       vel_1rtos_200_t1,
                                                                       vel_tren_carr_t1, vel_pos_fs_t1,
                                                                       vel_ult_200_t1,
                                                                       vel_final_t1,
                                                                       perfil_fs_t1, perfil_fs_t2, id_caballo)
                                    (select $1,
                                            $2,
                                            $3,
                                            $4,
                                            $5,
                                            $6,
                                            $7,
                                            $8,
                                            $9,
                                            $10,
                                            $11,
                                            $12
                                     where not exists(select 1 from s))
                                    returning id_estadistica_caballo)
                           select id_estadistica_caballo
                           from i
                           union all
                           select id_estadistica_caballo
                           from s`;

            const values = [pfs.fs_rut, pfs.fs_dv, pfs.fecha_calculo, pfs.vel_maxima, pfs.vel_1rtos_200_t1,
                pfs.vel_tren_carr_t1, pfs.vel_pos_fs_t1, pfs.vel_ult_200_t1, pfs.vel_final_t1, pfs.perfil_fs_t1,
                pfs.perfil_fs_t2, caballo.id];

            try {

                const result: any = await client.queryObject({text: query, args:values});
                caballo.perfil_fs.id = result?.rows[0]?.id_estadistica_caballo;

            } catch (err: any) {
                console.log('GUARDAR ESTADISTICA CABALLO CATCH:: ', err?.message);
                throw new Error();
            }
        }


        return Promise.resolve();
    }


    private async guardarContratiempos(caballo: HorseModel, client: PoolClient): Promise<void> {

        for (const contratiempo of caballo.contratiempos_pasados) {

            const query = `with s as (select id_contratiempos
                                      from contratiempos
                                      where fecha_carrera = $1
                                        and id_caballo = $4),
                                i as (insert into contratiempos (fecha_carrera, glosa, observaciones, id_caballo)
                                    select $1, $2, $3, $4
                                    where not exists(select id_contratiempos from s)
                                    returning id_contratiempos)
                           select id_contratiempos
                           from s
                           union all
                           select id_contratiempos
                           from i`;

            const values = [contratiempo.fecha_carrera, contratiempo.glosa, contratiempo.observaciones, caballo.id];

            try {
                await client.queryObject({text: query, args:values});
            } catch (err: any) {
                console.log('GUARDAR CABALLO CATCH:: ', err?.message);
                throw new Error();
            }
            
        }

        return Promise.resolve();

    }



    private async guardarCampanias(caballo: HorseModel, client: PoolClient): Promise<void> {

        for (const tipo_campania of Object.values(TipoCampaniasEnum)) {

            
            const campanias: Array<CampaniasModel> = caballo[tipo_campania];

            for(const campania of campanias){

                const query = `with tc as (select id_tipo_campanias
                                        from tipo_campanias
                                        where nombre_campania ilike $15),
                                    s as (select id_campanias_top
                                        from campanias
                                        where fecha ilike $1
                                            and numero_carrera = $2
                                            and partidor = $4
                                            and resultado = $7
                                            and tiempo ilike $8
                                            and dividendo ilike $10
                                            and distancia_2 ilike $11
                                            and nombre_jinete ilike $12
                                            and peso_jinete = $13),
                                    i as (insert into campanias (fecha, numero_carrera, estado_pista, partidor,
                                                                edad_ejemplar, peso_ejemplar, resultado, tiempo,
                                                                handicap, dividendo, distancia_2, nombre_jinete,
                                                                peso_jinete, velocidad_promedio, id_caballo,
                                                                id_tipo_campanias)
                                        (select $1,
                                                $2,
                                                $3,
                                                $4,
                                                $5,
                                                $6,
                                                $7,
                                                $8,
                                                $9,
                                                $10,
                                                $11,
                                                $12,
                                                $13,
                                                $14,
                                                $16,
                                                (select id_tipo_campanias from tc)
                                        where not exists(select id_campanias_top from s))
                                        returning id_campanias_top)
                            select id_campanias_top
                            from i
                            union all
                            select id_campanias_top
                            from s`;

                const values = [campania.fecha, campania.numero_carrera, campania.estado_pista, campania.partidor,
                    campania.edad_ejemplar, campania.peso_ejemplar, campania.resultado, campania.tiempo,
                    campania.handicap, campania.dividendo, campania.distancia_2, campania.nombre_jinete,
                    campania.peso_jinete, campania.velocidad_promedio, tipo_campania, caballo.id];

                try {
                    await client.queryObject({text: query, args:values});
                } catch (err: any) {
                    console.log('GUARDAR CAMPANIAS CATCH:: ', err?.message);
                    throw new Error();
                }
            }
        }
    }


    private async guardarCarreraCaballoJinete(raceId: string | number, caballo: HorseModel, client: PoolClient): Promise<void> {


        const ccj = caballo.carreraCaballoJinete;

        const query = `with s as (select id_carrera_caballo_jinete
                                  from carrera_caballo_jinete
                                  where id_carrera = $15
                                    and id_caballo = $16
                                    and id_jinete = $17),
                            i as (insert into carrera_caballo_jinete
                                (partidor, indice_inscrito, ajuste_indice, reajuste_indice, peso_ejemplar,
                                 dividendo, posicion_llegada, tiempo, distanciamiento, velocidad_promedio,
                                 estado_inscripcion, anteojeras_caballo, nombre_jinete, peso_jinete, id_carrera,
                                 id_caballo, id_jinete)
                                (select $1,
                                        $2,
                                        $3,
                                        $4,
                                        $5,
                                        $6,
                                        $7,
                                        $8,
                                        $9,
                                        $10,
                                        $11,
                                        $12,
                                        $13,
                                        $14,
                                        $15,
                                        $16,
                                        $17)
                                returning id_carrera_caballo_jinete)
                       select id_carrera_caballo_jinete
                       from s
                       union all
                       select id_carrera_caballo_jinete
                       from i`;


        const values = [ccj.partidor, ccj.indice_inscrito, ccj.ajuste_indice, ccj.reajuste_indice, ccj.peso_ejemplar,
            ccj.dividendo, ccj.posicion_llegada, ccj.tiempo, ccj.distanciamiento, ccj.velocidad_promedio,
            ccj.estado_inscripcion, ccj.anteojeras_caballo, ccj.nombre_jinete, ccj.peso_jinete, raceId, caballo.id,
            caballo.jinete.id];

        try {

            await client.queryObject({text: query, args:values});

        } catch (err: any) {
            console.log('GUARDAR CARRERA/CABALLO/JINETE CATCH:: ', err?.message);
            throw new Error();
        }

        return Promise.resolve();

    }


}
