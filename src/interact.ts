import { Env } from ".";
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

export async function insertInto(request: Request, env: Env, ctx: any) {
	if (request.method === 'POST') {
		const pool = new Pool({ connectionString: env.DATABASE_URL });
		pool.on('error', err => console.error(err));
		const client = await pool.connect();
		try {
			const body = await request.json();
			const ogurl = body.link;
			const urlPattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
			const atSignPattern = /.*\.[^\/]*@[^\/]*$/;
			console.log(ogurl)

			if (!urlPattern.test(ogurl) || atSignPattern.test(ogurl)) {
				return new Response('Invalid URL', {status: 400});
			}

			await client.query('BEGIN');
			const { rows } = await client.query('SELECT * FROM links WHERE ogurl = $1', [ogurl]);
			if (rows.length > 0) {
				return new Response(JSON.stringify({ link: rows[0].url }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			const id = Math.random().toString(36).substring(2, 10);
			await client.query('INSERT INTO links (id, url, ogurl) VALUES ($1, $2, $3)', [id, `https://dry.nl.eu.org/${id}`, ogurl]);
			await client.query('COMMIT');

			return new Response(JSON.stringify({ id: id, link: `https://dry.nl.eu.org/${id}` }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		} catch (err) {
			await client.query('ROLLBACK');
			throw err;
		} finally {
			client.release();
			ctx.waitUntil(pool.end())
		}
	} else if (request.method === 'GET') {
		return new Response("docs are wip", {
			status: 200,
			headers: {
				"Content-Type": "text/html"
			}
		});
	}
}

export async function getUrl(request: Request, env: Env, ctx: any) {
    if (request.method === 'POST') {
        const pool = new Pool({ connectionString: env.DATABASE_URL });
        pool.on('error', err => console.error(err));
        const client = await pool.connect();
        try {
            const body = await request.json();
            const uid = body.id;

            const { rows } = await client.query('SELECT * FROM links WHERE id = $1', [uid]);
            if (rows.length > 0) {
				return new Response(JSON.stringify({ ogurl: rows[0].ogurl }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				});
            } else {
                return new Response('URL not found', {status: 404});
            }
        } catch (err) {
            throw err;
        } finally {
            client.release();
            ctx.waitUntil(pool.end())
        }
    } else {
        return new Response('Method not allowed', {status: 405});
    }
}
