// app/routes/_error.tsx
import { ErrorHandler } from 'hono'
import BoxContainer from '../components/boxtainer'

const handler: ErrorHandler = (e, c) => {
  return c.render(
    <BoxContainer color='rgba(196, 81, 81, 0.582)'>
      <h1>Error! {e.message}</h1>
    </BoxContainer>,
    { title: 'Error' }
  )
}

export default handler