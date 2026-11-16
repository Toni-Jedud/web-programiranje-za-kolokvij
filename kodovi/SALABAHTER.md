# ŠALABAHTER – Web programiranje

## 1. Što je u ovoj mapi

| Mapa | Tema | Najkorisnije datoteke |
|---|---|---|
| `00_GOTOVI_PREDLOSCI/` | **gotov kod za kopiranje (testirano, radi)** | `server_crud.js`, `klijent_crud.js`, `html_dijelovi.html`, `style.scss`, `data.js` |
| `01_html_css/` | predavanje 1 + vježbe 1: HTML, CSS, flexbox, reset | `vjezbe/style.css`, `vjezbe/reset.css` |
| `02_javascript_dom/` | predavanje 2 + vježbe 2: JS osnove, DOM, eventi | `predavanje/script.js`, `vjezbe/script.js` |
| `03_jquery_ajax_express/` | predavanje 3 + vježbe 3: jQuery, AJAX, Express (bez Vitea) | `vjezbe/server/index.js`, `vjezbe/client/assets/js/script-movies.js` |
| `04_bootstrap/` | predavanje 4 + vježbe 4: Bootstrap klase, grid, navbar | `vjezbe/index.html`, `predavanje/index.html` |
| `05_vite_scss/` | predavanje 5 + vježbe 5: Vite, SCSS, Bootstrap preko npm-a | `vjezbe_filmovi/` (**najbliže kolokviju**), `vite_template/` |
| `06_typescript/` | vježbe 6: TypeScript (klase, sučelja) | `class.ts`, `interface.ts` |
| `07_probni_kolokvij/` | **riješeni probni kolokvij** (TODO aplikacija) | `server/index.js`, `src/js/index.js`, `src/index.html` |

---

## 2. TREBAM ... → OTVORI ...

### Server (Express)
| Trebam | Gdje je gotovo |
|---|---|
| GET svih zapisa | `00_GOTOVI_PREDLOSCI/server_crud.js` · `05_vite_scss/vjezbe_filmovi/server/index.js` (`/api/movies`) |
| GET jednog po id-u | `00_GOTOVI_PREDLOSCI/server_crud.js` |
| **POST** (dodavanje) | `00_GOTOVI_PREDLOSCI/server_crud.js` · `05_vite_scss/vjezbe_filmovi/server/index.js` (`app.post`) |
| **PUT** (uređivanje) | `00_GOTOVI_PREDLOSCI/server_crud.js` · `07_probni_kolokvij/server/index.js` |
| **DELETE** (brisanje) | `00_GOTOVI_PREDLOSCI/server_crud.js` · `05_vite_scss/vjezbe_filmovi/server/index.js` · `07_probni_kolokvij/server/index.js` |
| podaci s UUID-om + export | `00_GOTOVI_PREDLOSCI/data.js` · `07_probni_kolokvij/server/todos.js` |
| export/import između datoteka | `05_vite_scss/vjezbe_filmovi/server/data.js` + `index.js` · `03_.../predavanje/server/quadratic.js` |
| `express.static` (server servira HTML) | `03_jquery_ajax_express/vjezbe/server/index.js` |

### Klijent (jQuery + AJAX)
| Trebam | Gdje je gotovo |
|---|---|
| dohvat s callbackom (`fetch…(callb)`) | `05_vite_scss/vjezbe_filmovi/src/js/script-movies.js` (`fetchMovies`) |
| render liste/kartica (`create…` + `render…`) | `script-movies.js` (`createMovieLi`, `renderMovies`) · `07_probni_kolokvij/src/js/index.js` |
| **forma → POST** (`preventDefault`, `objectifyForm`) | `05_vite_scss/vjezbe_filmovi/src/js/script-movies.js` (`listenToForm`, `saveMovie`) · `00_.../klijent_crud.js` |
| DELETE preko `$.ajax` | `script-movies.js` (`deleteMovie`) · `07_.../src/js/index.js` (`remove`) |
| PUT/toggle preko `$.ajax` + JSON | `07_probni_kolokvij/src/js/index.js` (`toggle`) |
| prikaz jednog objekta u postojeće elemente (`.text`, `.css`) | `05_vite_scss/vjezbe_filmovi/src/js/script-index.js` (`renderBio`) |
| datum iz timestampa | `07_.../src/js/index.js` (`format_date`) |
| fade-in / animacija | `07_.../src/js/index.js` + `src/scss/style.scss` · `00_.../klijent_crud.js` |

