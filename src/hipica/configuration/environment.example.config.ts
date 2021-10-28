export class EnvironmentConfiguration{

    public env: any;

    constructor() {
        
        Deno.env.set('HOST', '');
        Deno.env.set('PORT', '');
        
        Deno.env.set('DB_USER', '');
        Deno.env.set('DB_HOSTNAME', '');
        Deno.env.set('DB_DATABASE', '');
        Deno.env.set('DB_PASSWORD', '');
        Deno.env.set('DB_PORT', '');

        this.env = Deno.env;
    }
}
