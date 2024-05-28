export default function(app: { post: (arg0: string, arg1: (c: { req: { json: () => any; }; env: { DB: { prepare: (arg0: string) => { (): any; new(): any; bind: { (arg0: any): { (): any; new(): any; all: { (): PromiseLike<{ results: any; }> | { results: any; }; new(): any; }; }; new(): any; }; }; }; }; }) => Promise<Response>) => void; get: (arg0: string, arg1: (c: any) => Promise<Response>) => void; }) {
// ...
app.post('/v1/get', async (c: { req: { json: () => any; }; env: { DB: { prepare: (arg0: string) => { (): any; new(): any; bind: { (arg0: any): { (): any; new(): any; all: { (): PromiseLike<{ results: any; }> | { results: any; }; new(): any; }; }; new(): any; }; }; }; }; }) => {
    const body: any = await c.req.json();
    const uid = body.id;

    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE id = ?")
        .bind(uid)
        .all();

    if (results.length > 0) {
        console.log(JSON.stringify({ src: results[0].src }))
        return new Response(JSON.stringify({ src: results[0].src }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response('URL not found', {status: 404});
    }
})

app.get('/v1/get', async (c: any) => {
    return new Response("docs are wip", {
        status: 200,
        headers: {"Content-Type": "text/html"}
    })
})
// ...
}