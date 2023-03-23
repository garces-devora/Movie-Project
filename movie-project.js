"use script";

let refresh = $(`#reload`).toggleClass('hidden');
let newRating = document.getElementById("rating");
let newTitle = document.getElementById("add-movie");
let newGenre = document.getElementById("add-genre");
let submitNewMovie = document.querySelector("#submit-movie")
let filterMovie = document.querySelector("#movies")
getMovies();

// Retrieve movies from db.JSON and display on html
function getMovies() {

    $('#reload').toggleClass('hidden')

    let movies = document.getElementById('movies');
    fetch("https://pollen-pumped-brace.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => {
            console.log("before for loop:" + 'https://pollen-pumped-brace.glitch.me/movies');
            let html='';
            for (i = 0; i < data.length; i++) {
                var moviePoster = "";
                fetch("http://www.omdbapi.com/?apikey=921dbb09&s=$(data[i].title)").then(resp => resp.json()).then(data => {
                    moviePoster = data.Search[0].Poster;
                    console.log(data);
                });
                html += `<span class="moviecontainer" >`
                html += `<h2 class="card-title current-movie"><img value="moviePoster"></img>${data[i].title}</h2>`
                html += `<h4 class="card-text">Genre: <span>${data[i].genre}</span></h4>`
                html += `<h4 class="card-text">Rating: <span class="rating">${data[i].rating}</span></h4>`
                html += `<button name="Edit" type="submit" value="${data[i].id}" class="editBtn " >Edit Details</button>`
                html += `<button type="submit" value="${data[i].id}" class="saveBtn hidden " >Save Changes</button>`
                html += `<button name="Delete" class="deleteBtn " type="submit" value="${data[i].id}"  >Delete Movie</button>`
                html += `</span>`

            }

           $("#movies").html(html);
            console.log(data);

            // Delete button click event
            $('.deleteBtn').click(function(){
                deleteMovie($(this).val())
            })

            //Edit btn click event
            $(".editBtn").click(function () {
                let changeId = ($(this).val());
                let title = $(this).parent().children('h2').first().html()
                let rating = $(this).parent().children().children('.rating').first().html()
                console.log(rating);
                $(this).parent().children('.saveBtn').toggleClass('hidden')
                $(this).toggleClass('hidden')
                $(this).parent().children('h2').first().html(`<input type='text' value='${title}' class="editTitleText">`);
                $(this).parent().children('h4').first().html(changeRating(rating));

                // Save button click event
                $(".saveBtn").click(function (event) {
                    event.preventDefault();
                    let titleText = $('.editTitleText').val();
                    let rateSelected = $(".selectingRate").val();
                    let changeId = $(event.target).val();
                    editButton(changeId, titleText, rateSelected);
                });


                // Edit title
                $(".editTitleText").keyup(function(event){
                    let keyPressed = event.key;
                    if (keyPressed === 'Enter') {
                        let text = $(this).val();
                        let rateSelected = $("#ratingDropDown").val();
                        editButton(changeId, text, rateSelected);
                    }
                });
                // Edit rating
                $(".selectingRate").keyup(function(event){
                    let keyPressed = event.key;
                    if (keyPressed === 'Enter'){
                        let titleText = $(".editTitleText").val();
                        let rateSelected = $("#ratingDropDown").val();
                        editButton(changeId, titleText, rateSelected);
                    }
                });
            })
        })
        // Hides loding image one movie list is displayed
        .then(() => $('#reload').toggleClass('hidden')
        )
};

// Function to add movies

function newMovie(e) {
    event.preventDefault()
    let movieObj = {
        title: newTitle.value,
        genre: newGenre.value,
        rating: newRating.value
    };

    // Fetch request to POST to movie list
    fetch('https://pollen-pumped-brace.glitch.me/movies/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    }).then(() => fetch('https://pollen-pumped-brace.glitch.me/movies/')).then(resp => resp.json()).then(() => getMovies());
    newTitle.value = '';
}

// Delete movie
function deleteMovie(movieId) {
    fetch("https://pollen-pumped-brace.glitch.me/movies/"
        + movieId, {
        method: "DELETE"
    }).then(() => fetch('https://pollen-pumped-brace.glitch.me/movies/')).then(resp => resp.json()).then(() => getMovies());
}

//Edit button in getMovies function

function editButton(movieID, title, rating) {
    let editedButton = {
        title: title,
        rating: rating,
    };

    fetch('https://pollen-pumped-brace.glitch.me/movies/' + movieID,  {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedButton)
    }).then(() => getMovies());
}

submitNewMovie.addEventListener('click', newMovie);

// Changing Movie Rating
function changeRating(rating) {
    let html = ""
    if (rating == 1) {
        html += `<select id="ratingDropDown" class="selectingRate form-select" >
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>`
        return html;
    } else if (rating == 2) {
        html += `<select id="ratingDropDown" class="selectingRate form-select" >
            <option value="1">1</option>
            <option selected value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>`
        return html;
    } else if (rating == 3) {
        html += `<select id="ratingDropDown" class="selectingRate form-select" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option selected value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>`
        return html;
    } else if (rating == 4) {
        html += `<select id="ratingDropDown" class="selectingRate form-select" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option selected value="4">4</option>
            <option value="5">5</option>
        </select>`
        return html;
    } else if (rating == 5) {
        html += `<select id="ratingDropDown" class="selectingRate form-select" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option selected value="5">5</option>
        </select>`
        return html;
    }
};