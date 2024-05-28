API backend for my website.

I used Cloudflare's `D1` serverless databases and `Workers`, and the `Hono` Framework.

To use this, a `wrangler.toml` file is needed. Here's an example:

```wrangler.toml
#:schema node_modules/wrangler/config-schema.json
name = "app-name"
main = "src/index.ts"
compatibility_date = "2024-05-24"

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "prod"
database_id = "<database-id-from-cloudflare-dashboard>"

[[routes]] # delete this routes section if you don't want to use a custom domain (and add it back later if you need it)
pattern = "<your own domain here>"
custom_domain = true

[placement]
mode = "smart"
```
