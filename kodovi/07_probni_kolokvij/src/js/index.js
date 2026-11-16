import $ from "jquery";

// lokalna kopija podataka na klijentu
let todos = [];

// --- pomoćne funkcije ---

// ms od 1.1.1970. -> "12/4/2025"
const format_date = (timestamp) => new Date(timestamp).toLocaleDateString("en-US");

// done -> zelena kvačica, inače crveni X
const status_icon = (done) => done
    ? '<i class="bi bi-check-circle-fill text-success"></i>'
    : '<i class="bi bi-x-circle-fill text-danger"></i>';

// --- zadatak 1: dohvat svih zapisa sa servera ---
const get_todos = (callb) => {
    $.get("/api/todos", (res) => {
        callb(res);
    });
}

// --- jedna kartica: prepisan prototip iz index.html, podaci zamijenjeni s ${...} ---
const create_card = (todo) => {
    const card = $(`
        <div class="col-12 col-sm-6 col-lg-4 todo-card">
            <div class="card rounded-5 shadow h-100">
                <div class="card-body">
                    <h5 class="card-title fs-4">${todo.title}</h5>
                    <p class="mb-1"><strong>When:</strong> ${format_date(todo.timestamp)}</p>
                    <p class="mb-3"><strong>Status:</strong> <span class="status">${status_icon(todo.done)}</span></p>
                    <div class="row g-2">
                        <div class="col-12 col-md-6">
                            <button class="btn btn-light border rounded-pill w-100 btn-toggle">Toggle</button>
                        </div>
                        <div class="col-12 col-md-6">
                            <button class="btn btn-light border rounded-pill w-100 btn-remove">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    // zadatak 3: pozivanje na gumbe
    // card.find traži SAMO unutar ove kartice
    card.find(".btn-toggle").on("click", () => toggle(todo.id, card));
    card.find(".btn-remove").on("click", () => remove(todo.id, card));

    return card;
}

// --- zadatak 3: prikaz svih zapisa ---
const render_todos = (data) => {
    todos = data;
    const container = $("#todos");
    container.empty();

    todos.forEach((todo, i) => {
        const card = create_card(todo);
        container.append(card);

        // fade-in: svaka sljedeća kartica dobije .show 100 ms kasnije
        setTimeout(() => card.addClass("show"), 100 * i);
    });
}

// --- zadatak 3: brisanje (server + klijent) ---
const remove = (id, card) => {
    $.ajax({
        method: "DELETE",
        url: `/api/todos/${id}`,
        success: () => {
            todos = todos.filter(t => t.id !== id);   // klijent: makni iz polja
            card.remove();                             // prikaz: makni karticu
        }
    });
}

// --- zadatak 3: promjena statusa (server + klijent) ---
const toggle = (id, card) => {
    const todo = todos.find(t => t.id === id);

    $.ajax({
        method: "PUT",
        url: `/api/todos/${id}`,
        contentType: "application/json",
        data: JSON.stringify({ done: !todo.done }),
        success: (res) => {
            todo.done = res.todo.done;                              // klijent
            card.find(".status").html(status_icon(todo.done));     // prikaz: nova ikona
        }
    });
}

// kad je stranica spremna: dohvati podatke, a kad stignu, prikaži ih
$(() => {
    get_todos(render_todos);
});
