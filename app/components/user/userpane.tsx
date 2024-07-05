import { getSignedCookie } from 'hono/cookie';
import { FC, useEffect, useState } from 'hono/jsx';
import type { Context } from 'hono';

const canSetCookies = () => {
    try {
        document.cookie = "testcookie=1";
        const canSet = document.cookie.indexOf("testcookie=") !== -1;
        // Clean up the test cookie
        document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return canSet;
    } catch (e) {
        return false;
    }
};

async function isAuthenticated(c: Context) {
    const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
    return !!token;
}

const UserPane: FC<{ c: Context, view: 'login' | 'register' | 'userAccount' }> = ({ c, view }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'userAccount'>(view);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!canSetCookies()) {
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
            <div className="container">
                <p>Authentication requires cookies, which seem to be disabled. If this is an error, please report it.</p>
            </div>
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
                <h1>Login</h1>
                <form hx-post="/api/user/login" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
                    <input type="text" name="username" placeholder="Enter your username" required />
                    <input type="password" name="password" placeholder="Enter your password" required />
                    <button type="submit">Login</button>
                </form>
                <button id="reg" onClick={() => setCurrentPage('register')}>Don't have an account? Register</button>
            </>
        );
    }

    return (
        <>
            <h1>Register</h1>
            <form hx-post="/api/user/new" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
                <input type="text" name="username" placeholder="Enter your username" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Register</button>
            </form>
            <button id="reg" onClick={() => setCurrentPage('login')}>Already have an account? Login</button>
        </>
    );
};

export default UserPane;
