// src/templates/basic/index.js
import { Client } from "@neondatabase/serverless";
import renderHtml from "./renderHtml.ts";
import { getUrl, insertInto } from "./interact.js";

export interface Env {
    DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: any) {
        function isInsert(request) {
            return new URL(request.url).pathname === '/v1/add';
        }

        function isStatus(request) {
            return new URL(request.url).pathname === '/status';
        }

        function isGet(request) {
            return new URL(request.url).pathname === '/v1/get';
        }

        if (isStatus(request)) {
            return status(request, env, ctx);
        } else if (isInsert(request)) {
            return insertInto(request, env, ctx);
        } else if (isGet(request)) {
            return getUrl(request, env, ctx);
        } else {
            return new Response("not here", {
                status: 404,
                headers: {
                    "Content-Type": "text/html"
                }
            });
        }
	},
};

async function status(request: Request, env: Env, ctx: { waitUntil: (arg0: Promise<void>) => void; }) {
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

/*const allowedOrigins = [];

export function isAllowedOrigin(origin: string) {
	return allowedOrigins.includes(origin);
}

export function setCorsHeaders(response: { headers: { set: (arg0: string, arg1: string) => void; }; }, origin: any) {
	response.headers.set('Access-Control-Allow-Origin', origin);
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return response;
}
*/
