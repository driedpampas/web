// app/routes/_404.tsx
import { NotFoundHandler } from 'hono'
import BoxContainer from '../components/boxtainer'

const handler: NotFoundHandler = (c) => {
  return c.render(
    <BoxContainer color='rgba(196, 81, 81, 0.582)'>
      <h1>Not found or not implemented.</h1>
    </BoxContainer>,
    { title: 'Not found' }
  )
}

export default handler

