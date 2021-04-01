var movie;

$(document).ready(function(){
    getapis(movie);
    // api call to access movie id from imbd
    function getapis(movie) {
        var input = JSON.parse(localStorage.getItem("searched-movie"));
        // if you go to the page and your input is blank it will send back to the index
        if (input == "" || input == null ) {
            window.history.back();
        }
        movie = encodeURIComponent(input);
        var url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${movie}`

       // call to get the poster, title, and movie id
        fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d783afd0e7mshf20b2a536ca3e88p1e16fcjsnd4befaf76dd4",
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            var id = data.titles[0].id
             // invoke function to get movie title and poster based off movie id pulled from imbd
            movieInfo(data);

            var url2 = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`
            // Second API Call to IMDB
            fetch(url2, {
	        "method": "GET",
                "headers": {
                    "x-rapidapi-key": "d783afd0e7mshf20b2a536ca3e88p1e16fcjsnd4befaf76dd4",
                    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (idData) {
                // using data object to pull the cast and characters they portray
                getCast(idData);
                // using data object to pull movie specs such as trailer link, year, and rating info
                getMovieSpecs(idData);
            })
        })
        .catch(err => {
            // catches error if promise is unfulfilled
            console.error(err);
        });
        getGifyApi(movie);
    }

// api call to get a gif related to the movie being searched
    function getGifyApi(movie) {

    var gifyurl = `https://api.giphy.com/v1/gifs/random?api_key=xK1kP8TEjhDs45YiVK94I0DCP8b8N4ds&tag=${movie}&rating=pg`
        
    fetch(gifyurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (gifydata) {
            // invoking function to get random gif related to searched movie
            getGif(gifydata);
        });
    }

    // api call to access giphy database
    function getGif(gifydata) {
        var gif = gifydata.data.fixed_height_downsampled_url
        $('#gify-embeded-url').attr("src", gif);
    }

    // function to populate title and poster of movie based on movie id
    function movieInfo(data) {
        var movieTitle = data.titles[0].title;
        var poster = data.titles[0].image;
        $('.id-arr-title').text(movieTitle);
        $('#id-arr-image').attr('src', poster);
    }

    // populating a list of the first 5 actors/actresses and the charaters they portray in the film
    function getCast(idData) {
        var castMembers= [];
        var characters = [];
        for ( var i = 0; i < 5; i++) {
            castMembers.push(idData.cast[i].actor);
            characters.push(idData.cast[i].character);
            if (i < 4) {
                $("#info-cast").append(`${castMembers[i]} as ${characters[i]} | `);
            } else {
                $("#info-cast").append(`${castMembers[i]} as ${characters[i]} `);
            }
        }  
    }   

    // populates our movie specs info
    function getMovieSpecs(idData) {
        // popluate text for plot container
        var plot = idData.plot;
        $('#info-plot').text(plot);
        // populate movie rating
        var rating = idData.rating;
        $("#info-rating").append(rating);
        // populate number of votes for rating
        var ratingVotes = idData.rating_votes;
        $("#info-rating-votes").append(`(${ratingVotes})`);
        // populate link to imbd to view trailer
        var trailerLink = idData.trailer.link;
        $("#info-trailer-link").prepend(`<a href="${trailerLink}">${trailerLink}</a>`);
        // populate release year
        var year = idData.year;
        $('#info-year').append(year);
    }
})

// creates an array named wishlist
let wishListArr = [];

function wishList () {
    // pulls searched-movie from localstorage and make it var names favMovie
    let favMovie =  JSON.parse(localStorage.getItem("searched-movie"));
    
    // pulls saved wishList movies from localStorage
    wishListArr = JSON.parse(localStorage.getItem("wishList")) || [];
    
    // Alerts user if Wishlist(wishListArr) already has the localstorage value(favMovie) by searching the array with the includes function
    if (wishListArr.includes(favMovie)) {
        document.getElementById('id01').style.display = 'block';
    } else {
        // pushes searched-movie name from local storage into wishList array
        wishListArr.push(favMovie);
        // save into local storage
        localStorage.setItem("wishList", JSON.stringify(wishListArr));
        // Sends you back to pervious page(homepage) 
        window.history.back();
    }
}
$(".wish-list").on('click', wishList); 
