// alert("Script Tags Work?");

$(function(){
    // below describes what buttons looks like and where they will go
    populateButtons(searchArray,"searchButton btn btn-outline-secondary my-10 my-sm-10 rounded-pill border-0", "#buttonsArea");
});

// set up array choices
var searchArray = ["Happy","Curious", "Scared", "Emoji", "Confused","Sad", "Guilty","Disgust","Surprised"];

// add buttons into empty area
function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for( var i = 0; i < searchArray.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
};

// use Jquery to grab and store the data-type property value from the button
$(document).on("click", ".searchButton",function(){
    var type = $(this).data("type");
    // console.log(type);
    // make an API call for each button
    // insert you API keys from "https://developers.giphy.com/dashboard/?create=true"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=voNnyyTExK7FTKloLeSv3jG4vp3OwJne&limit=9";


    // After data comes back from the request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);

        $("#gifs-appear-here").empty();

        // console.log(queryURL);
        for (var i = 0; i < response.data.length; i++) {

            // Creating and storing a new div tag for "ratings"
            var searchDiv = $(`<div class="search-item">`)
            var rating = response.data[i].rating;
            // Creating a paragraph tag with the result item's rating
             var p = $("<p>").text("Rating: " + rating);

             // Creating and storing an image tag
             var image = $("<img>");
              // Setting the variable of the animated image to a property pulled off the result item
             var animated = response.data[i].images.fixed_height.url; 
              // Setting the variable of the animated image to a property pulled off the result item
             var still = response.data[i].images.fixed_height_still.url;

             image.attr("src", animated);
             image.attr("data-still", still);
             image.attr("data-animated", animated);
             image.attr("data-state", "animated");
             image.addClass("searchImage");

             // Appending the paragraph and image tag to the searchDiv
             searchDiv.append(p);
             searchDiv.prepend(image);

            // Prependng/append the searchDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(searchDiv);  


        }

    })

});

// add new buttons for a user once they are searching for other gifs
$("#submit").on("click",function(){
    // this will grab what has been entered into search box by user and place in to a new var = newSearch
    var newSearch = $("input").val();
    console.log(newSearch);

    searchArray.push(newSearch);
    populateButtons(searchArray,"searchButton btn btn-outline-secondary my-10 my-sm-10 rounded-pill border-0", "#buttonsArea");
    return false;
})


$(document).on("click", ".searchImage",function(){
// console.log("test");

var dataState = $(this).attr("data-state");
// console.log(dataState);

if(dataState == "still"){
$(this).attr("src", $(this).attr("data-animated"))
$(this).attr( "data-state", "animated")
}else {
    $(this).attr("src", $(this).attr("data-still"))
    $(this).attr( "data-state", "still")
    }
});



