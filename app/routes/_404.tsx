// app/routes/_404.tsx
import { NotFoundHandler } from 'hono'
import BoxContainer from '../components/boxtainer'

const handler: NotFoundHandler = async (c) => {
    return c.render(
        <BoxContainer color='rgba(196, 81, 81, 0.582)'>
            <h1>Not found or not implemented.</h1>
            <h3>If you are coming from a shortlink, it may not be available anymore</h3>
            <h3>or you might have to precede the ID with "/r"</h3>
        </BoxContainer>,
        { title: 'Not found' }
    )
}

export default handler

