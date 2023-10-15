import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, author, heading, description, fileUrl } = req.body;
        const user = await User.findById(userId);
        console.log("user: ", user);
        const newPost = new Post({
            userId,
            name: user.name,
            description,
            filePath: fileUrl,
            heading,
            author,
            comments: [],
        });
        await newPost.save();
        const post = await Post.find().sort({ createdAt: -1 });
        console.log(post);
        res.status(201).json(post);
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ posts: posts });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* READ */
export const getSinglePosts = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        res.status(201).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* Get All Post corresponding to that User */
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const userPosts = await Post.find({ userId })
            .sort({ createdAt: -1 })
            .exec();

        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* UPDATE */
export const addComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentData = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.Comments.push(commentData);

        await post.save();

        return res
            .status(201)
            .json({ message: "Comment added successfully", post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/* UPDATE POST */
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPostData = req.body;

        const post = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/* DELETE */
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);

        const post = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
