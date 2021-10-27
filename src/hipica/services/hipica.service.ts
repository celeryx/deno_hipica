import {RacesDatesRequestModel} from '../models/request/races-dates.request.model.ts'
import {RaceInfoPerDateRequestModel} from '../models/request/race-info-per-date.request.model.ts';
import {RaceModel} from "../models/race.model.ts";
import {TrackModel} from "../models/track.model.ts";
import {HorseModel} from "../models/horses.model.ts";
import {Person_forecastModel} from "../models/person_forecast.model.ts";
import {RiderModel} from "../models/rider.model.ts";
import {TrainerModel} from "../models/trainer.model.ts";
import {ForecastModel} from "../models/forecast.model.ts";
import {RaceRequestModel} from "../models/request/race-request.model.ts";
import {CarreraCaballoJineteModel} from "../models/carreraCaballoJinete.model.ts";
import {RaceInscripcionesRequestModel} from "../models/request/race-inscripciones-request.model.ts";
import {CampaniasModel} from "../models/campanias.model.ts";
import {ContratiemposModel} from "../models/contratiempos.model.ts";
import {HarasModel} from "../models/haras.model.ts";
import {StudModel} from "../models/stud.model.ts";
import { HipicaRepository } from "../repositories/hipica.repository.ts";




export class HipicaService {


  private hipicaRepository: HipicaRepository;


  constructor() {

    this.hipicaRepository = new HipicaRepository();
  }


  async getClubHipicoInfo(file: string, reload: string) {

    if(reload === "true") {

      console.log("RELOAD");
      const racesDate = await this.getRaceDatesClubHipico();
      const numberOfRacesPerDay: Array<Array<RaceInfoPerDateRequestModel>> = await this.getNumberOfRaces(racesDate);
      //const mock: Array<Array<RaceInfoPerDateRequestModel>> = [[numberOfRacesPerDay[0][0], numberOfRacesPerDay[0][1]], [numberOfRacesPerDay[40][10],numberOfRacesPerDay[40][1]]];
      const raceResultWinners: Array<Map<string,Array<RaceRequestModel>>> = await this.getRaceResultWinners(numberOfRacesPerDay);
      const json: string = this.converToString(raceResultWinners);
      await Deno.writeTextFile("./hipica.json", json);
    }

    if(file === "true") {
      
      console.log("FILE");
      const racesRaw = await Deno.readTextFile("./hipica.json");
      const races = JSON.parse(racesRaw);
      const racesModel: Array<RaceModel> = await this.dataToModels(races);
      this.hipicaRepository.guardarData(racesModel);
    }

    console.log("TERMINO");

  }


  private async getRaceResultWinners(numberOfRacesPerDay: Array<Array<RaceInfoPerDateRequestModel>>): Promise<Array<Map<string,Array<RaceRequestModel>>>> {


    const response: Array<Map<string,Array<RaceRequestModel>>> = [];

    for (const racesInDay of numberOfRacesPerDay) {
      
      const mapRaceDate: Map<string,Array<RaceRequestModel>> = new Map();
      const promises: Array<Promise<RaceRequestModel>> = [];

      for(const race of racesInDay){

        const promise = async (): Promise<RaceRequestModel> => {
          const url = "https://apiweb.clubhipico.cl/v3/programa/resultado/" + race.fecha_carrera + "/" + race.numero_carrera + "";
          const request = await fetch(url);
          const result = await request.json();
          return Promise.resolve(result);
        };
        
        promises.push(promise());

      }

      await Promise.all(promises).then((races) => {
        
        mapRaceDate.set(races[0].fecha_carrera, races)
        response.push(mapRaceDate);
        return;

      });

    }

    return Promise.resolve(response);
  }


  private async getNumberOfRaces(racesDate: Array<string>): Promise<Array<Array<RaceInfoPerDateRequestModel>>> {

    const response: Array<Array<RaceInfoPerDateRequestModel>> = [];

    for (const raceDate of racesDate) {

      const url = "https://apiweb.clubhipico.cl/v2/programa/home/" + raceDate;
      const request = await fetch(url);
      const result = await request.json();

      response.push(result);
    }

    return Promise.resolve(response);
  }


