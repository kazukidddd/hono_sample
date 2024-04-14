import { Hono } from "hono";

const app = new Hono();



app.get("/page", (c)=> {
    return c.text("You are authorized to view this page!");
})

export default app;