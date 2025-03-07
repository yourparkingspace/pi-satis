interface Env {
    KV: KVNamespace;
    PASSWORD: string;
}

type Credentials = {
    username: string;
    password: string;
};

export const onRequest: PagesFunction<Env> = async (context, env) => {
    return async ({ request, next }) => {
        const credentials = parse(request.headers.get("Authorization"));

        if (!credentials || (credentials.username != "packages" && credentials.password != env.PASSWORD)) {
            return unauthorized("Authentication required.");
        }

        return await next();
    };
};

export const unauthorized = (body: string): Response => {
    return new Response(body, {
        status: 401,
        statusText: "'Authentication required.'",
        headers: {
            "WWW-Authenticate": 'Basic realm="User Visible Realm"',
        },
    });
};

const parse = (string: string | undefined | null): Credentials | false => {
    if (string == undefined || string == null) return false;

    const validate = /basic ([a-z0-9]+=*) */i.exec(string);
    if (!validate) return false;
    
    const parsed = /^([^:]*):(.*)$/.exec(atob(validate[1]));
    if (!parsed) return false;
    
    return {username: parsed[1], password: parsed[2]};
}