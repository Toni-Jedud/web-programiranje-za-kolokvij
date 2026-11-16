// slajd 10
let pHidden = false;

const fillListDynamically = () => {
    const colors = ["tomato", "gold", "deepskyblue"];
    const ul = $("<ul></ul>");

    for (const color of colors) {
        const li = $(`
            <li>
                ${ color }
            </li>
        `);
        li.css("color", color);
        ul.append(li);
    }

    $(document.body).prepend(ul);

    setTimeout(() => {
        const color = "black";
        const siblingToBe = $(`
            <li>${ color }</li>
        `);

        ul.children().last().before(siblingToBe);
    }, 1000);
}

$(() => {

    fillListDynamically();
    console.log($);

    $("#myBtn").on("click mouseover", (event) => {

        if (event.type === "mouseover") {
            // $("#myParagraph").get(0).innerText = "Button hovered";
            $("#myParagraph").text("Button hovered");
        } else if (event.type === "click") {
            $("#myParagraph").get(0).innerText = "Button clicked";
        }

        // slajd 10
        if (event.type === "click") {
            // Zad 1
            // $("p").first().attr("hidden", true);
            // Zad 2
            $("p").first().attr("hidden", pHidden = !pHidden);
        }
            
    });

    // slajd 10
    // zad 3
    $("#myInput").on("blur", (event) => {
        alert($(event.target).val());
    });

    // slajd 17
    const pulse = () => {
        $("#square1").animate({ "border-radius": "50%" }, 500);
        setTimeout(() => {
            $("#square1").animate({ "border-radius": "0%" }, 500);
        }, 500);
    } 

    pulse();
    setInterval(pulse, 1000);

});