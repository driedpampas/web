import { Unkey } from "@unkey/api";

export default function(app: { get: (arg0: string, arg1: (c: any) => any) => void; post: (arg0: string, arg1: (c: any) => Promise<any>) => void; }) {
// ...

const accountCreationPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Creation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .container h1 {
      margin-top: 0;
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
    }
    .container form button {
      padding: 10px;
      background-color: #007BFF;
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
    <form action="/create-account" method="POST">
      <input type="text" name="username" placeholder="Enter your username" required>
      <button type="submit">Create Account</button>
    </form>
  </div>
</body>
</html>
`;

// Serve the account creation page
app.get('/login', (c) => {
  return c.html(accountCreationPage);
});

// Handle form submissions and generate API key
app.post('/create-account', async (c) => {
  const body = await c.req.parseBody();
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

  // Respond with the generated API key
  return c.json({ message: 'Account created successfully', apiKey: key.result });
});

// ...
}