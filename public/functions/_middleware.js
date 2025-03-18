export async function onRequest(context) {
    const credentials = parse(context.request.headers.get("Authorization"))

    if (!credentials || (credentials.username != "packages" && credentials.password != env.PASSWORD)) {
        return unauthorized("Authentication required.")
    }

    return await context.next()
};

export const unauthorized = body => {
    return new Response(body, {
        status: 401,
        statusText: "'Authentication required.'",
        headers: {
            "WWW-Authenticate": 'Basic realm="User Visible Realm"'
        }
    })
}

const parse = authHeader => {
    if (authHeader == undefined || authHeader == null) return false

    const validate = /basic ([a-z0-9]+=*) */i.exec(authHeader)
    if (!validate) return false

    const parsed = /^([^:]*):(.*)$/.exec(atob(validate[1]))
    if (!parsed) return false

    return { username: parsed[1], password: parsed[2] }
}