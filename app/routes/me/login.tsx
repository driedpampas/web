import { createRoute } from "honox/factory";
import BoxContainer from "../../components/boxtainer";
import UserPane from "../../components/user/userpane";

export default createRoute(async (c) => {
    return c.render(
        <BoxContainer>
            <UserPane c={c} view='login' />
        </BoxContainer>,
        { title: 'Login' }
    );
})