var gifArray = ["puppies", "kittens", "babies"];
var search = "";
var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&?limit=10&api_key=2eW5aa5fPjjUh3diJ0RD2Zg5rGIg7Ujv";


$(document).ready(function (){
for (var i=0; i<gifArray.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("gifButton");
    newButton.attr("searchTerm", gifArray[i]);
    newButton.html(gifArray[i]);
    $("#buttons").append(newButton);
}
});

$(document).on("click", ".gifButton", function () {
    console.log($(this).attr("searchTerm"));  
    search = $(this).attr("searchTerm");  

    $.ajax({
    url: giphyURL,
    method: "GET",
}).then(function (response){
    console.log(response);
});

})


// create an array of buttons that should be populated on page load
// using a foor loop, create a button for each item in the array
// create an attribute for the button that contains the search term that should be used in the ajax call

// on click of the button run the ajax call to return the results from giphy
// results should be displayed as the still image
// on click of the image the gif should play. when clicked again it should stop

// when a new button is clicked the images already present should be cleared and then the new images show up

// if a user enters a term into the search bar then add that term in to the array and create a button for it that runs the same way as the buttons described above