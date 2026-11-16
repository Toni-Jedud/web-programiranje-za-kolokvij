const renderBio = (bio) => {
    /*
    const firstName = bio.firstName;
    const lastName = bio.lastName;
    const about = bio.about;
    const img = bio.img;
    */
    const { firstName, lastName, about, img } = bio;

    $("#firstName").text(firstName);
    $("#lastName").text(lastName);
    $("#about").text(about);

    $(".profile").first().css({
    background: `url('../assets/imgs/${img}')`,
    "background-position": "center",
    "background-size": "cover" 
    });
}

const fetchBio = (callb) => {
    $.get("/bio", (res) => {
        callb(res);
    });
}

$(() => {
    fetchBio(renderBio);
});