$(function(){
    var json = [{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},
                {"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},
                {"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}];

    var tableHead = "<thead><tr><th>Manufacturer</th><th>Model</th><th>Year</th><th>Price</th><th>Family</th></tr></thead>";

    var tableBody = "";
    json.forEach(function(element){
    tableBody+=
        "<tr>" +
          "<td>" + element.manufacturer + "</td>" +
          "<td>" + element.model + "</td>" +
          "<td>" + element.year + "</td>"+
          "<td>" + element.price + "</td>" +
          "<td>" + element.class+ "</td>" +
        "</tr>"
    });
    var table = tableHead + tableBody;
    $('table').html(table);

});