  private async getRaceDatesClubHipico(): Promise<Array<string>> {

    const url = "https://apiweb.clubhipico.cl/calendarios/2021";
    const response: Array<string> = [];

    const calendarRequest = await fetch(url);
    const results: Array<RacesDatesRequestModel> = await calendarRequest.json();

    for (const race of results) {
      if (race.carreras === true) {
        response.push(race.fecha_reunion);
      }
    }

    return Promise.resolve(response);
  }


  private converToString(raceResultWinners: Array<Map<string,Array<RaceRequestModel>>>): string {

    let resultados: Array<Object> = [];


    raceResultWinners.forEach((value: Map<string, RaceRequestModel[]>, index: number) => {

      resultados.push(Object.fromEntries(value));

    });

    return JSON.stringify(resultados);

  }


  private dataToModels(races: Array<Record<string, Array<RaceRequestModel>>>): Promise<Array<RaceModel>> {

    const resultado: Array<RaceModel> = new Array<RaceModel>();

    for(const racesPerDate of races) {

      for(const date of Object.keys(racesPerDate)) {
        
        for(const race of racesPerDate[date]) {
          
          const carrera: RaceRequestModel = race;
          const carreraModel = new RaceModel();
          const pistaModel = new TrackModel();
          const horses = new Array<HorseModel>();
          const listForecastPerson = new Array<Person_forecastModel>();

          if (carrera.numero_pista === 1) {
              pistaModel.tipo_pista = 'PASTO';
              pistaModel.cancha = "Normal";
              //pistaModel.humedad = track1.humedad;
              pistaModel.dureza = "4";
              pistaModel.rodillo = "40";
              //pistaModel.corte_pasto = track1.corte_pasto;

          } else {
              pistaModel.tipo_pista = 'TIERRA';
              pistaModel.cancha = "Normal";
              //pistaModel.humedad = carrera.humedad;
              pistaModel.profundidad_de_rastra = "10";
              pistaModel.acondicionador = "100";
              pistaModel.rastra = "100";
          }

          carreraModel.fecha_carrera = carrera.fecha_carrera;
          carreraModel.hora_carrera = carrera.hora_carrera;
          carreraModel.numero_carrera = carrera.numero_carrera.toString();
          carreraModel.distancia = carrera.distancia;
          carreraModel.numero_pista = carrera.numero_pista;
          carreraModel.peso_pedido = carrera.sexo === 'H' ? carrera.peso_hembra
              : (carrera.sexo === 'M' || carrera.sexo === 'C' ? carrera.peso_macho : carrera.peso_pedido);

          carreraModel.edad = carrera.edad;
          carreraModel.sexo = carrera.sexo;
          carreraModel.nombre_carrera = carrera.nombre_carrera;
          carreraModel.tipo_carrera = carrera.tipo_carrera;
          carreraModel.indice_superior = carrera.indice_superior;
          carreraModel.indice_inferior = carrera.indice_inferior;

          carrera.inscripciones_resultados.forEach((data: RaceInscripcionesRequestModel) => {

            const horse = new HorseModel();
            const jinete = new RiderModel();
            const preparador = new TrainerModel();
            const listContratiempos = new Array<ContratiemposModel>();
            const listCampaniasTop = new Array<CampaniasModel>();
            const listCampaniasDebutante = new Array<CampaniasModel>();
            const listCampaniasGanador = new Array<CampaniasModel>();
            const ccjModel = new CarreraCaballoJineteModel();
            const haras = new HarasModel();
            const stud = new StudModel();


            ccjModel.partidor = data.partidor;
            ccjModel.indice_inscrito = data.indice_inscrito;
            ccjModel.ajuste_indice = data.ajuste_indice;
            ccjModel.reajuste_indice = data.reajuste_indice;
            ccjModel.peso_ejemplar = data.peso_ejemplar;
            ccjModel.dividendo = data.dividendo;
            ccjModel.posicion_llegada = data.posicion;
            ccjModel.tiempo = data.tiempo;
            ccjModel.distanciamiento = data.distanciamiento;
            ccjModel.velocidad_promedio = this.calcularVelocidadPromedio(data.tiempo, carrera.distancia);
            ccjModel.estado_inscripcion = data.estado_inscripcion;
            ccjModel.anteojeras_caballo = data.anteojeras;
            ccjModel.nombre_jinete = data.nombre_jinete;
            ccjModel.peso_jinete = data.peso_jinete;

            jinete.nombre_jinete = data.nombre_jinete;
            jinete.rut_jinete = data.rut_jinete;
            jinete.dv_jinete = data.dv_jinete;

            preparador.nombre_preparador = data.nombre_preparador;
            preparador.rut_preparador = data.rut_preparador;
            preparador.dv_preparador = data.dv_preparador;

            haras.nombre_haras = data.nombre_haras;
            haras.rut_haras = data.rut_haras;
            haras.dv_haras = data.dv_haras;

            stud.nombre_stud = data.nombre_stud;
            stud.rut_stud = data.rut_stud;
            stud.dv_stud = data.dv_stud;

            horse.nombre_ejemplar = data.nombre_ejemplar;
            horse.rut_ejemplar = data.rut_ejemplar;
            horse.dv_ejemplar = data.dv_ejemplar;
            horse.sexo = data.sexo;
            horse.nombre_padre = data.nombre_padre;
            horse.nombre_madre = data.nombre_madre;
            horse.nombre_abuelo_materno = data.nombre_abuelo_materno;
            horse.glosa_contratiempo = data.glosa_contratiempo;
            horse.debutante = data.debutante === 'N' ? false : true;

            data.contratiempos_pasados.forEach(contratiempo => {

              const contratiempoModel = new ContratiemposModel();

              contratiempoModel.fecha_carrera = contratiempo.fecha_carrera;
              contratiempoModel.observaciones = contratiempo.observaciones;
              contratiempoModel.glosa = contratiempo.glosa;

              listContratiempos.push(contratiempoModel);
            });

            data.campanas_top.forEach(campana_top => {

              const campania = new CampaniasModel();

              campania.fecha = campana_top.fecha;
              campania.numero_carrera = campana_top.numero_carrera;
              campania.estado_pista = campana_top.estado_pista;
              campania.partidor = campana_top.partidor;
              campania.edad_ejemplar = campana_top.edad_ejemplar;
              campania.peso_ejemplar = campana_top.peso_ejemplar;
              campania.resultado = campana_top.resultado;
              campania.tiempo = campana_top.tiempo;
              campania.velocidad_promedio = this.calcularVelocidadPromedioString(campana_top.tiempo, campana_top.distancia_2);
              campania.handicap = campana_top.handicap;
              campania.dividendo = campana_top.dividendo;
              campania.distancia_2 = campana_top.distancia_2;
              campania.nombre_jinete = campana_top.nombre_jinete;
              campania.peso_jinete = campana_top.peso_jinete;

              listCampaniasTop.push(campania);
            });

            data.campanas_ganador.forEach(campana_top => {

              const campania = new CampaniasModel();

              campania.fecha = campana_top.fecha;
              campania.numero_carrera = campana_top.numero_carrera;
              campania.estado_pista = campana_top.estado_pista;
              campania.partidor = campana_top.partidor;
              campania.edad_ejemplar = campana_top.edad_ejemplar;
              campania.peso_ejemplar = campana_top.peso_ejemplar;
              campania.resultado = campana_top.resultado;
              campania.tiempo = campana_top.tiempo;
              campania.velocidad_promedio = this.calcularVelocidadPromedioString(campana_top.tiempo, campana_top.distancia_2);
              campania.handicap = campana_top.handicap;
              campania.dividendo = campana_top.dividendo;
              campania.distancia_2 = campana_top.distancia_2;
              campania.nombre_jinete = campana_top.nombre_jinete;
              campania.peso_jinete = campana_top.peso_jinete;

              listCampaniasGanador.push(campania);
            });
            
            data.campana_debutante.forEach(campana_top => {

              const campania = new CampaniasModel();

              campania.fecha = campana_top.fecha;
              campania.numero_carrera = campana_top.numero_carrera;
              campania.estado_pista = campana_top.estado_pista;
              campania.partidor = campana_top.partidor;
              campania.edad_ejemplar = campana_top.edad_ejemplar;
              campania.peso_ejemplar = campana_top.peso_ejemplar;
              campania.resultado = campana_top.resultado;
              campania.tiempo = campana_top.tiempo;
              campania.velocidad_promedio = this.calcularVelocidadPromedioString(campana_top.tiempo, campana_top.distancia_2);
              campania.handicap = campana_top.handicap;
              campania.dividendo = campana_top.dividendo;
              campania.distancia_2 = campana_top.distancia_2;
              campania.nombre_jinete = campana_top.nombre_jinete;
              campania.peso_jinete = campana_top.peso_jinete;

              listCampaniasDebutante.push(campania);

            });


            horse.contratiempos_pasados = listContratiempos;
            horse.campanias_ganador = listCampaniasGanador;
            horse.campanias_debutante = listCampaniasDebutante;
            horse.campanias_top = listCampaniasTop;
            horse.perfil_fs = data.perfil_fs;
            horse.preparador = preparador;
            horse.carreraCaballoJinete = ccjModel;
            horse.haras = haras;
            horse.stud = stud;
            horse.jinete = jinete;
            horse.preparador = preparador;

            horses.push(horse);

          });

          /*Object.keys(carrera.forecast).forEach(keyName => {

            const listForecast = new Array<ForecastModel>();

            const person = new Person_forecastModel();

            // @ts-ignore
            carrera.forecast[keyName].forEach((forecast: ForecastModel) => {
                listForecast.push(forecast);
            });

            person.name = keyName;
            person.forecasts = listForecast;

            listForecastPerson.push(person)

          });*/


          carreraModel.track = pistaModel;
          carreraModel.caballos = horses;
          carreraModel.forecast = listForecastPerson;


          resultado.push(carreraModel);
        }
      }
    }

    return Promise.resolve(resultado);

  }


