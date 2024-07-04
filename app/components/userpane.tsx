import { FC, useEffect, useState } from 'hono/jsx';

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
  
const UserPane: FC = () => {
    const [showDialog, setShowDialog] = useState(false);
  
    useEffect(() => {
      if (!canSetCookies()) {
        setShowDialog(true);
      }
    }, []);
  
    if (showDialog) {
        return (
            <div className="container">
              <p>Authentication requires cookies, which seem to be disabled. If this is an error, please report it.</p>
            </div>
        );
    } else {/*if () {
        return (
        <div class="container">
            <h1 class="grad">Welcome, {user.username}</h1>
            <h2>Account actions:</h2>
            <div id="aa">
                <button id="b1">Logout</button>
                <button id="b2">Delete Account</button>
            </div>
        </div>
        );
    } else*/} {
        return (
        <div class="container">
            <h1>Account</h1>
            <form hx-post="/api/register" hx-trigger="submit" hx-target="this" hx-swap="innerHTML">
                <input type="text" name="username" placeholder="Enter your username" required />
                <button type="submit">Access</button>
            </form>
        </div>
        );
    }
};
  
export default UserPane;
