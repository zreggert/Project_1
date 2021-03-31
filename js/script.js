var button = $('#button');
var movie;

// on click of search button Icon
button.on('click', function(event) {
    movie = $('#search').val();
    // alerts you if you put in a blank value
    if (movie == "") {
        alert("Please put in a movie title");
        event.preventDefault();
    } else {
        // Saves the value of the input into local storage with the key of searched-movie
        localStorage.setItem("searched-movie", JSON.stringify(movie));
    }
});

// fires this function on load of page
$(document).ready(function() {
    function wishLists() {
        // creates an array to put the wish list into
        let wishListArr = [];
        
        // pulls saved wishList movies from localStorage
        wishListArr =  JSON.parse(localStorage.getItem("wishList")) || [];

        // loops though whats in local storage and created a unodered list
        for (let i = 0; i < wishListArr.length; i++) {
            // sets wish list array as a variable
            let favMovieTitle = wishListArr[i];
            let liList = $(".ul-wl")
            // addeds li with unique id and data-list
            liList.append(`<li class="li-wl li-list" id="li-wl-${[i]}" data-list="#li-wl-${[i]}">${favMovieTitle}</li>`);
        }
    }
    // invokes local storage function
    wishLists()
});

// this function is in part with the css to make the wish list/search bar expanded and strinks
function expand() {
    let wishText = $('#ul-wl');
    let wishClass = $('#wl-area');
    let searchclass = $('.center');
    let wishlistwidth = $('#wish-list-tab')
    // Checks if wish list is hidden(has hid class)
    if (wishClass.hasClass('hide')) {
        // changes width of wish list tab 
        wishlistwidth.removeClass('wish-list-tab-width-max');
        wishlistwidth.addClass('wish-list-tab-width-min');
        // grows/shrinks wish list area
        wishClass.removeClass('shrink');
        wishClass.addClass('grow');
        wishClass.removeClass('hide');
        wishClass.addClass('show');
        // makes the wish list test appear after .8 seconds
        setTimeout(function(){wishText.addClass('show')}, 800);
        setTimeout(function () { wishText.removeClass('hide') }, 800);
        // removes search bar
        searchclass.removeClass('showFlex');
        searchclass.addClass('hide2')
    } else {
        // changes width of wish list tab 
        wishlistwidth.addClass('wish-list-tab-width-max');
        wishlistwidth.removeClass('wish-list-tab-width-min');
        // grows/shrinks wish list area
        wishClass.removeClass('grow');
        wishClass.addClass('shrink');
        setTimeout(function(){wishClass.addClass('hide')}, 3000);
        wishClass.removeClass('show')
        // makes the wish list test disapear after .8 seconds
        setTimeout(function(){wishText.addClass('hide')}, 800);
        wishText.removeClass('show');
        // shows search bar
        searchclass.removeClass('hide2');
        searchclass.addClass('showFlex');
    }
}
$(".wish-list-tab").on('click', expand);

// loads on page
$(document).ready(function () {
    // wish list click function
    function wishlistclick() {
        // creates an array of li objects
        var moviesLiListArr = $('.li-list').toArray();
        // loops through the array of objects
        moviesLiListArr.forEach(element => {
            // gets a list of the data-*
            var moviesListData = $(element).attr('data-list');
            // gets a list of text content of data-*
            var moviesListContent = $(moviesListData).text();
            // on click of the element with the Data-*
            $(moviesListData).on('click', function () {
                // add that clicked elements stringified text content into local storage
                localStorage.setItem("searched-movie", JSON.stringify(moviesListContent));
                // targets a class of the form to submit and go to the next page with the value in local storage to start pulling its data
                $('.input-group').submit();
            });
        });
    }
    // calls function
    wishlistclick()
});

