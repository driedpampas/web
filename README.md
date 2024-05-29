Started as the API/Backend is now becoming an entire website of sorts.

Uses Cloudflare's `D1` serverless databases and `Workers`, and the `Hono` Framework.

Notes:
- `index.ts` is the... index file
- `./routes` holds the logic for `/v1/add` and `/v1/get` routes and the code for the `add` subdomain page
- `datastore.ts` is the Data Store for the rate limiting component (also uses `D1`)

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
