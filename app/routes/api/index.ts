import { createRoute } from 'honox/factory'

export default createRoute((c) => {
    return c.text(`
- /api/add => for submitting links to be shortened
- /r/:link => for redirecting to the original link
`)
})