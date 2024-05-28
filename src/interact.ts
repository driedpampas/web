import { Env} from ".";

export async function getUrl(request: Request, env: Env) {
    if (request.method === 'POST') {
        try {
            const body: any = await request.json();
            const uid = body.id;
            console.log(uid);
      
            const { results } = await env.DB.prepare("SELECT * FROM links WHERE id = ?")
                .bind(uid)
                .all();
      
            if (results.length > 0) {
                console.log("yes")
                return new Response(JSON.stringify({ src: results[0].src }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                return new Response('URL not found', {status: 404});
            }
        } catch (err) {
            throw err;
        }
    } else {
        return new Response('Method not allowed', {status: 405});
    }
}

const rateLimit = new Map();

export async function insertInto(request: Request, env: Env, ctx: any) {
    if (request.method === 'POST') {
        // ...
        const clientIp = request.headers.get('CF-Connecting-IP');
        const now = Date.now();

        if (!rateLimit.has(clientIp)) {
            rateLimit.set(clientIp, { count: 1, lastRequest: now });
        } else {
            const clientData = rateLimit.get(clientIp);
            if (now - clientData.lastRequest < 60000) { // 1 minute window
                if (clientData.count >= 60) { // 60 requests per minute
                    return new Response('Too Many Requests', { status: 500 });
                }
                clientData.count++;
            } else {
                clientData.count = 1;
                clientData.lastRequest = now;
            }
            rateLimit.set(clientIp, clientData);
        }
        // ...
        // ...
        try {
            const body: any = await request.json();
            const src = body.link;
            const urlPattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
            const atSignPattern = /.*\.[^\/]*@[^\/]*$/;
            console.log(src)

            if (!urlPattern.test(src) || atSignPattern.test(src)) {
                return new Response('Invalid URL', {status: 400});
            }

            const { results } = await env.DB.prepare("SELECT * FROM links WHERE src = ?")
                .bind(src)
                .all();

            if (results.length > 0) {
                return new Response(JSON.stringify({ link: results[0].url }), {
                    status: 200,
                    headers: {'Content-Type': 'application/json'}
                });
            }

            const id = Math.random().toString(36).substring(2, 10);
            await env.DB.prepare("INSERT INTO links (id, src, url) VALUES (?, ?, ?)")
                .bind(id, `https://dry.nl.eu.org/${id}`, src)
                .run();

            return new Response(JSON.stringify({ id: id, link: `https://dry.nl.eu.org/${id}` }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            throw err;
        }
    } else if (request.method === 'GET') {
        return new Response("docs are wip", {
            status: 200,
            headers: {
                "Content-Type": "text/html"
            }
        });
    }
}