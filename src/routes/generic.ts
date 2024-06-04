export default function(app: { all: (arg0: string, arg1: { (c: any): Promise<any>; (c: any): Promise<any>; }) => void; get: (arg0: string, arg1: (c: any) => Promise<any>) => void; }) {
// ...
app.get('/status', async (c) => {return c.text('online')})

app.all('/', async (c) => {return c.redirect(`/shorten`, 301)})

app.all('*', async (c) => {
    const linkId = c.req.url.slice(22);
    console.log(linkId);

    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE id = ?").bind(linkId).all();

    if (results.length > 0) {
        let redir = results[0].src;
        console.log(redir);
        return c.html(`<html><head><meta http-equiv="refresh" content="0; URL='${redir}'" /></head></html>`);
    } else {return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404</title>
        <link rel="shortcut icon" href="https://cf-asset-bucket.dry.nl.eu.org/checkbox-cross.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Noto Sans Mono', monospace;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #1C1B22;
                color: #fff;
            }
            @media (min-width: 768px) {
                .container {
                    flex-direction: row;
                    justify-content: space-between;
                    max-width: 800px;
                }
                .button-container {margin-right: 20px;}
            }
            @keyframes ldio-mkz3fiu9tmp {
                0% { opacity: 1 }
                100% { opacity: 0 }
            }
            .ldio-mkz3fiu9tmp div {
                left: 97px;
                top: 37px;
                position: absolute;
                animation: ldio-mkz3fiu9tmp linear 1.4492753623188404s infinite;
                background: #ffffff;
                width: 6px;
                height: 42px;
                border-radius: 3px / 3.36px;
                transform-origin: 3px 63px;
            }
            .ldio-mkz3fiu9tmp div:nth-child(1) { transform: rotate(0deg); animation-delay: -1.3526570048309177s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(2) { transform: rotate(24deg); animation-delay: -1.256038647342995s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(3) { transform: rotate(48deg); animation-delay: -1.1594202898550723s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(4) { transform: rotate(72deg); animation-delay: -1.0628019323671496s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(5) { transform: rotate(96deg); animation-delay: -0.9661835748792269s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(6) { transform: rotate(120deg); animation-delay: -0.8695652173913042s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(7) { transform: rotate(144deg); animation-delay: -0.7729468599033815s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(8) { transform: rotate(168deg); animation-delay: -0.6763285024154588s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(9) { transform: rotate(192deg); animation-delay: -0.5797101449275361s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(10) { transform: rotate(216deg); animation-delay: -0.48309178743961345s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(11) { transform: rotate(240deg); animation-delay: -0.38647342995169076s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(12) { transform: rotate(264deg); animation-delay: -0.28985507246376807s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(13) { transform: rotate(288deg); animation-delay: -0.19323671497584538s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(14) { transform: rotate(312deg); animation-delay: -0.09661835748792269s; background: #ffffff; } .ldio-mkz3fiu9tmp div:nth-child(15) { transform: rotate(336deg); animation-delay: 0s; background: #ffffff; }
            .ec749m4jmk {
                width: 200px;
                height: 200px;
                display: inline-block;
                overflow: hidden;
                background: rgba(NaN, NaN, NaN, 0);
            }
            .ldio-mkz3fiu9tmp {
                width: 100%;
                height: 100%;
                position: relative;
                transform: translateZ(0) scale(1);
                backface-visibility: hidden;
                transform-origin: 0 0;
            }
            .ldio-mkz3fiu9tmp div { box-sizing: content-box; }
            .loadiv {
                position: fixed;
                z-index: 0;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: #1C1B22;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .not-found-overlay {
                z-index: 9000;
                background: rgba(28, 27, 34, 0.8);
                background-size: cover;
                font-size: 48px;
                color: white;
                font-family: "Nanum Gothic Coding", monospace;
                font-weight: 700;
                font-style: normal;
            }
        </style>
    </head>
    <body>
        <div class="not-found-overlay">404 – not found</div>
        <div class="loadiv"><div class="ec749m4jmk"><div class="ldio-mkz3fiu9tmp"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>
    </body>
    </html>`, 404)}
})
// ...
}