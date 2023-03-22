"use script";

let refresh = $(`#reload`).toggleClass(`hidden`);
let newTitle = document.getElementById("add-movie");
let newRating = document.getElementById("rating");
let submitNewMovie = document.querySelector("#submit-movie")

getMovies();

// Retrieve movies from db.JSON and display on html
function getMovies() {

$(`#reload`).toggleClass(`hidden`)

    let movies = document.getElementById('movieList');

fetch('https://pollen-pumped-brace.glitch.me/movies')
    .then(response => response.json())
    .then(data => {

        console.log('https://pollen-pumped-brace.glitch.me/movies');

        let html="";

            for (let i = 0; i <data.length; i ++) {
            // console.log(data[i].title);
                html += `<div class="">`
                // html += `<div class="col-2">`
                html += `<div class="card-body">`
                html += `<h5 class="card-title">Movie Title: ${data[i].title}</h5>`
                html += `<h6 class="card-text">Rating: ${data[i].rating}</h6>`
                // html += `<h6 class="card-text">Director: ${data[i].director}</h6>`
                // html += `<h6 class="card-text">Genre: ${data[i].genre}</h6>`
                html += `</div>`

            }
            movies.innerHTML = html;
    })
            .then(() => $(`#reload`).toggleClass(`hidden`)
    )
}

// Function to add movies

function newMovie(x) {
    x.preventDefault()
    let movieObj ={
        title: newTitle.value,
        rating: newRating.value
    }

    // Fetch request to POST to movie list
    fetch('https://pollen-pumped-brace.glitch.me/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    }).then(() => fetch('https://pollen-pumped-brace.glitch.me/movies')).then(resp => resp.json()).then(() => getMovies());
    newTitle.value = "";
}

submitNewMovie.addEventListener('click', newMovie)
