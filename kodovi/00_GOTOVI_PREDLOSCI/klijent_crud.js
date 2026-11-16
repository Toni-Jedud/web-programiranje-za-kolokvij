// =====================================================================
// GOTOVI PREDLOŽAK: klijent (src/js/index.js) - dohvat, prikaz,
// dodavanje (forma), uređivanje (toggle), brisanje, fade-in
// Zamijeni "items"/"item" svojim imenom i prilagodi HTML kartice.
// =====================================================================
import $ from "jquery";

let items = [];   // lokalna kopija na klijentu

// ---------- pomoćne ----------
const format_date = (ts) => new Date(ts).toLocaleDateString("en-US"); // "12/4/2025"  ("hr-HR" -> "4. 12. 2025.")

const status_icon = (done) => done
    ? '<i class="bi bi-check-circle-fill text-success"></i>'
    : '<i class="bi bi-x-circle-fill text-danger"></i>';

// ---------- GET ----------
const get_items = (callb) => {
    $.get("/api/items", (res) => callb(res));
};

// ---------- jedna kartica (prepiši svoj prototip iz HTML-a, podatke u ${...}) ----------
const create_card = (item) => {
    const card = $(`
        <div class="col-12 col-sm-6 col-lg-4 fade-card">
            <div class="card rounded-5 shadow h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="mb-1"><strong>When:</strong> ${format_date(item.timestamp)}</p>
                    <p class="mb-3"><strong>Status:</strong> <span class="status">${status_icon(item.done)}</span></p>
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

    // card.find -> samo gumbi OVE kartice
    card.find(".btn-toggle").on("click", () => toggle(item.id, card));
    card.find(".btn-remove").on("click", () => remove(item.id, card));

    return card;
};

// ---------- prikaz svih ----------
const render_items = (data) => {
    items = data;
    const container = $("#items");
    container.empty();

    items.forEach((item, i) => {
        const card = create_card(item);
        container.append(card);
        setTimeout(() => card.addClass("show"), 100 * i);   // fade-in jedna za drugom (CSS u style.scss)
        // ALTERNATIVA bez CSS-a:  card.hide(); container.append(card); card.delay(100 * i).fadeIn(500);
    });
};

// ---------- POST: dodavanje iz forme ----------
const save_item = (item, callb) => {
    $.ajax({
        method: "POST",
        url: "/api/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: (res) => callb(res)
    });
    // ili kraće (šalje form-urlencoded, treba express.urlencoded):
    // $.post("/api/items", item, (res) => callb(res));
};

const listen_to_form = (event) => {
    event.preventDefault();                       // bez ovoga se stranica osvježi!
    const title = $(event.target).find("[name=title]").val();

    save_item({ title }, (res) => {
        items.push(res.item);                     // klijent
        const card = create_card(res.item);       // prikaz
        $("#items").append(card);
        setTimeout(() => card.addClass("show"), 10);
        event.target.reset();                     // isprazni formu
    });
};

// ---------- PUT: promjena (toggle) ----------
const toggle = (id, card) => {
    const item = items.find(i => i.id === id);

    $.ajax({
        method: "PUT",
        url: `/api/items/${id}`,
        contentType: "application/json",          // JSON -> done ostaje boolean
        data: JSON.stringify({ done: !item.done }),
        success: (res) => {
            item.done = res.item.done;                              // klijent
            card.find(".status").html(status_icon(item.done));     // prikaz
        }
    });
};

// ---------- DELETE ----------
const remove = (id, card) => {
    $.ajax({
        method: "DELETE",
        url: `/api/items/${id}`,
        success: () => {
            items = items.filter(i => i.id !== id);   // klijent
            card.remove();                             // prikaz  (ili: card.fadeOut(300, () => card.remove()))
        }
    });
};

// ---------- start ----------
$(() => {
    get_items(render_items);
    $("#itemForm").on("submit", listen_to_form);
});
