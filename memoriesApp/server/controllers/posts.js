import express from 'express';
import mongoose from 'mongoose';



import PostMessage from '../models/postMessage.js';


const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);

    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }

}
export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const CreatePost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
    try {
        await newPostMessage.save();
        res.status(200).json(newPostMessage);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, selectedFile, creator, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`no such  post with id:${id}`);
    const updatePost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatePost, { new: true });
    res.json(updatePost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`no such post with id:${id}`);
    await postMessage.findByIdRemove(id);
    res.json({ message: "post deleted sucessfully" });

}
export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`no post with id:${id}`);
    const post = await PostMessage.findById(id);
    const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatePost);



}

export default router;
