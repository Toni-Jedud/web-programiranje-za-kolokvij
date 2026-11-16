// =====================================================================
// GOTOVI PREDLOŽAK: podaci sa UUID-om (server/data.js ili todos.js)
// =====================================================================
import crypto from "crypto";

export const items = [
    { title: "Prvi",  timestamp: 1764845228329, done: true },
    { title: "Drugi", timestamp: 1764931675258, done: false },
].map(item => ({ id: crypto.randomUUID(), ...item }));   // svakom doda id
