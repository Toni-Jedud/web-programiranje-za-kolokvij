import express from 'express'
import { todos } from "./todos.js";

const app = express()

app.use(express.static("../client/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
    res.send({ message: "Hello World" });    
});

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World 2" });    
});

// dohvat svih zapisa
app.get("/api/todos", (req, res) => {
    res.send(todos);
});

// uređivanje postojećeg zapisa
app.put("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        res.status(404).send({ message: "Todo not found" });
        return;
    }

    if (req.body.title !== undefined) todo.title = req.body.title;
    if (req.body.done !== undefined) todo.done = req.body.done;

    res.send({ message: "Todo updated", todo });
});

// brisanje postojećeg zapisa
app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        res.status(404).send({ message: "Todo not found" });
        return;
    }

    const [deletedTodo] = todos.splice(index, 1);
    res.send({ message: "Todo deleted", todo: deletedTodo });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
