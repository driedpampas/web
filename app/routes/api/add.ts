import { Context } from 'hono';
//import { getSignedCookie } from 'hono/cookie'
import { createRoute } from 'honox/factory';
//import { bearerAuth } from 'hono/bearer-auth'

export const POST = createRoute(async (c: Context) => {
    /*try {
    const apiKey = await getSignedCookie(c, c.env.PASSWORD, 'keyID');
    if (!apiKey) {return c.text('Unauthorized, please log in', 401)}
    } catch (e) {console.error(e)}
    finally {console.log("User is Authorized");*/

    let body = await c.req.json();
    if (c.req.header('Content-Type') !== 'application/json') {
        return new Response('Unsupported Content-Type', { status: 415 });
    }

    console.log(body);
    let src = body.src;
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
        return new Response(JSON.stringify({ url: results[0].url }), {status: 200,headers: {'Content-Type': 'application/json'}})
    } else try {

    const id = Math.random().toString(36).substring(2, 10);
    await c.env.DB.prepare("INSERT INTO links (id, src, url) VALUES (?, ?, ?)").bind(id, src, `https://dry.nl.eu.org/r/${id}`).run();

    return new Response(JSON.stringify({ url: `https://next.dry.nl.eu.org/r/${id}` }), {status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (e) {console.error(e);}
}/*}*/)

export default createRoute(async (c) => {
    return new Response("docs are wip", {
        status: 200,
        headers: {"Content-Type": "text/html"}
    })
})
