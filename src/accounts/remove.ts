import { deleteCookie, getSignedCookie } from "hono/cookie";
import { verifyJWT } from "./user";

export default function(app: {post: (arg0: string, arg1: { (c: any): Promise<any>; (c: any): Promise<any>; }) => void; get: (arg0: string, arg1: (c: any) => any) => void;}) {
// ...
app.post('/me/logout', async (c) => {
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
  
    deleteCookie(c, 'authToken')
    return c.text('You have been logged out.')
});

app.post('/me/delete', async (c) => {
    const { username } = await c.req.parseBody();
    const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
    if (!token) {
      return c.redirect('/login', 307)
    }
  
    try {
      const payload = await verifyJWT(token, c);
    } catch (error) {
      return c.json({ error: 'Unauthorized - Internal Error' }, 401);
    }
  
    // Delete user from the database
    try {
        await c.env.DB.prepare("DELETE FROM users WHERE username = ?").bind(username).run();
    } catch (error) {
        return c.json({ error: 'Error deleting user from the database' }, 500);
    }
  
    deleteCookie(c, 'authToken')
    return c.text('You have been logged out and your account has been deleted.')
})

app.get('/me/logout', (c) => {
    return c.text('Disallowed Method')
})
// ...
}