  private calcularVelocidadPromedio(tiempo: string, distancia: number): number {

    if (tiempo !== null && tiempo !== undefined && tiempo !== ''
        && distancia > 0 && distancia !== null && distancia !== undefined) {

        if (tiempo.indexOf('.') >= 0) {
            tiempo = tiempo.split('.')[0];
            let minutos = parseInt(tiempo.split(":")[0]);
            let segundos = parseInt(tiempo.split(":")[1]);

            minutos = minutos * 60;
            segundos = minutos + segundos;

            return ((distancia / segundos) * 3.6);
        }

    }

    return -1;

  }


  private calcularVelocidadPromedioString(tiempo: string, distancia: string): number {

      if (tiempo !== null && tiempo !== undefined && tiempo !== ''
          && distancia !== null && distancia !== undefined && distancia !== '' && parseInt(distancia) > 0) {

          if (tiempo.split('.').length < 3) {
              tiempo = tiempo.split('.')[0];
              let minutos = parseInt(tiempo.split(":")[0]);
              let segundos = parseInt(tiempo.split(":")[1]);

              minutos = minutos * 60;
              segundos = minutos + segundos;

              return ((parseInt(distancia) / segundos) * 3.6);
          } else {
              let minutos = parseInt(tiempo.split(".")[0]);
              let segundos = parseInt(tiempo.split(".")[1]);

              minutos = minutos * 60;
              segundos = minutos + segundos;

              return ((parseInt(distancia) / segundos) * 3.6);
          }

      }

      return -1;

  }

  
}
