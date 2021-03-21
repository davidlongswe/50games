$("#showAll").click();

$(document).ready(function () {
    $("#showAll").on("click", function () {
        getGames(true);
    });
    $("#onlyPublished").on("click", function () {
        getGames(false);
    });

    $("#showAll").click();
});

function getGames(all) {
    $.ajax({
        url: "https://bgg-json.azurewebsites.net/hot",
        dataType: "jsonp",
        data: { limit: 50 },
        success: function (response) {
            var items = [],
                i = 0,
                numberOfGames = 0;
            if (all) {
                $.each(response, function () {
                    items.push(`<article><h2>${response[i].rank}</h2><h2>${response[i].name}</h2><p>Publicerat: ${response[i].yearPublished} </p><img src=${response[i].thumbnail}></article>`);
                    i++;
                    numberOfGames++;
                });
            } else {
                items = [], i = 0, numberOfGames = 0, rank = 1;
                $.each(response, function () {
                    if (response[i].yearPublished <= 2020) {
                        items.push(`<article><h2>${rank}</h2><h2>${response[i].name}</h2><p>Publicerat: ${response[i].yearPublished} </p><img src=${response[i].thumbnail}></article>`);
                        numberOfGames++;
                        rank++;
                    }
                    i++;
                });
            }
            $("#games").html(items.join(""));
            $("#noOfGames").html(numberOfGames);
        }
    });
};