### Čisti JavaScript / DOM
| Trebam | Gdje |
|---|---|
| `createElement`, `appendChild`, `remove` | `02_javascript_dom/vjezbe/script.js` |
| `addEventListener` (click, mouseenter, input) | `02_javascript_dom/vjezbe/script.js` |
| polja, objekti, klase, callback | `02_javascript_dom/predavanje/script.js` |

### Bootstrap / HTML / CSS
| Trebam | Gdje |
|---|---|
| navbar jednostavni | `00_.../html_dijelovi.html` · `07_probni_kolokvij/src/index.html` |
| navbar s hamburgerom (collapse) | `00_.../html_dijelovi.html` · `05_vite_scss/vjezbe_filmovi/src/movies.html` · `04_bootstrap/vjezbe/index.html` |
| kartica + responzivni grid | `00_.../html_dijelovi.html` · `07_probni_kolokvij/src/index.html` (zakomentirana) |
| Bootstrap forma (`form-control`) | `05_vite_scss/vjezbe_filmovi/src/movies.html` · `00_.../html_dijelovi.html` |
| accordion, sekcije, landing stranica | `05_vite_scss/predavanje/src/index.html` |
| pozicioniranje, badge, progress, grid primjeri | `04_bootstrap/predavanje/index.html` |
| footer uvijek na dnu | `00_.../style.scss` · `05_vite_scss/vjezbe_filmovi/src/scss/style.scss` |
| CSS reset | `01_html_css/vjezbe/reset.css` |

### Vite / SCSS
| Trebam | Gdje |
|---|---|
| promjena Bootstrap boja | `00_.../style.scss` · `05_vite_scss/predavanje/src/scss/style.scss` |
| promjena fonta | `00_.../style.scss` |
| `vite.config.js` s proxyjem i više stranica | `05_vite_scss/vjezbe_filmovi/vite.config.js` |
| `main.js` (uvoz SCSS + Bootstrap JS) | `05_vite_scss/vjezbe_filmovi/src/js/main.js` |
| SCSS ugnježđivanje, `rgba($boja, 0.8)` | `05_vite_scss/predavanje/src/scss/style.scss` |

---

## 3. NAJBITNIJI ISJEČCI (napamet)

### Server
```js
import express from "express";
import crypto from "crypto";
import { items } from "./data.js";      // .js OBAVEZNO; u data.js: export const items = [...]

const app = express();
app.use(express.json());                          // za JSON body
app.use(express.urlencoded({ extended: false })); // za $.post / formu

app.get("/api/items", (req, res) => res.send(items));

app.post("/api/items", (req, res) => {
    const item = { id: crypto.randomUUID(), ...req.body };
    items.push(item);
    res.send({ message: "saved", item });
});

app.put("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) return res.status(404).send({ message: "Not found" });
    item.done = req.body.done;
    res.send({ item });
});

app.delete("/api/items/:id", (req, res) => {
    const index = items.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).send({ message: "Not found" });
    const [deleted] = items.splice(index, 1);
    res.send({ item: deleted });
});

app.listen(3000);
```

### Klijent
```js
import $ from "jquery";

$.get("/api/items", (res) => { ... });                       // GET
$.post("/api/items", { title }, (res) => { ... });           // POST (form-urlencoded)

$.ajax({ method: "PUT", url: `/api/items/${id}`,             // PUT (JSON)
         contentType: "application/json",
         data: JSON.stringify({ done: !item.done }),
         success: (res) => { ... } });

$.ajax({ method: "DELETE", url: `/api/items/${id}`,          // DELETE
         success: () => { ... } });

const card = $(`<div class="col-12">${item.title}</div>`);   // HTML iz stringa
card.find(".btn-remove").on("click", () => remove(item.id, card));
$("#items").empty().append(card);

$("#forma").on("submit", (e) => {
    e.preventDefault();                                      // !!!
    const title = $(e.target).find("[name=title]").val();
});

$(() => { get_items(render_items); });                       // start kad je DOM spreman
```

