var button = $('#button');
var movie;

button.on('click', function(event) {
    movie = $('#search').val();
    //alerts you if you put in a blank value
    if (movie == "") {
        alert("Please put in a movie title");
        event.preventDefault();
    } else {
        localStorage.setItem("searched-movie", JSON.stringify(movie));
    }
});

$(document).ready(function() {
    function wishLists() {
        let wishListArr = [];

        if (wishListArr.length === 0 || wishListArr === undefined){
        }
        else {
            //pulls saved wishList movies from localStorage
            wishListArr =  JSON.parse(localStorage.getItem("wishList"));

            for (let i = 0; i < wishListArr.length; i++) {
                let favMovieTitle = wishListArr[i];
                console.log(favMovieTitle)
                let liList = $(".ul-wl")
                liList.append(`<li class="li-wl" id="li-wl">${favMovieTitle}</li>`);
            }
        }
    }
    //invokes local storage function
    wishLists()
});

function expand() {
    let wishText = $('#ul-wl');
    let wishClass = $('#wl-area')
    let wisharea = $('#wish-list-area')
    if (wishClass.hasClass('hide')) {
        wishClass.removeClass('shrink')
        wishClass.addClass('grow')
        wishClass.removeClass('hide')
        wishClass.addClass('show')
        setTimeout(function(){wishText.addClass('show')}, 800);
        setTimeout(function(){wishText.removeClass('hide')}, 800);
    } else {
        wishClass.removeClass('grow')
        wishClass.addClass('shrink')
        setTimeout(function(){wishClass.addClass('hide')}, 3000);
        wishClass.removeClass('show')
        setTimeout(function(){wishText.addClass('hide')}, 800);
        wishText.removeClass('show') 
    }
}
$(".wish-list-tab").on('click', expand);