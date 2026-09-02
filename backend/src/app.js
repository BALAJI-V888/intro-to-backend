import express from "express";
import userRouter from './routes/user.route.js'; // Routes import
import postRouter from './routes/post.route.js'


const app = express(); //create an express app

app.use(express.json());

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;