# api
API I created for my website. It is hosted on Cloudflare's network as a Worker.

## Important info
This worker was made with the Neon integration enabled, them migrated to TypeScript so you will need to create a `DATABASE_URL` secret with `wrangler` or in the Cloudflare Dashboard. If you want to do it manually, log into the [Neon Console](https://console.neon.tech/app/) and go to `Branch` > `Overview`, and under `Computes` tap `Connect`. Make sure `Pooled connection` is enabled and copy the connection string. It should look like:
```connection string
postgresql://<owner_role>:<password>@<compute_id>-pooler.<server_&_region>.aws.neon.tech/<database_name>?sslmode=require
```
Now add it your preferred way to your worker and you are ready. 
#### PS: You may need to tweak the table names and whatnot
