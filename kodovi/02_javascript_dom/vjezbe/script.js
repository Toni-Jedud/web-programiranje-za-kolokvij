const getFirstBtn = () => {
    const body = document.body;
    const firstBtn = body.children[1];
    return firstBtn;
}

const firstBtn = getFirstBtn();
const secondBtn = document.getElementsByTagName("button")[1];
const thirdBtn = document.getElementById("id-btn");

const createPandHr = () => {
    const p = document.createElement("p");
    p.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, libero?"

    const hr = document.createElement("hr");
    document.body.appendChild(hr);
    document.body.insertBefore(p, hr);
}

createPandHr();

thirdBtn.remove();

const changeColor = (color) => {
    const title = document.querySelector("h2");
    title.style.color = color;
}

secondBtn.addEventListener("click", () => {
    changeColor("red");
});

const changeBackground = (element, color) => {
    element.style.background = color;
}

document.querySelector("#square").addEventListener("mouseenter", (event) => {
    const element = event.target;
    changeBackground(element, "coral");
});

document.querySelector("#square").addEventListener("mouseleave", (event) => {
    const element = event.target;
    changeBackground(element, "lightgreen");    
});


const createDynamicallyAndUppercase = () => {
    const div = document.createElement("div");
    const input = document.createElement("input");

    input.addEventListener("input", () => {
       div.innerText = input.value.toUpperCase();
    });

    document.body.appendChild(input);
    document.body.appendChild(div);
}

createDynamicallyAndUppercase();

const renderList = () => {
    const movies = ["The Odyssey", "Peaky Blinders", "Spider-Man"];

    const h3 = document.createElement("h3");
    h3.innerText = "Best movies of 2026";

    const ol = document.createElement("ol");

    for (const movie of movies) {
        const li = document.createElement("li");
        li.innerText = movie;
        ol.append(li);
    }

    document.body.appendChild(h3);
    document.body.appendChild(ol);

}

const setClock = () => {
    const clock = document.querySelector("#clock");
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (n) => String(n).padStart(2, "0");
    
    const clockStr = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    clock.innerText = clockStr; 
}

setClock();
setInterval(setClock, 1000);