import express from 'express';
import mongoose, {Schema} from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/post.ts';

// Ladda miljövariabler
dotenv.config();

// Anslut till MongoDB med Mongoose
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("Ansluten till MongoDB!");
    })
    .catch((error) => {
        console.error("Fel vid anslutning till MongoDB:", error);
    });

const app = express();
app.use(express.json()); // För att hantera JSON-data i requests
const port = process.env.PORT || 3000;

app.use(express.static('./frontend'));

// Skapa en typ för blogginlägget
interface BlogPost {
    title: string;
    content: string;
    author: string;
    // createdAt: { type: Date, default: Date.now },
}

// Skapa en modell
// const Post = mongoose.model('BlogPost', BlogPost);

// I din POST-route, definiera req.body som denna typ
app.post('/posts', async (req, res) => {
    const {title, content, author}: BlogPost = req.body;

    try {
        // Skapa ett nytt blogginlägg
        const newPost = new Post({
            title,
            content,
            author
        });

        // Spara post i MongoDB
        await newPost.save();

        res.status(201).json({message: 'Blogginlägg skapat!', post: newPost});
    } catch (error) {
        res.status(400).json({message: 'Något gick fel vid skapande av inlägg', error});
    }
});

// GET: Hämta alla inlägg
app.get('/posts', async (_req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch posts'});
    }
});

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the server!');
// })

app.listen(port, () => {
    console.log("Hej nu är servern igång och du kan testa hemsidan");
    console.log(`Server running at http://localhost:${port}`);
});
