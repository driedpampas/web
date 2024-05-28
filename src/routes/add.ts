
export default function(app: { post: (arg0: string, arg1: (c: any) => Promise<Response>) => void; get: (arg0: string, arg1: (c: any) => Promise<Response>) => void; }) {
// ...
app.post('/v1/add', async (c) => {
    const body: any = await c.req.json();
    const src = body.link;
    const urlPattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    const atSignPattern = /.*\.[^\/]*@[^\/]*$/;
    console.log(src)

    if (!urlPattern.test(src) || atSignPattern.test(src)) {
        return new Response('Invalid URL', {status: 400});
    }

    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE src = ?")
        .bind(src)
        .all();

    if (results.length > 0) {
        return new Response(JSON.stringify({ link: results[0].curl }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    }

    const id = Math.random().toString(36).substring(2, 10);
    await c.env.DB.prepare("INSERT INTO links (id, src, curl) VALUES (?, ?, ?)")
        .bind(id, src, `https://dry.nl.eu.org/${id}`)
        .run();

    return new Response(JSON.stringify({ id: id, link: `https://dry.nl.eu.org/${id}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
})

app.get('/v1/add', async (c: any) => {
    return new Response("docs are wip", {
        status: 200,
        headers: {"Content-Type": "text/html"}
    })
})
// ...
}