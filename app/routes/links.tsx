import { FC } from "hono/jsx"
import { createRoute } from "honox/factory"

const LinksPage: FC = () => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href="https://i.imgur.com/BqWAAZk.png" />
            <title>Link Tree</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css?family=IBM%20Plex%20Sans:600|IBM%20Plex%20Sans:400" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Manrope:700|Manrope:400" rel="stylesheet" />
            <script src="/static/js/Links.js" />
            <link rel="stylesheet" type="text/css" href="/static/styles/Links.css" />
        </head>
        <body>
            <div class="loadiv">
                <div class="ec749m4jmk"><div class="ldio-mkz3fiu9tmp">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div></div>
            </div>
            <svg viewBox="0 0 200 200" version="1.1" id="svg1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="linearGradient565">
                        <stop style="stop-color:var(--primary);stop-opacity:1;" offset="0" id="stop565" />
                        <stop style="stop-color:var(--accent);stop-opacity:1;" offset="1" id="stop566" />
                    </linearGradient>
                    <radialGradient xlink:href="#linearGradient565" id="radialGradient566" cx="-3.3845117" cy="7.2907557" fx="-3.3845117" fy="7.2907557" r="61.080769" gradientTransform="matrix(0.51835213,-0.69390961,1.2723202,0.95042622,-15.09717,-1.2695071)" gradientUnits="userSpaceOnUse" />
                </defs>
                <path fill="#000000" d="M24.8,-42.4C30.1,-39.9,31,-29.1,26.9,-20.7C22.8,-12.2,13.8,-6.1,22.2,4.8C30.6,15.8,56.4,31.6,58.6,36.8C60.8,42,39.4,36.6,25.7,39.9C12,43.3,6,55.5,-4.2,62.7C-14.3,69.9,-28.6,72.1,-33.4,63.6C-38.2,55.1,-33.5,35.9,-35.3,23.5C-37.1,11.1,-45.3,5.6,-52.6,-4.2C-59.9,-13.9,-66.1,-27.9,-62.2,-36.5C-58.2,-45.1,-44,-48.3,-31.9,-46.9C-19.8,-45.6,-9.9,-39.6,-0.1,-39.5C9.7,-39.3,19.5,-45,24.8,-42.4Z" transform="translate(100 100)" id="path1" style="stroke:none;stroke-opacity:1;fill:url(#radialGradient566)" />
            </svg>
            <div class="container">
                <div>
                    <h1><span>Just</span><span>a</span><span style="color: var(--primary)">linktree  </span></h1>
                </div>
                <div class="card"><div>
                    <a href="https://driedpampas.ro.eu.org" id="btn1">Personal Website</a>
                    <a href="https://stats.fm/delusion" target="_blank" id="btn3">stats.fm</a>
                    <a href="https://twitter.com/driedpampas" target="_blank" id="btn4">Twitter</a>
                    <a href="https://github.com/driedpampas" target="_blank" id="btn5">Github</a>
                    <a href="https://dry.nl.eu.org/shorten" id="btn6">Link Shortener</a>
                </div></div>
            </div>
        </body>
    </html>
    )
    
export default createRoute(async (c) => {
    return c.html('<!DOCTYPE html>' + <LinksPage />)
})