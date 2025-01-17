import mongoose, { Schema, Document } from 'mongoose';

// Definiera ett interface för Post
interface IPost extends Document {
    title: string;
    content: string;
    author: string;
}

// Skapa en schema för Post
const postSchema: Schema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true }
    },
    {timestamps: true});

// Skapa en modell baserat på schema
const Post = mongoose.model<IPost>('Blogpost', postSchema);

export default Post;
