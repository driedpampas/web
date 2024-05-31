import { Unkey } from "@unkey/api";
import { setSignedCookie } from 'hono/cookie'

export default function(app: { all: (arg0: string, arg1: (c: any) => Response) => void; get: (arg0: string, arg1: (c: any) => any) => void; post: (arg0: string, arg1: (c: any) => Promise<any>) => void; }) {
// ...

const accountCreationPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Creation</title>
  <style>
  :root {
    --text: #fae0e5;
    --background: #0e0205;
    --primaryRT: #eb8098;
    --secondaryRT: #712f3d;
  }
    body {
      font-family: Arial, sans-serif;
      background-color: var(--background);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background-color: var(--secondaryRT);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .container h1 {
      margin-top: 0;
      color: var(--text)
    }
    .container form {
      display: flex;
      flex-direction: column;
    }
    .container form input {
      margin-bottom: 10px;
      padding: 8px;
      font-size: 16px;
      border-radius: 8px;
      opacity: 40%
    }
    .container form button {
      padding: 10px;
      background-color: var(--primaryRT);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Create Account</h1>
    <form>
      <input type="text" name="username" placeholder="Enter your username" required>
      <button type="submit">Create Account</button>
    </form>
  </div>
  <scriptsrc="https://dry.nl.eu.org/loginjs"></script>
</body>
</html>
`;

app.all('/loginjs', (c) => {
	const jsCode = `
  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const response = await fetch('https://dry.nl.eu.org/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Account created');
      // Handle successful account creation here
    } else {
      alert('Error: ' + data.error);
      // Handle errors here
    }
  });
	`;
  
	return new Response(jsCode, {
    status: 200,
		headers: {"Content-Type": "application/javascript"}
    });
});


// Serve the account creation page
app.get('/login', (c) => {
  return c.html(accountCreationPage);
});

// Handle form submissions and generate API key
app.post('/login', async (c) => {
  const body = await c.req.json();
  const username = body.username;

  // Retrieve the Unkey API token and API ID from environment variables
  const token = c.env.UNKEY_ROOT_KEY;
  const apiId = c.env.UNKEY_API_ID;

  if (!token || !apiId) {
    return c.json({ error: 'Server configuration error' }, 500);
  }

  // Generate a unique API key using Unkey API
  const unkey = new Unkey({ token });
  const key = await unkey.keys.create({
    name: 'User API Key',
    ownerId: username,
    apiId,
  });

  const keyID = key.result?.keyId
  setSignedCookie(c, username, keyID?.toString() || '0', c.env.PASSWORD, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), sameSite: 'strict' });
  return c.text('Account created', 200)
});

// ...
}