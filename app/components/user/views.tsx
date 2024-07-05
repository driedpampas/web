export const loginPage =
    <>
    <h1>Login</h1>
    <form hx-post="/api/user/login" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
        <input type="text" name="username" placeholder="Enter your username" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Login</button>
    </form>
    <button id="reg" onClick={() => window.location.href = '/me/register'}>Don't have an account? Register</button>
    </>

export const registerPage = 
    <>
    <h1>Register</h1>
    <form hx-post="/api/user/new" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
        <input type="text" name="username" placeholder="Enter your username" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Register</button>
    </form>
    <button id="reg" onClick={() => window.location.href = '/me/login'}>Already have an account? Login</button>
    </>

export const userAccount = 
    <>
    <h1>Welcome</h1>
    <h2>Account actions:</h2>
    <div id="aa">
        <button id="b1">Logout</button>
        <button id="b2">Delete Account</button>
    </div>
    </>