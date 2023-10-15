import express from "express";
import {createPost, deletePost, getFeedPosts, getUserPosts, getSinglePosts, addComment, updatePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter = express.Router();

/* Create */
postRouter.post("/", verifyToken, createPost);

/* READ */
postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, getUserPosts);
postRouter.get("/:postId", verifyToken, getSinglePosts);

/* UPDATE */
postRouter.patch("/:postId/comment", verifyToken, addComment);
postRouter.patch("/:postId/update", verifyToken, updatePost);

/* DELETE */
postRouter.delete("/:id/delete", verifyToken, deletePost);

export { postRouter };