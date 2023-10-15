import express from "express";
import {
    getUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const userRouter = express.Router();

/* READ */
userRouter.get("/:id", verifyToken, getUser);

export { userRouter };
