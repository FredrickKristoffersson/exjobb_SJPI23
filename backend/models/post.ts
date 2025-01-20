import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    content: string;
    author: string;
}

const postSchema: Schema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true }
    },
    {timestamps: true});

const Post = mongoose.model<IPost>('Blogpost', postSchema);

export default Post;
