
var gifArray = ["Philadelphia Eagles", "New York Giants", "New England Patriots"]

$(document).ready(function () {

    // using a foor loop, create a button for each item in the array
    function buttons() {
        // empty the div of any existing buttons
        // $("#buttons").empty();
        $("#afcEast").empty();
        $("#afcNorth").empty();
        $("#afcSouth").empty();
        $("#afcWest").empty();
        $("#nfcEast").empty();
        $("#nfcNorth").empty();
        $("#nfcSouth").empty();
        $("#nfcWest").empty();

        $("#afcEast").html("<h3>AFC East</h3>");
        $("#afcNorth").html("<h3>AFC North</h3>");
        $("#afcSouth").html("<h3>AFC South</h3>");
        $("#afcWest").html("<h3>AFC West</h3>");
        $("#nfcEast").html("<h3>NFC East</h3>");
        $("#nfcNorth").html("<h3>NFC North</h3>");
        $("#nfcSouth").html("<h3>NFC South</h3>");
        $("#nfcWest").html("<h3>NFC West</h3>");

        for (var i = 0; i < gifArray.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("gifButton");

            // create an attribute for the button that contains the search term that should be used in the ajax call
            newButton.attr("searchTerm", gifArray[i]);
            var buttonAttr = newButton.attr("searchTerm");
            attrForSort = buttonAttr.toLowerCase();
            newButton.html(gifArray[i]);

            if (attrForSort === "new england patriots" || attrForSort === "buffalo bills" || gifArray[i] == "Miami Dolphins" || gifArray[i] == "New York Jets") {
                $("#afcEast").append(newButton);
            }
            
            else if(gifArray[i] == "Pittsburgh Steelers" || gifArray[i] == "Baltimore Ravens" || gifArray[i] == "Cincinnati Bengals" || gifArray[i] == "Cleveland Browns") {
                $("#afcNorth").append(newButton);
            }

            else if (gifArray[i] == "Jacksonville Jaguars" || gifArray[i] == "Tennessee Titans" || gifArray[i] == "Indianapolis Colts" || gifArray[i] == "Houston Texans") {
                $("#afcSouth").append(newButton);
            }

            else if (gifArray[i] == "Kansas City Chiefs" || gifArray[i] == "Los Angeles Chargers" || gifArray[i] == "Oakland Raiders" || gifArray[i] == "Denver Broncos") {
                $("#afcWest").append(newButton);
            }
            
            else if (gifArray[i] == "Philadelphia Eagles" || gifArray[i] == "Dallas Cowboys" || gifArray[i] == "Washington Redskins" || gifArray[i] == "New York Giants") {
                $("#nfcEast").append(newButton);
            }

            else if (gifArray[i] == "Minnesota Vikings" || gifArray[i] == "Detroit Lions" || gifArray[i] == "Green Bay Packers" || gifArray[i] == "Chicago Bears") {
                $("#nfcNorth").append(newButton);
            }

            else if (gifArray[i] == "New Orleans Saints" || gifArray[i] == "Carolina Panthers" || gifArray[i] == "Atlanta Falcons" || gifArray[i] == "Tampa Bay Buccaneers") {
                $("#nfcSouth").append(newButton);
            }

            else if (gifArray[i] == "Los Angeles Rams" || gifArray[i] == "Seattle Seahawks" || gifArray[i] == "Arizona Cardinals" || gifArray[i] == "San Francisco 49ers") {
                $("#nfcWest").append(newButton);
            }

            else {
                alert("That is not a valid team. Please be sure to include the city and full team name!");
            }
        }
    };

    function produceGifs() {
        // empty the div of any content already there
        $("#gifs").empty();

        // store the value of the attribute "SearchTerm" of the button that was clicked
        var searchGif = $(this).attr("searchTerm");

        // store the URL using the appropriate search term
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGif + "&api_key=2eW5aa5fPjjUh3diJ0RD2Zg5rGIg7Ujv&limit=10";

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
                var gifImage = result[i].images.fixed_width_still.url;
                // get url for gif
                var gifPlay = result[i].images.fixed_width.url;
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

    function teamInfo () {

        $("#teamInfo").empty();
        $("#teamNews").empty();


        var searchTeam = $(this).attr("searchTerm");
        var value = searchTeam.split(" ");
        var forURL = value.join("+");
        var teamURL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + searchTeam;
        var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTeam + "&?begin_date=20180101&?sort=newest&?page=0&api-key=e12fa294cce8469783662298ec2579fd";

        $.ajax({
            url: teamURL,
            type: "GET",
        }).then(function (response){
            var result2 = response.teams[0];

            var teamLogo = result2.strTeamBadge;
            var teamName = result2.strTeam;
            var coach = result2.strManager;
            var location = result2.strStadiumLocation;
            var stadium = result2.strStadium;

            var teamImage = $("<img>");
            teamImage.attr("src", teamLogo);
            teamImage.attr("id", "teamBadge");
            $("#teamInfo").append(teamImage);

            var teamP = $("<p>");
            teamP.addClass("info");
            teamP.html("<h2>" + teamName + "</h2>");
            teamP.append("<p>Coach: " + coach + "</p>");
            teamP.append("<p>Location: " + location + "</p>");
            teamP.append("<p>Stadium: " + stadium + "</p>");
            $("#teamInfo").append(teamP);
        });

        $.ajax({
            url: nytURL,
            type: "GET",
        }).then(function (response){

            var result3 = response.response.docs;
            console.log(result3);

            for (var i=0; i<4; i++) {


            var headline = result3[i].headline.main;
            console.log(headline);
            var articleURL = result3[i].web_url;
            console.log(articleURL);
            var snippet = result3[i].snippet;
            console.log(snippet);
            var articleDate = result3[i].pub_date;
            var updatedDate = articleDate.substr(0,10);

                var articleDiv = $("<div>");
                var a = $("<a>");
                var h2 = $("<h2>");
                var h3 = $("<h3>");
                var articleP = $("<p>");
                
                articleDiv.addClass("article");
                a.attr("href", articleURL);
                h2.text(headline);
                a.append(h2);
                articleDiv.append(a);
                h3.text(snippet);
                articleDiv.append(h3);
                articleP.text(updatedDate);
                articleDiv.append(articleP);
                $("#teamNews").append(articleDiv);
            };
        })
    };


    function animateGifs () {
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

    // on click of the button run teamInfo function

    $(document).on("click", ".gifButton", teamInfo);

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