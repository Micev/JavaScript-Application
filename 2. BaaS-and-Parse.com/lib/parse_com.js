$(function () {
    var PARSE_ID = "8jWyfADUUi79fji85jFZROJ4V0tFfpEYfvp9bFiz";
    var PARSE_REST_API = "wMQ34dYHTFADym2m9YqpaIfqLieRCQx5llU29ctJ";

    loadCountry();

    function loadCountry() {
        jQuery.ajax({
            method:"GET",
            headers: {
                "X-Parse-Application-Id": PARSE_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API
            },
            url : "https://api.parse.com/1/classes/Country?order=name",
            success : countryLoaded,
            error: error
        });

    }

    function countryLoaded(data){
        for (var cnt in data.results){
            var country = data.results[cnt];
            var countryItem = $('<li>');
            var countryLink = $('<a href="#">').text(country.name);
            $(countryLink).data('country', country);
            countryLink.appendTo(countryItem);
            $(countryLink).click(countryClicked);
            countryItem.appendTo($('#country'));
        }
    }

    function countryClicked(){
        var country = $(this).data('country');
        $('#town').hide();
        $('#town h2').text(country.name);
        var countryID = country.objectId;
        console.log(countryID);
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API
            },
            url: 'https://api.parse.com/1/classes/Town?order=name&where={"country":{"__type":"Pointer","className":"Country", "objectId":"'+countryID+'"}}',
            success: townLoaded,
            error: error
        });
    }

    function townLoaded(data){
        $("#town ul").html('');
        var i = 0;
        for(var twn in data.results){

            var town = data.results[twn];
            var townItem = $('<li>');
            townItem.text(town.name);
            $('<input type="button" value="delete" id="btnDel'+i+'">').appendTo(townItem);
            $('<input type="button" value="edit" id="btnEdit'+i+'">').appendTo(townItem);
            townItem.appendTo($('#town ul'));
            i++;

        }
        $('#town').show();
    }

    function error(){
        alert('Cannot load country.');
    }
});