// app/routes/_error.tsx
import { ErrorHandler } from 'hono'
import BoxContainer from '../components/boxtainer'

const handler: ErrorHandler = (e, c) => {
  console.error(`Fatal: ${e}`);
  return c.render(
    <BoxContainer color='rgba(196, 81, 81, 0.582)'>
      <h1>Error!</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{e.message}</pre>
    </BoxContainer>,
    { title: 'Error',
      css: 'error'
     }
  )
}

export default handler