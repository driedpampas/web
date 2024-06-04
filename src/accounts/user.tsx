import bcrypt from 'bcryptjs';
import { Context } from 'hono';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';
import type { FC } from 'hono/jsx'
import { sign, verify } from 'hono/jwt';

// Function to create a JWT token
export async function createJWT(payload: { username: string }, context: Context) {
  const secretKey = context.env.PASSWORD;
  return sign(payload, secretKey);
}

// Function to verify a JWT token
export async function verifyJWT(token: string, context: Context) {
  const secretKey = context.env.PASSWORD;
  return verify(token, secretKey);
}

export default function(app: { all: (arg0: string, arg1: (c: any) => Response) => void; get: (arg0: string, arg1: { (c: any): any; (c: any): any; (c: any): Promise<any>; }) => void; post: (arg0: string, arg1: { (c: any): Promise<any>; (c: any): Promise<any>; }) => void; use: (arg0: string, arg1: (c: any, next: any) => Promise<any>) => void; }) {
// ...
interface UserProps {
  user: any;
}

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
        <form hx-post="/login" hx-trigger="submit" hx-target="#resp" hx-swap="morph:{ignoreActiveValue:true}">
          <input type="text" name="username" placeholder="Enter your username" required />
          <input type="password" name="password" placeholder="Enter your password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div class="container"><div id="response" /><div id="resp" /></div>
    </body>
    </html>
);

app.all('/rlstyle', (c) => {
    const css = `#response,.container h1,h2{color:var(--text)}#response,#resp{min-height:0px;min-width:0px;}:root{--text:#fae0e5;--background:#0e0205;--primaryRT:#eb8098;--secondaryRT:#712f3d}body{font-family:Arial,sans-serif;background-color:var(--background);display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0}.container{background-color:var(--secondaryRT);padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}.container h1{margin-top:0}.container form{display:flex;flex-direction:column}.container form input{margin-bottom:10px;padding:8px;font-size:16px;border-radius:8px;opacity:40%}.container form button{padding:10px;background-color:var(--primaryRT);color:#fff;border:none;border-radius:8px;cursor:pointer}.grad{background:linear-gradient(45deg,#da7377,#f1bd5b,#e9de7a,#7be677,#93dde2,#8283e2,#d894df);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    button{border:none;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;border-radius:12px}#aa{display:flex;column-gap:10px;justify-content:center}#b1{color:var(--text);background-color:#2a1e5c}#b2{color:var(--background);background-color:#f25f5c}`

    return new Response(css, {status: 200, headers: {"Content-Type": "text/css"}})
});

app.get('/register', (c) => {return c.html('<!DOCTYPE html>' + <RegisterComponent />)});
app.get('/login', (c) => {return c.html('<!DOCTYPE html>' + <LoginComponent />)});

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

  const token = await createJWT({ username }, c);
  return setSignedCookie(c, 'authToken', token, c.env.PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  }).then(() => c.text('User registered successfully'))
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
  } catch (error) {return c.json({ error: 'Error retrieving user from the database' }, 500)}

  if (!user || !(await bcrypt.compare(password, user.password))) {return c.json({ error: 'Invalid username or password' }, 401)}

  const token = await createJWT({ username: user.username }, c);
  return setSignedCookie(c, 'authToken', token, c.env.PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  }).then(() => c.text('You are now logged in.'));
});

// JWT middleware for protected routes
app.use('/me', async (c) => {
  const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
  if (!token) {
    return c.redirect('/login', 307)
  }

  try {
    const payload = await verifyJWT(token, c);
    c.req.jwtPayload = payload;
  } catch (error) {
    return c.json({ error: 'Unauthorized - Internal Error' }, 401);
  }

  const user = c.req.jwtPayload; 
  return c.html('<!DOCTYPE html>' + <Account user={user}/>)
});

const Account: FC<UserProps> = ({ user }) => {
  return (
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
        <h1 class="grad">Welcome, {user.username}</h1>
        <h2>Account actions:</h2>
        <div id="aa">
          <button id="b1" hx-post="/me/logout" hx-trigger="click" hx-target="#aa" hx-swap="morph:{ignoreActiveValue:true}" hx-vals={`{ "username": "${user.username}" }`}>Logout</button>
          <button id="b2" hx-post="/me/delete" hx-trigger="click" hx-target="#aa" hx-swap="morph:{ignoreActiveValue:true}" hx-vals={`{ "username": "${user.username}" }`}>Delete Account</button>
        </div>
      </div>
    </body>
    </html>
  );
};
// Protected route example
app.get('/me/info', async (c) => {
  const user = c.req.jwtPayload;  // JWT payload is available here
  return c.json({ message: 'Protected data', user });
});
// ...
}