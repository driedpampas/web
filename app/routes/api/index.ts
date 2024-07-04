import { Hono } from 'hono'

const app = new Hono()

// matches `/about/:name`
app.get('/', (c) => {
    const name = c.req.param('name')
    return c.json({
      'your name is': name,
    })
})

export default app
