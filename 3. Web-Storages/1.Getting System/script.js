$(document).ready(function(){
    (function(){
        function login() {
            var name = $('#name').val();
            localStorage.setItem('name', name);
        }

        if(!localStorage['counter']){
            localStorage.setItem('counter', 0);
        }
        if(!sessionStorage['counter']){
            sessionStorage.setItem('counter', 0);
        }

        var localCount = parseInt(localStorage.getItem('counter'));
        localCount += 1;
        localStorage.setItem('counter', localCount);
        var sessionCount = parseInt(sessionStorage.getItem('counter'));
        sessionCount += 1;
        sessionStorage.setItem('counter', sessionCount);

        $('#wrapper').append($('<div>').text('All Visit: '+ localStorage.getItem('counter')));
        $('#wrapper').append($('<div>').text('Session Visit: '+ sessionStorage.getItem('counter')));

        if(localStorage.getItem('name')){
            $('form').hide();
            $('#wrapper').prepend('Hello ' + localStorage.getItem('name'));
        }
        else{
            $('input:submit').on('click',login);
        }
    }());
});