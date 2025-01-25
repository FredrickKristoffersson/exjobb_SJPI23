import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/post.ts';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("Ansluten till MongoDB!");
    })
    .catch((error) => {
        console.error("Fel vid anslutning till MongoDB:", error);
    });

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static('./frontend'));
app.use('/game', express.static('./game'));

interface BlogPost {
    title: string;
    content: string;
    author: string;
    // createdAt: { type: Date, default: Date.now },
}

app.post('/posts', async (req, res) => {
    const {title, content, author}: BlogPost = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            author
        });

        await newPost.save();

        res.status(201).json({message: 'Blogginlägg skapat!', post: newPost});
    } catch (error) {
        res.status(400).json({message: 'Något gick fel vid skapande av inlägg', error});
    }
});

app.get('/posts', async (_req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch posts'});
    }
});

app.listen(port, () => {
    console.log("Hej nu är servern igång och du kan testa hemsidan");
    console.log(`Server running at http://localhost:${port}`);
});
