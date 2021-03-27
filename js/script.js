var button = $('#button');
var movie;



button.on('click', function(event) {
    movie = $('#search').val();
    localStorage.setItem("searched-movie", JSON.stringify(movie));
});