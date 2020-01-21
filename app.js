const express = require('express');
const app = express();

const Datastore = require('nedb-promise');

app.use(express.urlencoded());
app.use(express.json());

PORT

db = new Datastore({ filename: "./posts.db", autoload: true });

app.get("/posts", async (req, res) => {
    const posts = await db.find({});
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const posts = await db.insert(req.body);
    res.json(posts);
});

app.delete("/post/:id", async (req, res) => {
    const posts = await db.remove({ _id: req.params.id });
    res.json(posts);
});

app.patch("/post/:id", async (req, res) => {
    let posts = await db.findOne({ _id: req.params.id });
    console.log(posts);
    posts = await db.update(posts, {
        "title": "Patrick", "hej": "hejdå",
        _id: req.params.id
    });
    res.json(posts);
});

app.listen(3000);