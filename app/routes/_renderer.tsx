import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

let envar = !import.meta.env.PROD

export default jsxRenderer(({ children, title, js, css, inlineScript }) => {
  return (
    <html lang="en" data-env={envar ? "dev" : undefined}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href={`/static/styles/Shorten.css`} />
        {js &&  <script src={`/static/js/${js || title}.js`} />}
        {css ? <link rel="stylesheet" href={`/static/styles/${css}.css`} /> : ""}
        <script src={`/static/ds/htmx.min.js`} />
        <script src={`/static/js/stopcf.js`} />
        <Script src="/app/client.ts" async />
        {inlineScript && (
          <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
        )}
      </head>
      <noscript>Javascript seems to be disabled. If this is an error, please report it.</noscript>  
      <body>{children}</body>
    </html>
  )
})