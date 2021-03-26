var button = $('#button');
var movie;

function getapis(movie) {
    var input = $('#search').val();
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
            })
        })
        .catch(err => {
            console.error(err);
        });
    getGifyApi();
}

function getGifyApi(movie) {

    var gifyurl = `https://api.giphy.com/v1/gifs/random?api_key=xK1kP8TEjhDs45YiVK94I0DCP8b8N4ds&tag=${movie}&rating=pg`
        
    fetch(gifyurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (gifydata) {
            console.log(gifydata);
        });
}

 function movieInfo(data) {
     var movieId = data.titles[0].id;
     var movieTitle = data.titles[0].title;
     var poster = data.titles[0].image;
     console.log(movieId);
     console.log(movieTitle);
     console.log(poster);
}


function getCast(idData) {
    for ( var i = 0; i < idData.cast.length; i++) {
        var castMembers = idData.cast[i].actor;
        console.log(castMembers);
    }
}

button.on('click', getapis);