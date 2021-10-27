import {ForecastModel} from "./forecast.model.ts";

export class Person_forecastModel {

    id: string | number;
    name: string;
    forecasts: Array<ForecastModel>;

    constructor(id?: string | number, name?: string, forecasts?: Array<ForecastModel>) {

        this.id = id || -1;
        this.name = name || '';
        this.forecasts = forecasts || new Array<ForecastModel>();
    }
}
