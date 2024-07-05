//@ts-nocheck
import { createRoute } from "honox/factory"
import UserPane from "../../components/user/userpane"
import BoxContainer from "../../components/boxtainer"

export default createRoute((c) => {
    return c.render(
    <BoxContainer>
        <UserPane />
    </BoxContainer>,
      { title: 'Account' }
    )
  })