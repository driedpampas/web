import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href={`/styles/${title}.css`} />
        <script src={`/js/${title}.js`} />
        <script src={`/ds/htmx.min.js`} />
        <script src={`/js/stopcf.js`} />
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  )
})