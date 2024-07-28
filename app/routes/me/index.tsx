import { createRoute } from "honox/factory"
import UserPane from "../../islands/userpane"
import BoxContainer from "../../components/boxtainer"
import { Context } from "hono";
import { getSignedCookie } from "hono/cookie";

export default createRoute(async (c: Context) => {
    if (import.meta.env.PROD) {
        try {
            const token = await getSignedCookie(c, c.env.SECRET, 'authToken');
            if (!token) {
                return c.redirect('/me/login');
            }
        } catch (e) {
            throw e;
        }
    }

    return c.render(
        <BoxContainer>
            <UserPane c={c} view="userAccount" />
        </BoxContainer>,
        { title: 'Account' }
    );
});