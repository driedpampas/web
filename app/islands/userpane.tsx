import { getSignedCookie, setCookie } from 'hono/cookie';
import { FC, useEffect, useState } from 'hono/jsx';
import { Context } from 'hono';
import './css/Account.css'
import { env } from 'hono/adapter';

const canSetCookies = (c: Context) => {
    try {
        setCookie(c, 'testCookie', '1')
        document.cookie = "testcookie=1";
        const canSet = document.cookie.indexOf("testcookie=") !== -1;
        document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return canSet;
    } catch (e) {
        throw e;
    }
};

async function isAuthenticated(c: Context) {
    const { SECRET } = env(c)
    const token = await getSignedCookie(c, SECRET, 'authToken');

    //const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
    return !!token;
}

const UserPane: FC<{ c: Context, view: 'login' | 'register' | 'userAccount' }> = ({ c, view }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'userAccount'>(view);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!canSetCookies(c)) {
                setShowDialog(true);
            } else {
                const authenticated = await isAuthenticated(c);
                if (isMounted) {
                    setIsUserAuthenticated(authenticated);
                    setCurrentPage(authenticated ? 'userAccount' : view);
                }
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

    if (isUserAuthenticated) {
        return (
            <div className="container">
                <h1>Welcome</h1>
                <h2>Account actions:</h2>
                <div id="aa">
                    <button id="b1">Logout</button>
                    <button id="b2">Delete Account</button>
                </div>
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