### jQuery ↔ čisti JS
| jQuery | Čisti JS |
|---|---|
| `$("#x")` | `document.querySelector("#x")` |
| `.text("a")` / `.html("<b>a</b>")` | `.textContent` / `.innerHTML` |
| `.val()` | `.value` |
| `.addClass("k")` / `.removeClass` / `.toggleClass` | `.classList.add/remove/toggle` |
| `.css("color","red")` | `.style.color = "red"` |
| `.on("click", f)` | `.addEventListener("click", f)` |
| `.append(el)` / `.empty()` / `.remove()` | `.appendChild` / `.innerHTML = ""` / `.remove()` |
| `.find(".k")` | `.querySelector(".k")` |
| `.hide()` / `.fadeIn(500)` / `.fadeOut(300)` | — |

### Polja
```js
items.find(i => i.id === id)        // jedan objekt ili undefined
items.findIndex(i => i.id === id)   // pozicija ili -1
items.filter(i => !i.done)          // novo polje
items.map(i => i.title)             // novo polje
items.splice(index, 1)              // briše (mijenja polje)
items.sort((a, b) => a.title.localeCompare(b.title))   // sortiranje po tekstu
items.sort((a, b) => a.timestamp - b.timestamp)        // sortiranje po broju
```

### Datum
```js
new Date(ts).toLocaleDateString("en-US")   // 12/4/2025
new Date(ts).toLocaleDateString("hr-HR")   // 4. 12. 2025.
Date.now()                                 // trenutni ms
```

---

## 4. BOOTSTRAP NA BRZINU

**Breakpointi:** xs (<576) · `sm` ≥576 · `md` ≥768 · `lg` ≥992 · `xl` ≥1200 · `xxl` ≥1400 (vrijedi **od te širine naviše**)

**Grid:** N elemenata u redu → `col-{12/N}` → 1=`12`, 2=`6`, 3=`4`, 4=`3`, 6=`2`
Snimke 1/2/2/3 (xs/sm/md/lg) → `col-12 col-sm-6 col-lg-4`

**Razmaci:** `m`/`p` + `t b s e x y` + `0–5` (0 · 4px · 8px · 16px · 24px · 48px) · `mx-auto` centrira · `g-*` razmak u `row`

**Česte klase:** `container` · `row g-4` · `d-flex justify-content-between align-items-center gap-2` · `flex-column flex-md-row` · `ms-auto` · `w-100 h-100` · `text-center text-md-start` · `fw-bold fs-1..6` · `rounded-5 rounded-pill` · `shadow` · `border` · `d-none d-lg-block`

**Boje:** `primary secondary success info warning danger light dark` → `bg-*`, `text-*`, `btn-*`, `btn-outline-*`, `border-*`

**Ikone:** `<i class="bi bi-IME"></i>` (icons.getbootstrap.com)

**Tamna pozadina → bijeli tekst u navbaru:** `data-bs-theme="dark"`

---

## 5. POKRETANJE I ČESTE GREŠKE

```
terminal 1:  cd server   →  npm install  →  npm run nodemon     (port 3000)
terminal 2:  glavna mapa →  npm install  →  npm run vite        (port 8080 ← OVO otvaraš)
```
Terminal u VS Codeu: strelica pokraj `+` → **Command Prompt** (izbjegava PowerShell blokadu).

| Greška / simptom | Rješenje |
|---|---|
| `running scripts is disabled` | koristi Command Prompt, ili `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `Cannot find native binding` | Node ≥ 22 (`node -v`), obriši `node_modules` + `package-lock.json`, `npm install` |
| `does not provide an export named` | fali `export` ispred `const` |
| `Cannot find module './data'` | fali `.js` u importu |
| 404 na `/api/...` | ruta na serveru nema `/api` ili krivo ime |
| `req.body` je `undefined` | fali `app.use(express.json())` / `urlencoded` |
| klik ništa ne radi | F12 → Network: je li zahtjev otišao? · funkcija nije zakačena na gumb |
| stranica se osvježi na submit | fali `event.preventDefault()` |
| boja se ne mijenja | SCSS varijabla mora biti **iznad** `@import "bootstrap..."` |
| toggle radi samo jednom | šalješ string `"false"` → koristi `contentType` + `JSON.stringify` |
| `$ is not defined` | fali `import $ from "jquery";` na vrhu datoteke |

**Debug redoslijed:** terminal servera → `localhost:8080/api/...` u pregledniku → F12 Console → F12 Network.

---

## 6. PREDAJA
1. Ctrl+C u oba terminala
2. obriši `node_modules` (glavna mapa **i** `server/`) i `dist/`
3. zipaj → `prezime_ime_kolokvij_1.zip`
4. prije toga: F12 Console bez crvenih grešaka, kod koji ne radi **zakomentiraj**
