export class EnvironmentConfiguration{

    public env: any;

    constructor() {
        
        Deno.env.set('HOST', '127.0.0.1');
        Deno.env.set('PORT', '8000');
        
        Deno.env.set('DB_USER', 'postgres');
        Deno.env.set('DB_HOSTNAME', 'localhost');
        Deno.env.set('DB_DATABASE', 'hipica');
        Deno.env.set('DB_PASSWORD', '');
        Deno.env.set('DB_PORT', '5432');

        this.env = Deno.env;
    }
}
