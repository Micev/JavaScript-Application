$("input:button").click(function(){
    var text = $('input:text').val();
    var color = $('#color').val();
    text = "." + text;
    $(text).css('background-color',color);
});
