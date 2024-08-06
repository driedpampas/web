import { Hono } from 'hono'
import BoxContainer from '../../components/boxtainer';
import { Context } from 'hono';

const app = new Hono()

app.get('/:link', async (c: Context) => {
    const linkId = c.req.param('link')

    if (!linkId) {
        return c.render(
            <BoxContainer color='rgba(196, 81, 81, 0.582)'>
                <h1>No shortlink was passed or there was an error.</h1>
            </BoxContainer>,
            { title: 'Not found' }
        )
    }
    
    const { results } = await c.env.DB.prepare("SELECT * FROM links WHERE id = ?").bind(linkId).all();
    
    if (results.length > 0) {
        let redir = results[0].src;
        return c.redirect(redir);
        //return c.html(`<html><head><meta http-equiv="refresh" content="0; URL='${redir}'" /></head></html>`);
    } else return c.render(
      <BoxContainer color='rgba(196, 81, 81, 0.582)'>
          <h1>This link was deleted or is invalid.</h1>
      </BoxContainer>,
      { title: 'Not found' }
  )
})

export default app