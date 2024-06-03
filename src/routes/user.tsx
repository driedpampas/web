import bcrypt from 'bcryptjs';
import { Context } from 'hono';
import type { FC } from 'hono/jsx'
import { jwt } from 'hono/jwt';

export default function(app: { all: (arg0: string, arg1: (c: any) => Response) => void; get: (arg0: string, arg1: { (c: any): any; (c: any): any; (c: any): Promise<any>; }) => void; post: (arg0: string, arg1: { (c: any): Promise<any>; (c: any): Promise<any>; }) => void; use: (arg0: string, arg1: (c: any, next: any) => Promise<any>) => void; }) {
// ...

const RegisterComponent: FC = () => (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Creation</title>
      <script src="https://lunarcascade.nl.eu.org/static/htmx.min.js" />
      <script src="https://lunarcascade.nl.eu.org/static/idiomorph.ext.js" />
      <link rel="stylesheet" type="text/css" href="https://dry.nl.eu.org/rlstyle" />
    </head>
    <body>
      <div class="container">
        <h1>Create Account</h1>
        <form hx-post="/register" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
          <input type="text" name="username" placeholder="Enter your username" required />
          <input type="password" name="password" placeholder="Enter your password" required />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </body>
    </html>
);

const LoginComponent: FC = () => (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
      <script src="https://lunarcascade.nl.eu.org/static/htmx.min.js" />
      <script src="https://lunarcascade.nl.eu.org/static/idiomorph.ext.js" />
      <link rel="stylesheet" type="text/css" href="https://dry.nl.eu.org/rlstyle" />
    </head>
    <body>
      <div class="container">
        <h1>Login</h1>
        <form hx-post="/login" hx-trigger="submit" hx-target="#response" hx-swap="morph:{ignoreActiveValue:true}">
          <input type="text" name="username" placeholder="Enter your username" required />
          <input type="password" name="password" placeholder="Enter your password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div class="container"><div id="response" /></div>
    </body>
    </html>
);

app.all('/rlstyle', (c) => {
    const css = `#response,.container h1{color:var(--text)}#response{min-height:0px;min-width:0px;}:root{--text:#fae0e5;--background:#0e0205;--primaryRT:#eb8098;--secondaryRT:#712f3d}body{font-family:Arial,sans-serif;background-color:var(--background);display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0}.container{background-color:var(--secondaryRT);padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}.container h1{margin-top:0}.container form{display:flex;flex-direction:column}.container form input{margin-bottom:10px;padding:8px;font-size:16px;border-radius:8px;opacity:40%}.container form button{padding:10px;background-color:var(--primaryRT);color:#fff;border:none;border-radius:8px;cursor:pointer}`
    return new Response(css, {status: 200, headers: {"Content-Type": "text/css"}})
});

// Serve the account creation page
app.get('/register', (c) => {
    return c.html('<!DOCTYPE html>' + <RegisterComponent />);
});

// Serve the login page (can be combined with register page if needed)
app.get('/login', (c) => {
    return c.html('<!DOCTYPE html>' + <LoginComponent />);
});

// Middleware to use JWT
app.use('/protected/*', jwt({ secret: context.env.PASSWORD }));

// User registration endpoint
app.post('/register', async (c) => {
    const { username, password } = await c.req.parseBody();
    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Store username and hashed password in the database
    try {
        await c.env.DB.prepare("INSERT INTO users (username, password) VALUES (?, ?)").bind(username, hashedPassword).run();
    } catch (error) {
        return c.json({ error: 'Error storing user in the database' }, 500);
    }

    return c.text('User registered successfully');
});

// User login endpoint
app.post('/login', async (c) => {
    const { username, password } = await c.req.parseBody();
    if (!username || !password) {
        return c.json({ error: 'Username and password are required' }, 400);
    }

    // Retrieve user from the database
    let user;
    try {
        const result = await c.env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
        user = result;
    } catch (error) {
        return c.json({ error: 'Error retrieving user from the database' }, 500);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return c.json({ error: 'Invalid username or password' }, 401);
    }

    const token = await createJWT({ username: user.username }, c);
    c.setSignedCookie('auth_token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    return c.text('Login successful');
});

// Protected route example
app.get('/protected/data', async (c) => {
    const user = c.req.jwtPayload;  // JWT payload is available here
    return c.json({ message: 'Protected data', user });
});

// Function to create a JWT token
async function createJWT(payload: { username: any; }, context: Context) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    const base64Encode = (obj: { alg?: string; typ?: string; username?: any; }) =>
        btoa(JSON.stringify(obj)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

    const encodedHeader = base64Encode(header);
    const encodedPayload = base64Encode(payload);

    const token = `${encodedHeader}.${encodedPayload}`;
    const secretKey = await getSecretKey(context);
    const signature = await crypto.subtle.sign(
        'HMAC',
        secretKey,
        new TextEncoder().encode(token)
    );
    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

    return `${token}.${encodedSignature}`;
}

// Function to import the JWT secret key from environment variables
async function getSecretKey(context: Context) {
    const secretKey = context.env.PASSWORD;
    return crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secretKey),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

// ...
}