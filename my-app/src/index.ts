import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { prettyJSON } from 'hono/pretty-json';
import auth from './auth/auth';
import blogs from './blogs/blogs';

const app = new Hono()

app.use("*", prettyJSON());

app.use(
    "/*",
    basicAuth({
        username: "hono",
        password: "password",
    })
);

app.route("/posts", blogs);
app.route("/auth", auth);

app.get('/', (c) => {
  return c.text('Hello Hono!Hello Hono!')
});

app.get('/hello', (c) => {
  return c.text('Hello Hono!')
})

export default app
