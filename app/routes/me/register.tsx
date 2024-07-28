import { createRoute } from "honox/factory";
import BoxContainer from "../../components/boxtainer";
import UserPane from "../../islands/userpane";
import { Context } from "hono";

export default createRoute(async (c: Context) => {
    return c.render(
        <BoxContainer>
            <UserPane c={c} view='register' />
        </BoxContainer>,
        { title: 'Register' }
    );
});