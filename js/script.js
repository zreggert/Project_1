var button = $('#button');

function getapis() {
    var input = $('#search').val();
    if (input === "") {
        alert("put in shit");
    }
    console.log(input);
    var movie = encodeURIComponent(input);
    console.log(movie);
    var url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${movie}`

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
            console.log(id)

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
            })
        })
        .catch(err => {
            console.error(err);
        });
    
    var gifyurl = `https://api.giphy.com/v1/gifs/random?api_key=xK1kP8TEjhDs45YiVK94I0DCP8b8N4ds&tag=${movie}&rating=pg`
        
    fetch(gifyurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (gifydata) {
            console.log(gifydata);
        });
}
button.on('click', getapis);