import {} from 'hono'

type Head = {
  title?: string
  js?: yes | string
  inlineScript?: any
  css?: boolean | string
}

declare module 'hono' {
  interface Env {
    Variables: {
      SECRET: string
    }
    Bindings: {}
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
