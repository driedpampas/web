import { Context } from 'hono';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';
import { Hono } from 'hono';
import { randomBytes, scrypt } from 'crypto';

const app = new Hono();

async function createJWT(payload: object, context: Context): Promise<string> {
    // JWT creation logic here
    return "your_jwt_token";
}

async function hashScrypt(data: string, salt?: string): Promise<{ salt: string; hash: string }> {
    return new Promise((resolve, reject) => {
        // Use the provided salt or generate a new one if not provided
        salt = salt || randomBytes(16).toString('hex');
        scrypt(data, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            //@ts-ignore
            else resolve({ salt, hash: derivedKey.toString('hex') });
        });
    });
}

app.post('/api/user/new', async (c: Context) => {
    const formData = await c.req.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400);
    }

    // Hash the password using scrypt with a unique salt
    const { salt, hash: hashedPassword } = await hashScrypt(password);
    const saltedHashedPassword = `${salt}:${hashedPassword}`; // Concatenate salt and hashed password

    // Store username and salted+hashed password in the database
    try {
        await c.env.DB.prepare("INSERT INTO users (username, password) VALUES (?, ?)").bind(username, saltedHashedPassword).run();
    } catch (error) {
        return c.json({ error: 'Error storing user in the database' }, 500);
    }

    const token = await createJWT({ username }, c);
    return setSignedCookie(c, 'authToken', token, c.env.SECRET, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    }).then(() => c.text('User registered successfully'));
});

app.post('/api/user/login', async (c: Context) => {
    const formData = await c.req.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400);
    }

    // Retrieve the stored salted and hashed password from the database
    let storedSaltedHashedPassword;
    try {
        const result = await c.env.DB.prepare("SELECT password FROM users WHERE username = ?").bind(username).get();
        if (result) {
            storedSaltedHashedPassword = result.password;
        } else {
            return c.json({ error: 'User not found' }, 404);
        }
    } catch (error) {
        return c.json({ error: 'Error accessing the database' }, 500);
    }

    // Extract the salt from the stored password
    const [storedSalt, storedHashedPassword] = storedSaltedHashedPassword.split(':');

    // Hash the provided password using the stored salt
    const { hash: hashedPassword } = await hashScrypt(password, storedSalt);

    // Compare the hashed passwords
    if (hashedPassword !== storedHashedPassword) {
        return c.json({ error: 'Invalid username or password' }, 401);
    }

    // Generate a JWT for the user
    const token = await createJWT({ username }, c);

    // Set the JWT in a signed cookie
    return setSignedCookie(c, 'authToken', token, c.env.SECRET, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    }).then(() => c.text('Login successful'));
});