import { createRoute } from 'honox/factory'

export default createRoute((c) => {
    return c.text(`You're not supposed to be here.`)
})