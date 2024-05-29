import { Hono } from 'hono';
import { jwt } from 'hono/jwt'
import { csrf } from 'hono/csrf'
import RLStore from './datastore';
import { rateLimiter } from "hono-rate-limiter";
//...
import GetRoute from './routes/get';
import AddRoute from './routes/add';
import addPage from './routes/page';
import loginPage from './routes/login';

type Bindings = {[key in keyof CloudflareBindings]: CloudflareBindings[key]}
const app = new Hono<{ Bindings: Bindings }>({
    getPath: (req) => req.url.replace(/^https?:\/(.+?)$/, '$1'),
});

app.use(
    '*',
    csrf({
        origin: (origin) => /http(s)?:\/\/(\w+\.)?dry\.nl\.eu\.org$/.test(origin),
    })
)
// csrf breaks local developing completely

app.get('/status', async (c) => {
    return c.text('online');
})

GetRoute(app);
AddRoute(app);
addPage(app);
loginPage(app);

app.use('/auth/*', (c, next) => {
    const jwtMiddleware = jwt({
        // @ts-ignore
        secret: c.env.PASSWORD,
    })
    return jwtMiddleware(c, next)
})

app.all('*', async (c) => {
    return new Response("not here", {
        status: 404,
        headers: {"Content-Type": "text/html"}
    });
})

// testing this, might be replaced
app.use(async (c, next) => {
    const limiter = rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        keyGenerator: () => "<unique_key>", // Method to generate custom identifiers for clients.
        //@ts-ignore
        store: new RLStore({ d1Binding: c.env.DB }),
        handler: (c) => c.json({ message: "Rate limit exceeded" }),
    });

    //@ts-ignore
    await limiter(c, next);
});

export default app;