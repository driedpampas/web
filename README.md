Started as an API/Backend, is now becoming an entire website of sorts.

Uses Cloudflare's `D1` serverless databases and `Workers`, and the `Hono` Framework.

Notes:
- `index.ts` is the... index file
- `./routes` holds the code for all of the routes, which are consolidated into one function in `/routes/index.ts`

To use this, a `wrangler.toml` file is needed. Here's an example:

```wrangler.toml
#:schema node_modules/wrangler/config-schema.json
name = "app-name"
main = "src/index.ts"
compatibility_date = "2024-05-24"

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "DB_NAME_HERE"
database_id = "DB_ID_HERE"database-id-from-cloudflare-dashboard

[[routes]] # delete this routes section if you don't want to use a custom domain (and add it back later if you need it)
pattern = "<your own domain here>"
custom_domain = true

[placement]
mode = "smart"
```
