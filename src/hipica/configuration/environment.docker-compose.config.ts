export class EnvironmentConfiguration {

    public env: any;

    constructor() {

        Deno.env.set('HOST', 'app');
        Deno.env.set('PORT', '8000');

        Deno.env.set('DB_USER', 'admin');
        Deno.env.set('DB_HOSTNAME', 'pgsql_db');
        Deno.env.set('DB_DATABASE', 'deno_hipica');
        Deno.env.set('DB_PASSWORD', 'admin');
        Deno.env.set('DB_PORT', '5432');

        this.env = Deno.env;
    }
}
