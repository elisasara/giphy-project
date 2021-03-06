
var gifArray = ["Philadelphia Eagles", "New England Patriots", "Pittsburgh Steelers", "Tennessee Titans", "Oakland Raiders", "Green Bay Packers", "Atlanta Falcons", "Seattle Seahawks"];

$(document).ready(function () {

    // using a foor loop, create a button for each item in the array
    function buttons() {
        // empty the divs of any existing buttons
        $(".divison").empty();

        // add headers where needed
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


            // sort the teams into their correct divisions
            if (attrForSort === "new england patriots" || attrForSort === "buffalo bills" || attrForSort === "miami dolphins" || attrForSort === "new york jets") {
                $("#afcEast").append(newButton);
            }
            
            else if(attrForSort === "pittsburgh steelers" || attrForSort === "baltimore ravens" || attrForSort === "cincinnati bengals" || attrForSort === "cleveland browns") {
                $("#afcNorth").append(newButton);
            }

            else if (attrForSort === "jacksonville jaguars" || attrForSort ==="tennessee titans" || attrForSort === "indianapolis colts" || attrForSort === "houston texans") {
                $("#afcSouth").append(newButton);
            }

            else if (attrForSort === "kansas city chiefs" ||attrForSort === "los angeles chargers" || attrForSort === "oakland raiders" || attrForSort === "denver broncos") {
                $("#afcWest").append(newButton);
            }
            
            else if (attrForSort === "philadelphia eagles" || attrForSort === "dallas cowboys" || attrForSort === "washington redskins" || attrForSort === "new york giants") {
                $("#nfcEast").append(newButton);
            }

            else if (attrForSort === "minnesota vikings" || attrForSort === "detroit lions" || attrForSort === "green bay packers" || attrForSort === "chicago bears") {
                $("#nfcNorth").append(newButton);
            }

            else if (attrForSort === "new orleans saints" || attrForSort === "carolina panthers" || attrForSort === "atlanta falcons" || attrForSort === "tampa bay buccaneers") {
                $("#nfcSouth").append(newButton);
            }

            else if (attrForSort === "los angeles rams" || attrForSort === "seattle seahawks" || attrForSort === "arizona cardinals" || attrForSort === "san francisco 49ers") {
                $("#nfcWest").append(newButton);
            }

            // if a team does not fit into any of the conferences show the alert below and remove it from the array
            else {
                alert("That is not a valid team. Please be sure to include the city and full team name!");
                gifArray.pop();
            }
        }
    };

    function produceGifs() {
        // empty the div of any content already there
        $("#gifs").empty();

        // change the background of results div to white
        $("#result").css(
            {"background-color" : "white",
            "border-style" : "dashed",
            "border-color" : "green",
            "border-width" : "4px"
            });

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
        // empty the necessary divs
        $("#teamInfo").empty();
        $("#teamNews").empty();


        var searchTeam = $(this).attr("searchTerm");
        var value = searchTeam.split(" ");
        var forURL = value.join("+");
        var teamURL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + searchTeam;
        var newsURL = "https://newsapi.org/v2/everything?q=" + searchTeam + "&domains=espn.com&language=en&apiKey=2b8a4dbbe3044a0e9bcf5d669b9325a3"

        // make the ajax call for the teamURL
        $.ajax({
            url: teamURL,
            type: "GET",
        }).then(function (response){
            var result2 = response.teams[0];

            var teamLogo = result2.strTeamBadge;
            var teamName = result2.strTeam;
            var location = result2.strStadiumLocation;
            var stadium = result2.strStadium;

            var teamImage = $("<img>");

            // create all the necessary elements and display it onto the page
            teamImage.attr("src", teamLogo);
            teamImage.attr("id", "teamBadge");
            $("#teamInfo").append(teamImage);

            var teamP = $("<p>");
            teamP.addClass("info");
            teamP.html("<h2>" + teamName + "</h2>");
            teamP.append("<p>Location: " + location + "</p>");
            teamP.append("<p>Stadium: " + stadium + "</p>");
            $("#teamInfo").append(teamP);
        });

        // make the ajax call for the newsURL
        $.ajax({
            url: newsURL,
            type: "GET",
        }).then(function (response){
            var result3 = response.articles;
            console.log(result3);

            // display the first four articles only
            for (var i=0; i<4; i++) {
                var headline = result3[i].title
                var articleURL = result3[i].url;
                var snippet = result3[i].description;
                var source = result3[i].source.name;
                var articleDate = result3[i].publishedAt;
                var updatedDate = articleDate.substr(0,10);

                var articleDiv = $("<div>");
                var a = $("<a>");
                var h2 = $("<h2>");
                var h4 = $("<h4>");
                var articleP = $("<p>");
                
                articleDiv.addClass("article");
                a.attr("href", articleURL);
                h2.text(headline);
                a.append(h2);
                articleDiv.append(a);
                h4.text(snippet);
                articleDiv.append(h4);
                articleP.text(updatedDate + " " + source);
                articleDiv.append(articleP);
                $("#teamNews").append(articleDiv);
            }
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