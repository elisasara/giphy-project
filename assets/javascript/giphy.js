
var gifArray = ["Philadelphia Eagles", "New York Giants", "New England Patriots"]

// var gifArray = ["pug", "golden retriver", "french bulldog", "dachsund", "corgi", "chihuahua", "pit bull", "rottweiler", "pomeranian"];

$(document).ready(function () {

    // using a foor loop, create a button for each item in the array
    function buttons() {
        // empty the div of any existing buttons
        $("#buttons").empty();

        for (var i = 0; i < gifArray.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("gifButton");

            // create an attribute for the button that contains the search term that should be used in the ajax call
            newButton.attr("searchTerm", gifArray[i]);
            newButton.html(gifArray[i]);
            $("#buttons").append(newButton);
        }
    };

    function produceGifs() {
        // empty the div of any content already there
        $("#gifs").empty();

        // store the value of the attribute "SearchTerm" of the button that was clicked
        var search = $(this).attr("searchTerm");

        // store the URL using the appropriate search term
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=2eW5aa5fPjjUh3diJ0RD2Zg5rGIg7Ujv&limit=10";

        // make the ajax call
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;

            // responses return as an array, run through the array and do the following for each item
            for (var i = 0; i < result.length; i++) {
                
                // create new div
                var newDiv = $("<newDiv>");
                // create new image to go into div
                var image = $("<img>");
                // create new paragraph for rating to go into
                var p = $("<p>");

                // get url for still image
                var gifImage = result[i].images.fixed_height_still.url;
                // get url for gif
                var gifPlay = result[i].images.fixed_height.url;
                // get gif rating
                var rating = result[i].rating;

                image.addClass("gif");
                // set src for image to still image
                image.attr("src", gifImage);
                // create attribute "pause" and give value of image
                image.attr("pause", gifImage);
                // create attribute of "play" and give value of gif
                image.attr("play", gifPlay);
                // create attribute of "gifState" and give value of still
                image.attr("gifState", "still");

                // set the text of the paragraph to the rating
                p.text("Rating: " + rating);

                // append image to newDiv
                newDiv.append(image);
                // append the rating to the newDiv
                newDiv.append(p);
                // append newDiv to appropriate row
                $("#gifs").append(newDiv);
            };

        });

    };

    function animateGifs() {
        // if gifState equals still then change the src to value of play
        if ($(this).attr("gifState") === "still") {
            $(this).attr("src", $(this).attr("play"));
            $(this).attr("gifState", "animated");
        }
        // if gifState equals animated then change the src to value of pause
        else {
            $(this).attr("src", $(this).attr("pause"));
            $(this).attr("gifState", "still");
        }
    };


    // run the buttons function on load
    buttons();

    // on click of the button run produceGifs function
    $(document).on("click", ".gifButton", produceGifs);

    // on click of the gif run the animateGifs function
    $(document).on("click", ".gif", animateGifs);

    // when the submit button is clicked, push the term to the array and run the buttons function
    $("#searchButton").on("click", function () {
        event.preventDefault();

        // store the value of the input field
        var userSearch = $("#userSearch").val().trim();

        // push the value into the array
        gifArray.push(userSearch);

        // run the buttons function to produce the button
        buttons ();
    });

});





// if a user enters a term into the search bar then add that term in to the array and create a button for it that runs the same way as the buttons described above