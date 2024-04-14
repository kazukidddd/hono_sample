import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono()

let blogPosts = [
  {
    id: 1,
    title: 'Hello Hono',
    content: 'This is my first blog post',
  },
  {
    id: 2,
    title: 'Hello World',
    content: 'This is my second blog post',
  },
  {
    id: 3,
    title: 'Hello Hono',
    content: 'This is my third blog post',
  },
];

app.use("*", prettyJSON());

app.get('/', (c) => {
  return c.text('Hello Hono!Hello Hono!')
});

app.get("/posts", (c) => c.json({posts: blogPosts}));

app.get("/posts/:id", (c) => {
  const id = Number(c.req.param("id")); // Convert id to a number
  const post = blogPosts.find((p) => p.id === id);

  if (post) {
    return c.json(post);
  
  } else {
    return c.json({ message: "Post not found" }, 404);
  }
});

app.post("/posts", async (c) => {
  const {title, content} = await c.req.json<{title: string; content: string}>();
  const newPost = { id: blogPosts.length + 1, title, content };

  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

app.put("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === Number(id));

  if(index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  const {title, content} = await c.req.json<{title: string; content: string}>();

  blogPosts[index] = { ...blogPosts[index], title, content };

  return c.json(blogPosts[index]);
});

app.delete("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === Number(id));

  if(index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  blogPosts = blogPosts.filter((p) => p.id !== Number(id));

  return c.json({ message: "Post deleted" });
});

app.get('/hello', (c) => {
  return c.text('Hello Hono!')
})

export default app
