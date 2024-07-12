import { createRoute } from 'honox/factory'
import BoxContainer from '../components/boxtainer';
import ShortenHeader from '../islands/ShortenHeader';
import { Context } from 'hono';

export default createRoute((c: Context) => {
  return c.render(
    <BoxContainer>
      <ShortenHeader />
      <h1>Canada Dry</h1>
      <a href="https://next.dry.nl.eu.org/tos"><h6>what's a service of terms?</h6></a>
      <input type="text" id="link-input" name="link" placeholder="Enter a link" hx-post="/api/add" hx-swap="morph:{ignoreActiveValue:true}" hx-target="#shortened-link" hx-trigger="click from:#submit-link" required />
      <button id="submit-link">Submit</button>
      <div id="shortened-link"></div>
    </BoxContainer>,
    { title: 'Shorten' }
  )
})
