$('#wrapper div').append('<p>append text</p>');
$('#wrapper div').prepend('<p>prepend text</p>');
$("#append").click(function(){
    $("<span>Hello World!</span>").appendTo(".div");
});
$("#prepend").click(function(){
    $("<span>Hello World!</span>").prependTo(".div");
});