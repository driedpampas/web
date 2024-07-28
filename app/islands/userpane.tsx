import { FC, useEffect, useState } from 'hono/jsx';
import { Context } from 'hono';
import './css/Account.css'

const canSetCookies = () => {
    try {
        document.cookie = "testcookie=1";
        const canSet = document.cookie.indexOf("testcookie=") !== -1;
        document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return canSet;
    } catch (e) {
        throw e;
    }
};

const UserPane: FC<{ c: Context, view: 'login' | 'register' | 'userAccount' }> = ({ c, view }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'userAccount'>(view);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!canSetCookies()) {
                setShowDialog(true);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [c, view]);

    if (showDialog) {
        return (
            <>
                <h1 className="L">Error</h1>
                <p>Authentication requires cookies, which seem to be disabled. If this is an error, please report it.</p>
            </>
        );
    }

    if (currentPage === 'userAccount') {
        return (
            <div className="account">
                <pre className="grad">Improvements and an actual purpose will be coming. Stay tuned!</pre>
                <h2>Account actions:</h2>
                <div id="actions">
                    <button id="logout">Logout</button>
                    <button id="delete">Delete Account</button>
                </div>
                <button class="reg">
                    <a href='/shorten'>Back home</a>
                </button>
            </div>
        );
    }

    if (currentPage === 'login') {
        return (
            <>
                <h1 className="L">Login</h1>
                <form hx-post="/api/user/login" hx-trigger="submit" hx-target="this" hx-swap="innerHTML" id="loginForm">
                    <input type="text" name="username" placeholder="Enter your username" required />
                    <input type="password" name="password" placeholder="Enter your password" required />
                    <button type="submit">Login</button>
                </form>
                <button class="reg">
                    <a href='/me/register'>Don't have an account? Register</a>
                </button>
            </>
        );
    }

    return (
        <>
            <h1 className="L">Register</h1>
            <form hx-post="/api/user/new" hx-trigger="submit" hx-target="this" hx-swap="innerHTML" id="registerForm">
                <input type="text" name="username" placeholder="Enter your username" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Register</button>
            </form>
            <button class="reg">
                <a href='/me/login'>Already have an account? Login</a>
            </button>
        </>
    );
};

export default UserPane;
