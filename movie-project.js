"use script";

let refresh = $(`#reload`).toggleClass('hidden');
let newRating = document.getElementById("rating");
let newTitle = document.getElementById("add-movie");
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
                // console.log(data[i].title);
                html += `<div class="container">`
                html += `<h3 class="card-title current-movie">Movie Title: ${data[i].title}</h3>`
                html += `<h5 class="card-text">Rating: ${data[i].rating}</h5>`
                html += `<button name="Edit" type="submit" value="${data[i].id}" class="editBtn" >Edit Details</button>`
                html += `<button type="submit" value="${data[i].id}" class="saveBtn hidden" >Save Changes</button>`
                html += `<button name="Delete" class="deleteBtn" type="submit" value="${data[i].id}"  >Delete Movie</button>`
                html += `</div>`

            }
            movies.innerHTML = html;

            // Delete button click event
            $('.deleteBtn').click(function(){
                deleteMovie($(this).val())
            })

            //Edit btn click event
            $(".editBtn").click(function () {
                let changeId = ($(this).val());
                let title = $(this).parent().children('h3').first().html()
                let rating = $(this).parent().children('5').first().html()
                $(this).parent().children('.saveBtn').toggleClass('hidden')
                $(this).toggleClass('hidden')
                $(this).parent().children('h3').first().html(`<input type='text' value='${title}' class="editTitleText">`);
                $(this).parent().children('h5').first().html(changeRating(rating));

                // Save button click event
                $(".saveBtn").click(function () {
                    let titleText = $('.editTitleText').val();
                    let rateSelected = $("#ratingDropDown").val();
                    let changeId = $('.delete-movie-id').val();
                    editButton(changeId, titleText, rateSelected);
                });


                // Edit title
                $(".editTitleText").keyup(function(event){
                    let keyPressed = event.key;
                    if (keyPressed === 'Enter') {
                        let text = $(this).val();
                        let rateSelected = $("#ratingDropDown").val();
                        // console.log(selectedRating) *Add to end of save changed button
                        editButton(changeId, text, rateSelected);
                        // will come from save changes button
                    }
                });
                // Edit rating
                $(".selectingRate").keyup(function(event){
                    let keyPressed = event.key;
                    if (keyPressed === 'Enter'){
                        let titleText = $(".editTitleText").val();
                        let rateSelected = $("#ratingDropDown").val();
                        // console.log(selectedRating) *Add to end of save changed button
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
    }).then(() => fetch('https://pollen-pumped-brace.glitch.me/movies')).then(resp => resp.json()).then(() => getMovies());
    // // newTitle.value = "";
    //     .then(() => getMovies())
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
            <option value="2">2option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option selected value="5">5</option>
        </select>`
        return html;
    }
};