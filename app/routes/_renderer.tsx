import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children, title, js, inlineScript }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href={`/styles/Shorten.css`} />
        {js && <script src={`/js/${title}.js`} />}
        <script src={`/ds/htmx.min.js`} />
        <script src={`/js/stopcf.js`} />
        {inlineScript && (
          <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
})

//        <link rel="stylesheet" href={`/styles/${title}.css`} />
