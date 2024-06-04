import { Context } from 'hono';
import { getSignedCookie } from 'hono/cookie';
import type { FC } from 'hono/jsx';
import { verify } from 'hono/jwt';

export default function(app: { get: (arg0: string, arg1: (c: any) => any) => void; all: (arg0: string, arg1: (c: any) => any) => void; post: (arg0: string, arg1: (c: any) => Promise<void>) => void;}) {
// ...
interface Props {
	isLoggedIn: boolean;
}

const ShortenComponent: FC<Props> = ({ isLoggedIn }) => {
	return (
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="shortcut icon" href="https://i.imgur.com/BqWAAZk.png" />
			<link rel="stylesheet" type="text/css" href="https://dry.nl.eu.org/shstyle" />
			<script type="application/javascript" src="https://lunarcascade.nl.eu.org/static/htmx.min.js" />
			<script type="application/javascript" src="https://lunarcascade.nl.eu.org/static/idiomorph.ext.js" />
			<title>Shorten a Link</title>
		</head>
		<body>
			<svg width="585" height="475" viewBox="0 0 585 475" fill="var(--color1)" xmlns="http://www.w3.org/2000/svg">
				<path d="M59.6878 70.4072C2.64247 112.7 -16.8108 220.14 15.7866 303.15C34.714 338.439 85.6079 417.473 137.764 451.308C202.958 493.601 346.492 482.305 380.666 392.728C414.841 303.151 608.848 251.138 582.56 142.122C556.271 33.1053 429.562 31.2664 323.621 6.83623C217.68 -17.5939 116.733 28.1141 59.6878 70.4072Z" fill="#B071FF" />
			</svg>
			<div className="header">
				<a href="https://dry.nl.eu.org/links">
					<img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iRGFzaGJvYXJkLUZpbGwtLVN0cmVhbWxpbmUtUmVtaXgtRmlsbC5zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwMDAwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVzYz5EYXNoYm9hcmQgRmlsbCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbTwvZGVzYz4KIDxwYXRoIGQ9Im0wLjE2IDhjMCAwLjQ4MTEzMzMzMzMgMC4zOSAwLjg3MTEzMzMzMzMgMC44NzExMzMzMzMzIDAuODcxMTMzMzMzM2g1LjIyNjY2NjY2N2MwLjQ4MTA2NjY2NjcgMCAwLjg3MTA2NjY2NjctMC4zOSAwLjg3MTA2NjY2NjctMC44NzExMzMzMzMzdi02Ljk2ODg2NjY2N2MwLTAuNDgxMTMzMzMzMy0wLjM4OTkzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMDY2NjY2Ny0wLjg3MTEzMzMzMzNoLTUuMjI2NjY2NjY3Yy0wLjQ4MTEzMzMzMzMgMC0wLjg3MTEzMzMzMzMgMC4zOS0wLjg3MTEzMzMzMzMgMC44NzExMzMzMzMzdjYuOTY4ODY2NjY3em0wIDYuOTY4ODY2NjY3YzAgMC40ODExMzMzMzMzIDAuMzkgMC44NzExMzMzMzMzIDAuODcxMTMzMzMzMyAwLjg3MTEzMzMzMzNoNS4yMjY2NjY2NjdjMC40ODEwNjY2NjY3IDAgMC44NzEwNjY2NjY3LTAuMzkgMC44NzEwNjY2NjY3LTAuODcxMTMzMzMzM3YtMy40ODQ0YzAtMC40ODExMzMzMzMzLTAuMzg5OTMzMzMzMy0wLjg3MTEzMzMzMzMtMC44NzEwNjY2NjY3LTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2NjdjLTAuNDgxMTMzMzMzMyAwLTAuODcxMTMzMzMzMyAwLjM5LTAuODcxMTMzMzMzMyAwLjg3MTEzMzMzMzN2My40ODQ0em04LjcxMTEzMzMzMyAwYzAgMC40ODExMzMzMzMzIDAuMzkgMC44NzExMzMzMzMzIDAuODcxMDY2NjY2NyAwLjg3MTEzMzMzMzNoNS4yMjY2NjY2NjdjMC40ODExMzMzMzMzIDAgMC44NzExMzMzMzMzLTAuMzkgMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM3YtNi45Njg4NjY2NjdjMC0wLjQ4MTEzMzMzMzMtMC4zOS0wLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2NjdjLTAuNDgxMDY2NjY2NyAwLTAuODcxMDY2NjY2NyAwLjM5LTAuODcxMDY2NjY2NyAwLjg3MTEzMzMzMzN2Ni45Njg4NjY2Njd6bTAuODcxMDY2NjY2Ny0xNC44MDg4NjY2N2MtMC40ODEwNjY2NjY3IDAtMC44NzEwNjY2NjY3IDAuMzktMC44NzEwNjY2NjY3IDAuODcxMTMzMzMzM3YzLjQ4NDRjMCAwLjQ4MTEzMzMzMzMgMC4zOSAwLjg3MTEzMzMzMzMgMC44NzEwNjY2NjY3IDAuODcxMTMzMzMzM2g1LjIyNjY2NjY2N2MwLjQ4MTEzMzMzMzMgMCAwLjg3MTEzMzMzMzMtMC4zOSAwLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzdi0zLjQ4NDRjMC0wLjQ4MTEzMzMzMzMtMC4zOS0wLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2Njd6IiBzdHlsZT0iZmlsbDojZmZmIi8+Cjwvc3ZnPgo=" />
					Home
				</a>
				<UserButton isLoggedIn={isLoggedIn} />
			</div>
			<h1>Canada Dry</h1>
			<h6>what's a service of terms?</h6>
				<input type="text" id="link-input" name="link" placeholder="Enter a link" hx-post="/v1/add" hx-swap="morph:{ignoreActiveValue:true}" hx-target="#shortened-link" hx-trigger="click from:#submit-link" required />
				<button id="submit-link">Submit</button>
			<div id="shortened-link"></div>
		</body>
	</html>
	);
};

const UserButton: FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
	if (isLoggedIn) {
		return (
			<a href="https://dry.nl.eu.org/me">
				<img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiBjb2xvcj0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJtMTIgMmMtNS41MjI4NSAwLTEwIDQuNDc3MTUtMTAgMTAgMCA1LjUyMjggNC40NzcxNSAxMCAxMCAxMCA1LjUyMjggMCAxMC00LjQ3NzIgMTAtMTAgMC01LjUyMjg1LTQuNDc3Mi0xMC0xMC0xMHoiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im00LjI3MSAxOC4zNDU3czIuMjI5MDItMi44NDU3IDcuNzI5LTIuODQ1N2M1LjUgMCA3LjcyOTEgMi44NDU3IDcuNzI5MSAyLjg0NTciIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0xMiAxMmMxLjY1NjkgMCAzLTEuMzQzMSAzLTMgMC0xLjY1Njg1LTEuMzQzMS0zLTMtM3MtMyAxLjM0MzE1LTMgM2MwIDEuNjU2OSAxLjM0MzEgMyAzIDN6IiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KIDwvZz4KPC9zdmc+Cg==" />
			    Account
			</a>
		);
		} else {
		return (
			<a href="https://dry.nl.eu.org/login">
				<img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiBjb2xvcj0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJtMTcgMTBoM20zIDBoLTN2LTNtMCAzdjMiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0xIDIwdi0xYzAtMy44NjYgMy4xMzQwMS03IDctNyAzLjg2NiAwIDcgMy4xMzQgNyA3djEiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im04IDEyYzIuMjA5MSAwIDQtMS43OTA5IDQtNCAwLTIuMjA5MTQtMS43OTA5LTQtNC00LTIuMjA5MTQgMC00IDEuNzkwODYtNCA0IDAgMi4yMDkxIDEuNzkwODYgNCA0IDR6IiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KIDwvZz4KPC9zdmc+Cg==" />
				Login	
			</a>
		);
	}
};

