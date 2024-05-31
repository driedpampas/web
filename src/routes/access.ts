export default function(app: { all: (arg0: string, arg1: { (c: any): Promise<any>; (c: any): Promise<any>; }) => void; get: (arg0: string, arg1: (c: any) => Promise<any>) => void; }) {
// ...
app.all('*', async (c) => {
    const linkId = c.req.url.slice(22);
    console.log(linkId)

    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE id = ?")
        .bind(linkId)
        .all();

    if (results.length > 0) {
        let redir = results[0].src
        console.log(redir)
        return c.html(`<html><head><meta http-equiv="refresh" content="0; URL='${redir}'" /></head></html>`);
    } else {return c.text('404 Not found', 404)}
})

app.get('/status', async (c) => {return c.text('online');})

app.all('/', async (c) => {
    return c.redirect(`/shorten`, 301);
    /*return new Response("not here", {
        status: 404,
        headers: {"Content-Type": "text/html"}
    });*/
})
// ...
}