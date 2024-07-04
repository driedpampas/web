import { createRoute } from "honox/factory"
import UserPane from "../components/userpane"

export default createRoute((c) => {
    return c.render(
      <>
        <UserPane />
      </>,
      { title: 'Account' }
    )
  })