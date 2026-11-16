// =====================================================================
// GOTOVI PREDLOŽAK: Express server sa svim CRUD rutama
// Kopiraj u server/index.js i zamijeni "items" svojim imenom (todos, movies...)
// =====================================================================
import express from "express";
import crypto from "crypto";
import { items } from "./data.js";   // u data.js:  export const items = [ ... ];

const app = express();

app.use(express.static("../client/"));
app.use(express.json());                          // za JSON body (contentType: application/json)
app.use(express.urlencoded({ extended: false })); // za $.post / form body

// ---------- GET: svi zapisi ----------
app.get("/api/items", (req, res) => {
    res.send(items);
});

// ---------- GET: jedan zapis po id-u ----------
app.get("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        res.status(404).send({ message: "Not found" });
        return;
    }
    res.send(item);
});

// ---------- POST: novi zapis ----------
app.post("/api/items", (req, res) => {
    const { title } = req.body;                   // polja koja klijent šalje
    const item = {
        id: crypto.randomUUID(),
        title,
        timestamp: Date.now(),
        done: false
    };
    items.push(item);
    res.send({ message: "Item saved", item });
});

// ---------- PUT: uređivanje postojećeg ----------
app.put("/api/items/:id", (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === id);

    if (!item) {
        res.status(404).send({ message: "Not found" });
        return;                                   // OBAVEZNO return
    }

    if (req.body.title !== undefined) item.title = req.body.title;
    // done može stići kao boolean (JSON) ili string "true"/"false" ($.post / form)
    if (req.body.done !== undefined) item.done = req.body.done === true || req.body.done === "true";

    res.send({ message: "Item updated", item });
});

// ---------- DELETE: brisanje ----------
app.delete("/api/items/:id", (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    const [deleted] = items.splice(index, 1);
    res.send({ message: "Item deleted", item: deleted });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
