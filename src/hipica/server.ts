import { Application } from "./deps.ts";
import { HorseRoutes } from "./routes.ts";
import { EnvironmentConfiguration } from "./configuration/environment.config.ts";


const env = new EnvironmentConfiguration().env;

const app = new Application();
const routerHipica = new HorseRoutes().router;

app.use(routerHipica.routes());
app.use(routerHipica.allowedMethods());


console.log(`Server running on port ${env.get('PORT')}`);


app.listen(`${env.get('HOST')}:${env.get('PORT')}`);