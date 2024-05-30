/*import type { FC } from 'hono/jsx'
import { useEffect, useState } from 'hono/jsx';

const AddPage: FC = () => {
    const [shortenedLinks, setShortenedLinks] = useState<string[]>([]);

    const handleSubmit = async (event: any) => {
    event.preventDefault();
    const linkInput = event.target.elements.linkInput;
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: linkInput.value
        }),
    });

    const data = await response.text();

    if (response.status === 200) {
        setShortenedLinks(prevLinks => [...prevLinks, '/' + data]);
    } else {
        setShortenedLinks(prevLinks => [...prevLinks, data]);
    }

    linkInput.value = '';
    };

  return (
    <body style={s.body}>
        <div className="login-button-container" style={s[".login-button-container"]}>
        <a href="https://api.dry.nl.eu.org/login" style={s[".login-button-container button"]}>Login</a>
        </div>
        <div className="header" style={s[".header"]}>
        <a href="https://driedpampas.ro.eu.org" style={s[".header a"]}>Home</a>
        <a href="https://dry.nl.eu.org/links" style={s[".header a"]}>More</a>
        </div>
        <h1 style={s.h1}>Canada Dry</h1>
        <h6 style={s.h6}>what's a service of terms?</h6>
        <form id="shorten-form" style={s.form} onSubmit={handleSubmit}>
        <input type="text" name="linkInput" placeholder="Enter a link" required style={s.input} />
        <button type="submit" style={s.button}>Shorten</button>
        </form>
    </body>
  );
};

const ShortenedLinkList: FC<{ links: string[] }> = ({ links }) => (
    <ul id="shortened-link" style={s["#shortened-link"]}>
      {links.map((link, index) => (
        <li key={index}>{link}</li>
      ))}
    </ul>
);
  
const s = {
    ':root': {
        '--color1': '#B071FF',
        '--color2': '#FF9C71',
    },
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1C1B22',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
    },
    h1: {
        color: '#ffffff',
    },
    h6: {
        color: '#ffffff',
    },
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '300px',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #4e694f',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#1C1B22',
        color: 'white',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4e694f',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    'button:hover': {
      backgroundColor: '#464e46',
    },
    '#shortened-link': {
        marginTop: '20px',
        fontSize: '18px',
        color: '#dadada',
        listStyle: 'none',
        padding: 0,
    },
    '#shortened-link li': {
        marginBottom: '10px',
        listStyleType: 'none',
    },
    '#shortened-link li::before': {
        content: '"\\2022"',
        color: '#4caf50',
        display: 'inline-block',
        width: '1em',
        marginLeft: '-1em',
    },
    '.login-button-container': {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    '.login-button-container button': {
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    '.header': {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#1C1B22',
    },
    '.header a': {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '1.2em',
        margin: '0 10px',
    },
    '.header a:hover': {
        color: '#007BFF',
    },
};*/

import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'

export default function(app: { get: (arg0: string, arg1: (c: any) => any) => void; post: (arg0: string, arg1: (c: any) => void) => void }) {
// ...
app.get('/shorten', (c) => {
    return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="https://i.imgur.com/BqWAAZk.png">
        <title>...</title>
        <style>
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
					h6 {color: #ffffff;}
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
					color: #4caf50; /* Bullet point color */
					display: inline-block;
					width: 1em; /* Adjust as needed for spacing */
					margin-left: -1em; /* Adjust as needed for spacing */
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
					background-color: #1C1B22;
					}
					.header a {
					color: #ffffff;
					text-decoration: none;
					font-size: 1.2em;
					margin: 0 10px;
					}
					.header a:hover {
					color: #007BFF;
					}
					svg {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: -1;
						filter: blur(100px);
				}
        </style>
        </head>
        <body>
				<svg width="585" height="475" viewBox="0 0 585 475" fill="none" xmlns="http://www.w3.org/2000/svg">
					<style>
						@keyframes colorChange1 {
							0%, 100% { fill: var(--color1); }
							50% { fill: var(--color2); }
						}
						path {
							animation: colorChange1 8s infinite linear;
						}
					</style>
				<path d="M59.6878 70.4072C2.64247 112.7 -16.8108 220.14 15.7866 303.15C34.714 338.439 85.6079 417.473 137.764 451.308C202.958 493.601 346.492 482.305 380.666 392.728C414.841 303.151 608.848 251.138 582.56 142.122C556.271 33.1053 429.562 31.2664 323.621 6.83623C217.68 -17.5939 116.733 28.1141 59.6878 70.4072Z" fill="#B071FF"/>
				</svg>
						<div class="login-button-container">
								<a href="https://dash.cloudflare.com">Login</a>
						</div>
						<div class="header">
								<a href="https://driedpampas.ro.eu.org">Home</a>
								<a href="https://dry.nl.eu.org/links">More</a>
						</div>
						<h1>Canada Dry</h1>
						<h6>what's a service of terms?</h6>
						<form id="shorten-form">
								<input type="text" id="link-input" placeholder="Enter a link" required>
								<button type="submit">Shorten</button>
						</form>
						<ul id="shortened-link"></ul>
					<script>
					document.getElementById('shorten-form').addEventListener('submit', async (event) => {
						event.preventDefault();
						const linkInput = document.getElementById('link-input');
						const shortenedLinkList = document.getElementById('shortened-link');
						const response = await fetch('/shorten', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								link: linkInput.value
							}),
						});

						const data = await response.text();
						const listItem = document.createElement('li');

						if (response.status === 200) {
							listItem.textContent = data;
						} else {
							listItem.textContent = data;
						}

						shortenedLinkList.appendChild(listItem);
						linkInput.value = '';
					});
					</script>
				</body>
    </html>
`)
})

app.post('/shorten', async (c) => {
	const apiKey = getSignedCookie(c, 'username', 'keyID', c.env.PASSWORD);
	const body = await c.req.json();
	const link = body.link;
  
	const response = await fetch('/v1/api', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${apiKey}`
	  },
	  body: JSON.stringify({ link }),
	});
  
	const data: any = await response.json();
	c.res.json({ link: data.link });
});
// ...
}