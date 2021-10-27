import { Router } from "./deps.ts";
import { HipicaController } from "./controllers/hipica.controller.ts";


export class HorseRoutes {


  public router = new Router();
  private hipicaController =  new HipicaController();


  constructor() {
    this.router.get("/api/v1/hipica/getClubHipico/file/:file/reload/:reload", this.hipicaController.getClubHipico);
  }


}
