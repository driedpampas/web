// src/templates/basic/index.js
import { Client } from "@neondatabase/serverless";
import renderHtml from "./renderHtml.ts";
import { getUrl, insertInto } from "./interact.js";

export interface Env {
    DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: any) {
		if (function isStatus(request: Request): boolean {const pathnames = ['/dbstatus', '/status']; return pathnames.includes(new URL(request.url).pathname);})
			{return status(request, env, ctx);
		} else if (function isInsert(request: Request) {return new URL(request.url).pathname === '/v1/add'})
			{return insertInto(request, env, ctx);
		} else if (function isGet(request: Request) {return new URL(request.url).pathname === '/v1/get'})
			{return getUrl(request, env, ctx);
		} else return status(request, env, ctx); /* new Response("not here", {
			status: 404,
			headers: {
				"Content-Type": "text/html"
			}
		});*/
	},
};

async function status(request: any, env: any, ctx) {
	const client = new Client(env.DATABASE_URL);
	await client.connect();
	const data = await client.query(`SELECT count(*) as num_tables FROM information_schema.tables WHERE table_schema='public'`);
	ctx.waitUntil(client.end());
	const html = await renderHtml(data.rows[0].num_tables);
	return new Response(html, {
		status: 200,
		headers: {
			"Content-Type": "text/html"
		}
	});
}
