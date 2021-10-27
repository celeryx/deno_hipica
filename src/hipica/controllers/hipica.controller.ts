import { HipicaService } from "../services/hipica.service.ts";

export class HipicaController {
    

  private hipicaService: HipicaService;


  constructor() {
    this.hipicaService = new HipicaService();
  }


  public getClubHipico = (ctx: any) => {

        this.hipicaService.getClubHipicoInfo(ctx.params.file, ctx.params.reload);

        return ctx.response.body = {"message": "Application started", time: new Date()};

  };


}
