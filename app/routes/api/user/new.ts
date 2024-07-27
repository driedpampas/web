import { Hono } from "hono";
import { AuthService, UserService } from "../../../components/UserServices";
import { Context } from "hono";

const app = new Hono

app.post('/', async (c: Context) => {
    const formData = await c.req.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400);
    }

    if (await UserService.usernameExists(username, c.env.DB)) {
        return c.json({ error: 'Username already exists' }, 409);
    }

    const { salt, hash } = await AuthService.hashPassword(password);
    const saltedHashedPassword = `${Buffer.from(salt).toString('hex')}:${Buffer.from(hash).toString('hex')}`;

    await UserService.createUser(username, saltedHashedPassword, c.env.DB);

    const token = await AuthService.createJWT({ username }, c);
    return AuthService.setAuthCookie(c, token);
});

app.get('/', async (c: Context) => {
    return c.text('Disallowed method', 403)
});

export default app