import { /*Hono,*/ Context } from 'hono';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';
import { /*JwtVariables,*/ sign, verify } from 'hono/jwt';

//type Variables = JwtVariables;

//const app = new Hono<{ Variables: Variables }>();

export class AuthService {
    static async createJWT(payload: { username: string }, context: Context) {
        const secretKey = context.env.SECRET;
        return sign(payload, secretKey);
    }

    static async verifyJWT(token: string, context: Context) {
        const secretKey = context.env.SECRET;
        return verify(token, secretKey);
    }

    static async hashPassword(password: string, salt?: Uint8Array): Promise<{ salt: Uint8Array; hash: ArrayBuffer }> {
        if (!salt) {
            salt = crypto.getRandomValues(new Uint8Array(16));
        }
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
        const hash = await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256",
            },
            keyMaterial,
            256
        );
        return { salt, hash };
    }

    static async verifyPassword(storedHash: ArrayBuffer, password: string, salt: Uint8Array): Promise<boolean> {
        const { hash } = await AuthService.hashPassword(password, salt);
        return this.arrayBufferEqual(hash, storedHash);
    }

    static arrayBufferEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
        if (buf1.byteLength !== buf2.byteLength) return false;
        const view1 = new DataView(buf1);
        const view2 = new DataView(buf2);
        for (let i = 0; i < buf1.byteLength; i++) {
            if (view1.getUint8(i) !== view2.getUint8(i)) {
                return false;
            }
        }
        return true;
    }

    static setAuthCookie(c: Context, token: string) {
        setSignedCookie(c, 'auth_token', token, c.env.SECRET, { httpOnly: true, secure: true, sameSite: 'strict' });
        return c.json({ success: true });
    }
}

class UserController {
    static async registerUser(c: Context) {
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
    }

    static async loginUser(c: Context) {
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
    }

    static async getRequest(c: Context) {
        return c.json({ info: 'Invalid method or unknown error'}, 200)
    }
}

export class UserService {
    static async usernameExists(username: string, db: any): Promise<boolean> {
        try {
            const result = await db.prepare("SELECT username FROM users WHERE username = ?").bind(username).first();
            return !!result; // Returns true if a result is found, otherwise false
        } catch (error) {
            console.error('Error checking username existence:', error);
            throw new Error('Database operation failed');
        }
    }

    static async createUser(username: string, hashedPassword: string, db: any): Promise<void> {
        try {
            await db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").bind(username, hashedPassword).run();
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error storing user in the database');
        }
    }

    static async findUserByUsername(username: string, db: any): Promise<{ username: string; password: string } | null> {
        try {
            const result = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
            return result ? { username: result.username, password: result.password } : null;
        } catch (error) {
            console.error('Error retrieving user from the database:', error);
            throw new Error('Database operation failed');
        }
    }
}

const verifyTokenMiddleware = async (c: Context, next: () => Promise<void>) => {
    const token = await getSignedCookie(c, c.env.SECRET, 'authToken');
    if (!token) {
        return c.json({ error: 'Authentication required' }, 401);
    }

    try {
        await AuthService.verifyJWT(token, c);
        await next();
    } catch (error) {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
};

//app.post('/api/user/new', UserController.registerUser);
//app.post('/api/user/login', UserController.loginUser);
//app.get('/api/user/*', UserController.getRequest)
//app.use('/me', verifyTokenMiddleware, UserController.getUserInfo);