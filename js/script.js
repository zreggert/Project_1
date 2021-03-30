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
        
        //pulls saved wishList movies from localStorage
        wishListArr =  JSON.parse(localStorage.getItem("wishList")) || [];

        for (let i = 0; i < wishListArr.length; i++) {
            let favMovieTitle = wishListArr[i];
            console.log(favMovieTitle)
            let liList = $(".ul-wl")
            liList.append(`<li class="li-wl li-list" id="li-wl-${[i]}" data-list="#li-wl-${[i]}">${favMovieTitle}</li>`);
        }
    }
    //invokes local storage function
    wishLists()
});

function expand() {
    let wishText = $('#ul-wl');
    let wishClass = $('#wl-area');
    let searchclass = $('.center');
    let wishlistwidth = $('#wish-list-tab')
    if (wishClass.hasClass('hide')) {
        wishlistwidth.removeClass('wish-list-tab-width-max');
        wishlistwidth.addClass('wish-list-tab-width-min');
        wishClass.removeClass('shrink');
        wishClass.addClass('grow');
        wishClass.removeClass('hide');
        wishClass.addClass('show');
        setTimeout(function(){wishText.addClass('show')}, 800);
        setTimeout(function () { wishText.removeClass('hide') }, 800);
        searchclass.removeClass('showFlex');
        searchclass.addClass('hide2')
    } else {
        wishlistwidth.addClass('wish-list-tab-width-max');
        wishlistwidth.removeClass('wish-list-tab-width-min');
        wishClass.removeClass('grow');
        wishClass.addClass('shrink');
        setTimeout(function(){wishClass.addClass('hide')}, 3000);
        wishClass.removeClass('show')
        setTimeout(function(){wishText.addClass('hide')}, 800);
        wishText.removeClass('show');
        searchclass.removeClass('hide2');
        searchclass.addClass('showFlex');
    }
}
$(".wish-list-tab").on('click', expand);

$(document).ready(function () {
    function wishlistclick() {
        var moviesLiListArr = $('.li-list').toArray();
        moviesLiListArr.forEach(element => {
            var moviesListData = $(element).attr('data-list');
            console.log(moviesListData);
            var moviesListContent = $(moviesListData).text();
            console.log(moviesListContent);
            $(moviesListData).on('click', function () {
                localStorage.setItem("searched-movie", JSON.stringify(moviesListContent));
                $('.input-group').submit();
            });
        });
    }
    wishlistclick()
});

