import { createRoute } from 'honox/factory'
import BoxContainer from '../components/boxtainer';
import { Context } from 'hono';
import ShortenForm from '../islands/ShortenForm';

export default createRoute((c: Context) => {
  return c.render(
    <BoxContainer shead={true}>
      <h1>Canada Dry</h1>
      <a className="Sa" href="/tos"><h6>what's a service of terms?</h6></a>
      <ShortenForm />
    </BoxContainer>,
    { title: 'Shorten',
      css: 'Shorten' }
  )
})
