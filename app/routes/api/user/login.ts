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

    const user = await UserService.findUserByUsername(username, c.env.DB);
    if (!user) {
        return c.json({ error: 'Invalid username or password' }, 401);
    }

    const [saltHex, storedHashHex] = user.password.split(':');
    const salt = new Uint8Array(Buffer.from(saltHex, 'hex'));
    const storedHash = Buffer.from(storedHashHex, 'hex').buffer;

    const { hash: hashedPassword } = await AuthService.hashPassword(password, salt);

    if (!AuthService.arrayBufferEqual(hashedPassword, storedHash)) {
        return c.json({ error: 'Invalid username or password' }, 401);
    }

    const token = await AuthService.createJWT({ username }, c);
    return AuthService.setAuthCookie(c, token);
});

app.get('/', async (c: Context) => {
    return c.text('Disallowed method', 403)
});

export default app