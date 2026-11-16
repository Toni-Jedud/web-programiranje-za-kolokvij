import express from 'express'
import crypto from "crypto";

import { bio, movies } from "./data.js";

const app = express()

app.use(express.static("../client/"));
app.use(express.urlencoded({ extended: false }));

app.get("/api/bio", (req, res) => {
    // const myObj = { message: "Hello World", bio, numbers: [1, 2, 3] }
    // res.send(myObj);
    res.send(bio);    
});

app.get("/api/movies", (req, res) => {
  res.send(movies)
})

app.post("/api/movies", (req, res) => {
    const { name, description } = req.body;
    const movie = { id: crypto.randomUUID(), name, description };
    movies.push(movie);
    res.send({ message: "Movie saved", movie });
});

app.delete("/api/movies/:id", (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex(movie => movie.id === id);

    if (index === -1) {
        res.status(404).send({ message: "Movie not found" });
        return;
    }

    const [deletedMovie] = movies.splice(index, 1);
    res.send({ message: "Movie deleted", movie: deletedMovie });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
