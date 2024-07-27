import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honox({ devServer: {adapter} }), pages()],
  optimizeDeps: {
    include: ['hono/jsx', 'hono/jsx/jsx-dev-runtime', 'honox/vite/components', 'hono', 'hono/adapter'],
    exclude: ['hono/cookie']
  }
})
