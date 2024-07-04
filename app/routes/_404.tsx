// app/routes/_404.tsx
import { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
  return c.render(<h1>Page does not exist.</h1>)
}

export default handler