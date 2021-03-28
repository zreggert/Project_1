var movie;

$(document).ready(function(){
    getapis(movie);

    function getapis(movie) {
        var input = JSON.parse(localStorage.getItem("searched-movie"));
        if (input === "") {
            alert("Please a movie title");
    }
        //console.log(input);
        movie = encodeURIComponent(input);
        //console.log(movie);
        var url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${movie}`

        //call to get the poster, title, and movie id
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
            console.log(data);
            //Second API Call to IMDB
            var id = data.titles[0].id
            //console.log(id)
            movieInfo(data);


            var url2 = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`

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
                //console logs Second Call to IMDB
                console.log(idData);
                getCast(idData);
                getMovieSpecs(idData);
            })
        })
        .catch(err => {
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
            console.log(gifydata);
            getGif(gifydata);
        });
    }

    function getGif(gifydata) {
        var gif = gifydata.data.fixed_height_downsampled_url
        console.log(gif);
        $('#gify-embeded-url').attr("src", gif);
    }

    function movieInfo(data) {
        var movieTitle = data.titles[0].title;
        var poster = data.titles[0].image;

        
        console.log(movieTitle);
        console.log(poster);

        $('.id-arr-title').text(movieTitle);
        $('#id-arr-image').attr('src', poster);
    }


    function getCast(idData) {
        var castMembers= [];
        var characters = [];
        for ( var i = 0; i < 5; i++) {
            castMembers.push(idData.cast[i].actor);
            characters.push(idData.cast[i].character);
            console.log(characters);
            if (i < 4) {
                $("#info-cast").append(`${castMembers[i]} as ${characters[i]} | `);
            } else {
                $("#info-cast").append(`${castMembers[i]} as ${characters[i]} `);
            }
            // for (var j = 0; j < 5; j++) {
            //     $("#info-cast").append(`${castMembers[j]} as ${characters[j]} `);
            // }  
        }
        
        console.log(castMembers);   
    }   

    function getMovieSpecs(idData) {
        var plot = idData.plot;
        console.log(plot);
        $('#info-plot').text(plot);
        var rating = idData.rating;
        console.log(rating);
        $("#info-rating").append(rating)
        var ratingVotes = idData.rating_votes;
        console.log(`(${ratingVotes})`);
        $("#info-rating-votes").append(`(${ratingVotes})`);
        var trailerLink = idData.trailer.link;
        console.log(trailerLink);
        $("#info-trailer-link").prepend(`<a href="${trailerLink}">${trailerLink}</a>`)
        var year = idData.year;
        console.log(year);  
        $('#info-year').append(year);
    }
})