import { Hono } from 'hono';
import { jwt } from 'hono/jwt'
import GetRoute from './routes/get';
import AddRoute from './routes/add';

export interface Env {
    PASSWORD: string;
}   

type Bindings = {
    [key in keyof CloudflareBindings]: CloudflareBindings[key];
}

const app = new Hono<{ Bindings: Bindings }>();

app.get('/status', async (c) => {
    return c.text('online');
})

GetRoute(app);
AddRoute(app);

app.use('/auth/*', (c, next) => {
    const jwtMiddleware = jwt({
      secret: c.env.PASSWORD,
    })
    return jwtMiddleware(c, next)
})

//app.post('/login', async (c) => {
//return handleLogin();
//})

app.all('*', async (c) => {
    return new Response("not here", {
        status: 404,
        headers: {"Content-Type": "text/html"}
    });
})

export default app;