const isLoggedIn = async (c: Context) => {
	async function verifyJWT(token: string, context: Context) {
		const secretKey = context.env.PASSWORD;
		return verify(token, secretKey);
	}

	const token = await getSignedCookie(c, c.env.PASSWORD, 'authToken');
	if (!token) {return false}

	try {
		const payload = await verifyJWT(token, c);
		// @ts-ignore
		c.req.jwtPayload = payload;
		return true;
	} catch (error) {return false}
};

app.get('/shorten', async (c) => {const loginStatus = await isLoggedIn(c); return c.html('<!DOCTYPE html>' + <ShortenComponent isLoggedIn={loginStatus} />)});

app.all('/shstyle', (c) => {
	const css = `
	:root {
		--color1: #B071FF;
		--color2: #FF9C71;
	}
	body {
		font-family: 'Arial', sans-serif;
		background-color: #1C1B22;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		position: relative;
	}
	h1 {color: #ffffff;}
	h6 {color: #ffffff; margin-top: 0px; margin-bottom: 1em;}
	h3 {color: #ffffff; margin-top: 0px;}
	form {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input {
		width: 300px;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #4e694f;
		border-radius: 5px;
		font-size: 16px;
		background-color: #1C1B22;
		color: white;
	}
	button {
		padding: 10px 20px;
		background-color: #4e694f;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
	}
	button:hover {
		background-color: #464e46;
	}
	#shortened-link {
		margin-top: 20px;
		font-size: 18px;
		color: #dadada;
		list-style: none;
		padding: 0;
	}
	#shortened-link li {
		margin-bottom: 10px;
		list-style-type: none;
	}
	#shortened-link li::before {
		content: "\\2022"; /* Unicode character for a bullet point (\u25cb) */
		color: #4caf50; 
		display: inline-block;
		width: 1em
		margin-left: -1em;
	}
	.header {
		display: flex;
		justify-content: space-around;
		padding: 10px;
		background-color: rgba(28, 27, 34, 0.75);
		backdrop-filter: blur(10px);
		border-radius: 15px;
	}
	.header a {
		display: flex;
		color: #ffffff;
		text-decoration: none;
		font-size: 1.2em;
		margin: 0 10px;
	}
	.header img {
		margin-right: 5px;
	}
	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(100px);
	}`

	return new Response(css, {
		status: 200,
		headers: {"Content-Type": "text/css"}
	})
})
// ...
app.post('/shorten', async (c) => {
	//const apiKey = getSignedCookie(c, 'username', 'keyID', c.env.PASSWORD);
	const body = await c.req.json();
	const link = body.link;

	const response = await fetch(`https://dry.nl.eu.org/v1/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			//'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({ link }),
	});
  
	const data: any = await response.json();
	if (response.status !== 200) {return c.res.text('Fatal..')}
	else {return c.res.json({ link: data.link })}
});
// ...
}