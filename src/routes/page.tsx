import type { FC } from 'hono/jsx'
export default function(app: { get: (arg0: string, arg1: (c: any) => any) => void; all: (arg0: string, arg1: (c: any) => void) => void; post: (arg0: string, arg1: (c: any) => Promise<void>) => void; }) {
// ...

const ShortenComponent: FC = () => {
	return(
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
				<svg width="585" height="475" viewBox="0 0 585 475" fill="var(--color1)" xmlns="http://www.w3.org/2000/svg"><path d="M59.6878 70.4072C2.64247 112.7 -16.8108 220.14 15.7866 303.15C34.714 338.439 85.6079 417.473 137.764 451.308C202.958 493.601 346.492 482.305 380.666 392.728C414.841 303.151 608.848 251.138 582.56 142.122C556.271 33.1053 429.562 31.2664 323.621 6.83623C217.68 -17.5939 116.733 28.1141 59.6878 70.4072Z" fill="#B071FF"/></svg>
				<div class="login-button-container">
						<a href="https://dry.nl.eu.org/login">Login</a>
				</div>
				<div class="header">
						<a href="https://driedpampas.ro.eu.org">Home</a>
						<a href="https://dry.nl.eu.org/links">More</a>
				</div>
				<h1>Canada Dry</h1>
				<h6>what's a service of terms?</h6>
					<input type="text" id="link-input" name="link" placeholder="Enter a link" hx-post="/v1/add" hx-swap="morph:{ignoreActiveValue:true}" hx-target="#shortened-link" hx-trigger="click from:#submit-link" required />
					<button id="submit-link">Submit</button>
					<div id="shortened-link"></div>
			</body>
		</html>
	);
}

app.get('/shorten', (c) => {
    return c.html('<!DOCTYPE html>' + <ShortenComponent />)
})

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
	.login-button-container {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.login-button-container button {
		padding: 10px 20px;
		background-color: #4caf50;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
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
		color: #ffffff;
		text-decoration: none;
		font-size: 1.2em;
		margin: 0 10px;
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

/*app.all('jscript', (c) => {
	const js = ``

	return new Response(js, {
        status: 200,
		headers: {"Content-Type": "application/javascript"}
    });
});*/
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