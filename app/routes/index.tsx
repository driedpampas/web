import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import { getCookie, setCookie } from 'hono/cookie'
//import { getConnInfo } from 'hono/bun'
//@ts-ignore
import { getConnInfo } from '/home/astra/Documents/database/honox-client/node_modules/hono/dist/adapter/cloudflare-workers/conninfo.js'

export const POST = createRoute(async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>()
  setCookie(c, 'name', name)
  return c.redirect('/')
})

export default createRoute((c) => {
  const info = getConnInfo(c) // info is `ConnInfo`
  return c.text(`Your remote address is ${info.remote.address}`)
  //return c.redirect('/shorten')
})
