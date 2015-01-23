var ajaxRequester = (function(){
    var baseURL = 'https://api.parse.com/1/';

    var header =
    {
        "X-Parse-Application-Id":"4dFPJt9s1kkY1GutTigTMZEGmGM06kR1r63Ml6cn",
        "X-Parse-REST-API-Key":"D533PDylGTrETrO6ZesbuFYgyVROnZ9GHMLgMFth"
    };

    function Login(username, password, success, error){
        jQuery.ajax({
            method: 'GET',
            url: baseURL + 'login',
            data:{username:username, password:password},
            headers: header,
            success: success,
            error: error
        });
    }
    function Register(username, password, fullname, success, error){
        jQuery.ajax({
            method: 'POST',
            url: baseURL + 'users',
            data:JSON.stringify({username:username, password:password, fullname: fullname}),
            headers: header,
            success: success,
            error: error
        });
    }
    function getHeadersWithSessionToken(sessionToken){
        var headerWithToken = JSON.parse(JSON.stringify(header));
        headerWithToken['X-Parse-Session-Token'] = sessionToken;
        return headerWithToken;
    }
    function getPhonebook(sessionToken, success, error){
        var headerWithToken = getHeadersWithSessionToken(sessionToken);
        jQuery.ajax({
            method: 'GET',
            url: baseURL + 'classes/phone',
            headers: headerWithToken,
            success: success,
            error: error
        });
    }
    function addPhonebook(person, number, userId, success, error){
        var phonebook = {person:person, number:number, ACL : {}};
        phonebook.ACL[userId] = {"write":true,"read":true};
        jQuery.ajax({
            method: 'POST',
            url: baseURL + 'classes/phone',
            data:JSON.stringify(phonebook),
            headers: header,
            success: success,
            error: error
        });
    }
    function deletePhone(sessionToken, phoneId, success, error){
        var headerWithToken = getHeadersWithSessionToken(sessionToken);
        jQuery.ajax({
            method: 'DELETE',
            url: baseURL + 'classes/phone/' + phoneId,
            headers: headerWithToken,
            success: success,
            error: error
        });
    }
    return{
        login: Login,
        register: Register,
        getPhonebook: getPhonebook,
        addPhonebook : addPhonebook,
        deletePhone : deletePhone
    };
}());