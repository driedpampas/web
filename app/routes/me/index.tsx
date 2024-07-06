import { createRoute } from "honox/factory"
import UserPane from "../../components/user/userpane"
import BoxContainer from "../../components/boxtainer"
import { getSignedCookie } from "hono/cookie";
import { Context } from "hono";

export default createRoute(async (c: Context) => {
  const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
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