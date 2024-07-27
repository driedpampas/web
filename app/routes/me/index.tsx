import { createRoute } from "honox/factory"
import UserPane from "../../islands/userpane"
import BoxContainer from "../../components/boxtainer"
import { Context } from "hono";
import { getSignedCookie } from "hono/cookie";
import { env } from "hono/adapter";

export default createRoute(async (c: Context) => {
  const { SECRET } = env(c)
    const token = await getSignedCookie(c, SECRET, 'authToken');
  if (token) {
    return c.render(
      <BoxContainer>
        <UserPane c={c} view="userAccount" />
      </BoxContainer>,
      { title: 'Account' }
    );
  } else {
    return c.redirect('/me/login');
  }
});