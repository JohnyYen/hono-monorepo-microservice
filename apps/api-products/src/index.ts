import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './api/product.route.js'


const app = new Hono()

const port = 3000

app.get('/', (c) => {
  return c.text(`Hello Hono! in ${port}`)
})

app.route("products", router)

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
