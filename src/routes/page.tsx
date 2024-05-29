import type { FC } from 'hono/jsx'
import { html } from 'hono/html';

const AddPage: FC = () => (
<html>
  <head>
  {html`
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
          listItem.textContent = window.location.origin + '/' + data;
      } else {
          listItem.textContent = data;
      }

      shortenedLinkList.appendChild(listItem);
      linkInput.value = '';
  });
  </script>
        `}
  </head>
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
    <form id="shorten-form" style={s.form}>
      <input type="text" id="link-input" placeholder="Enter a link" required style={s.input} />
      <button type="submit" style={s.button}>Shorten</button>
    </form>
    <ul id="shortened-link" style={s["#shortened-link"]}></ul>
  </body>
</html>
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
};

export default function(app: { get: (arg0: string, arg1: (c: any) => any) => void }) {
// ...
app.get('/add', (c) => {
    return c.html(<AddPage />)
})
// ...
}