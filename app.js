const express = require('express');
const app = express();

const Datastore = require('nedb-promise');

app.use(express.urlencoded());
app.use(express.json());

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
    // console.log(req)
    posts = await db.update(posts, {
        $set: { "title": req.body.title, "hej": req.body.hej }
    });
    res.json(posts);
});

app.listen(3000);