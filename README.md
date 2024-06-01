Started as an API/Backend, is now becoming an entire website of sorts.

Uses:
- Cloudflare's `D1` serverless databases and `Workers`
- the `Hono` Framework
- `htmx` to submit the form data

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

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [GNU Licenses](https://www.gnu.org/licenses/).