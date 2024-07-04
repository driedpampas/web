import { getSignedCookie } from 'hono/cookie'
import { bearerAuth } from 'hono/bearer-auth'

export default function(app: { post: (arg0: string, arg1: (c: any) => Promise<Response>) => void; get: (arg0: string, arg1: (c: any) => Promise<Response>) => void; }) {
// ...
app.post('/v1/add',  async (c) => {
    try {
    const apiKey = await getSignedCookie(c, c.env.PASSWORD, 'keyID');
    if (!apiKey) {return c.text('Unauthorized, please log in', 401)}
    } catch (e) {console.error(e)}
    finally {console.log("User is Authorized");

    let body: any;
    let isJson: boolean;
    if (c.req.header('Content-Type') === 'application/json') {
        isJson = true;
        body = await c.req.json();
    } else if (c.req.header('Content-Type') === 'application/x-www-form-urlencoded') {
        isJson = false;
        const formData = await c.req.parseBody();
        console.log(formData)
        body = {};
        for (const [key, value] of Object.entries(formData)) {
            body[key] = value;
        }
    } else {
        return new Response('Unsupported Content-Type', { status: 415 });
    }

    let src = body.link;
    const httpPattern = /^http(s)?:\/\//;
    if (!httpPattern.test(src)) {
        src = 'https://' + src;
    }
    const urlPattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    const atSignPattern = /.*\.[^\/]*@[^\/]*$/;
    console.log(src)
    if (!urlPattern.test(src) || atSignPattern.test(src)) {return new Response('Invalid URL', {status: 400})}

    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE src = ?").bind(src).all()
    if (results.length > 0) {
        if (!isJson) {return new Response(results[0].curl, { status: 200, headers: { 'Content-Type': 'text/plain' }})
        } else {return new Response(JSON.stringify({ link: results[0].curl }), {status: 200,headers: {'Content-Type': 'application/json'}})}
    } else try {

    const id = Math.random().toString(36).substring(2, 10);
    await c.env.DB.prepare("INSERT INTO links (id, src, curl) VALUES (?, ?, ?)").bind(id, src, `https://dry.nl.eu.org/${id}`).run();

    return new Response(JSON.stringify({ id: id, link: `https://dry.nl.eu.org/${id}` }), {status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (e) {console.error(e);}
}})

app.get('/v1/add', async (c: any) => {
    return new Response("docs are wip", {
        status: 200,
        headers: {"Content-Type": "text/html"}
    })
})
// ...
}