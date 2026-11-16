const createMovieLi = (movie) => {
    const li = $(`
        <li>
            <h3>${movie.name}</h3>
            <p>${movie.description}</p>
            <button class="deleteBtn">Delete</button>
        </li>
    `);

    li.find("button").on("click", () => {
        deleteMovie(movie.id);
    });

    return li;
}

const renderMovies = (movies) => {
    const moviesList = $("#moviesList");
    moviesList.empty();

    movies.forEach(movie => {
        moviesList.append(createMovieLi(movie));
    });
}

const fetchMovies = (callb) => {
    $.get("/movies", (res) => {
        callb(res);
    });
}

const saveMovie = (movie, callb) => {
    $.post("/movies", movie, (res) => {
        callb(res);
    });
}

const deleteMovie = (id) => {
    $.ajax({
        method: "DELETE",
        url: `/movies/${id}`,
        success: () => {
            fetchMovies(renderMovies);
        }
    });
}

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

const listenToForm = (event) => {
    event.preventDefault();
    const { name, description } = objectifyForm(event.target);

    saveMovie({ name, description }, (res) => {
        console.log(res.message);
        event.target.reset();
        fetchMovies(renderMovies);
    });
}

$(() => {
    fetchMovies(renderMovies);

    $("#movieForm").on("submit", listenToForm);
});
