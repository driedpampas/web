import { Hono } from 'hono';
//import RLStore from './datastore';
//import { rateLimiter } from "hono-rate-limiter";
//...
import { initializeRoutes } from './routes';
// ...

type Bindings = {[key in keyof CloudflareBindings]: CloudflareBindings[key]}
const app = new Hono<{ Bindings: Bindings }>

initializeRoutes(app);

// testing this, might be replaced
/*app.use(async (c, next) => {
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
});*/

export default app;