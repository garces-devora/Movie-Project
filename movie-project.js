"use script";

let refresh = $(`#reload`).toggleClass(`hidden`);

getMovies();
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
                html += `<h6 class="card-text">Director: ${data[i].director}</h6>`
                html += `<h6 class="card-text">Genre: ${data[i].genre}</h6>`
                html += `</div>`

            }
            movies.innerHTML = html;
    })
            .then(() => $(`#reload`).toggleClass(`hidden`)
    )
}

