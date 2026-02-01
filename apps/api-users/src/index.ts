import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()


const port = 3001

app.get('/', (c) => {
  return c.text(`Hello Hono! in ${port}`)
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
