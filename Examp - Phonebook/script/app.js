(function (){
    var bHeader = $('body header');
    var bFooter = $('body footer');
    $(function(){
        registerEventHandlers();
        var currentUser = userSession.getCurrentUser();
        if(currentUser) {
            showPhonebookHomeView();
        }else{
            showHomeView();
        }
    });

    function registerEventHandlers(){
        $('#btnLogin').click(showLoginForm);
        $('#btnRegister').click(showRegisterForm);
        $('#btnLoginFormLogin').click(loginClicked);
        $('#btnLoginFormRegister').click(showRegisterForm);
        $('#btnRegisterFormLogin').click(showLoginForm);
        $('#btnRegisterFormRegister').click(registerClicked);
        $('#home').click(showPhonebookHomeView);
        $('#phonebook').click(showPhonebookListView);
        $('#addPhone').click(showAddPhonebookForm);
        $('#btnAddPhone').click(addPhoneClicked);
        $('#addPhone2').click(showAddPhonebookForm);
        $('#btnCancelAddPhone').click(showPhonebookListView);
        $('#btnDeletePhone').click(deletePhone);
        $('#btnLogout').click(logoutClicked);
        $('#btnDeletePhoneCancel').click(showPhonebookListView);
        $('#editProfile').click(showEditForm);

    }

    function showHomeView(){
        $('body > *').hide();
        $('body header').show();
        $('body header span').text(" - Welcome");
        $('#welcomeScreen').show();
        $('body footer').show();
    }
    function showLoginForm(){
        $('body > *').hide();
        $('body header').show();
        $('body header span').text(" - Login");
        $('#login-form').show();
        $('body footer').show();
    }
    function showRegisterForm(){
        $('body > *').hide();
        $('body header').show()
        $('body header span').text(" - Registration");
        $('#register-form').show();
        $('body footer').show();
    }

    function loginClicked(){
        var username = $('#login-form #username').val();
        var password = $('#login-form #password').val();
        ajaxRequester.login(username, password, authSuccess, LoginError)
    }
    function authSuccess(data){
        userSession.login(data);
        showPhonebookHomeView();
        showInfoMessage("Login successful.");
    }
    function LoginError(){
        showErrorMessage("Invalid login.");
    }
    function registerClicked(){
        var username = $('#register-form #username').val();
        var password = $('#register-form #password').val();
        var fullname = $('#register-form #fullName').val();
        ajaxRequester.register(username, password, fullname,
            function(data){
                data.username = username;
                data.fullname = fullname;
                RegisterSuccess(data);
            },RegisterError)
    }
    function RegisterSuccess(data){
        authSuccess(data);
    }
    function RegisterError(){
        showErrorMessage("Invalid login.");
    }
    function showPhonebookHomeView(data){
        $('body > *').hide();
        $('body header').show();
        $('body header span').text(" - Home");
        $('#menu').show();
        $('body footer').show();

        var currentUser = userSession.getCurrentUser();
        $('#wrapper').text("Welcome, "+currentUser.fullname+" ("+currentUser.username+")");
        $('#wrapper').append("<p>Please use navigation menu on the left.");
        $('#wrapper').show();

        var username = $('#login-form #username').val("");
        var password = $('#login-form #password').val("");
    }
    function showPhonebookListView(data){
        $('body > *').hide();
        $('body header').show();
        $('#menu').show();
        $('body footer').show();
        $('body header span').text(" - List");
        var currentUser = userSession.getCurrentUser();
        var sessionToken = currentUser.sessionToken;
        ajaxRequester.getPhonebook(sessionToken, loadPhonebookSuccess, loadPhonebookError);
    }
    function loadPhonebookSuccess(data){
        $('#phones').html('');
        var $table = $('#phones');
        $table.append('<tr><th>Name</th><th>Phone</th><th>Action</th></tr>');
        for(var b in data.results) {
            var phone = data.results[b];
            var $phoneTr = $('<tr>');
            $phoneTr.data('phone',phone);

            var person = $('<td id="person">').append(phone.person);
            var number = $('<td id="number">').append(phone.number);

            var $editButton = $('<a href="#" >Edit</a>');
            var $deleteButton = $('<a href="#" >Delete</a>');
            $deleteButton.click(deletePhoneClicked);
            //todo... add edit button functionality
            var action = $('<td>').html($editButton);
            action.append(" ");
            action.append($deleteButton);

            $phoneTr.append(person);
            $phoneTr.append(number);
            $phoneTr.append(action);

            $table.append($phoneTr);
        }
        $('#phoneTable').show();

    }
    function loadPhonebookError(){
        showErrorMessage("Phonebook list load failed.");
    }

    function showAddPhonebookForm(){
        $('body > *').hide();
        $('body header').show();
        $('#menu').show();
        $('#add-phone-form').show();
        $('body footer').show();
        $('body header span').text(" - Add phone");
    }
    function showEditForm(){
        $('body > *').hide();
        $('body header').show();
        $('#menu').show();
        $('#edit-phone-form').show();
        $('body footer').show();
        $('body header span').text(" - Add phone");

        var currentUser = userSession.getCurrentUser();
        var sessionToken = currentUser.sessionToken;

        $("#edit-phone-form #personName").val(currentUser.username);
        $("#edit-phone-form #phoneNumber").val(currentUser.password);

    }
    function logoutClicked(){
        userSession.logout();
        showHomeView();
    }
    function addPhoneClicked(){
        var name = $('#add-phone-form #personName').val();
        var number = $('#add-phone-form #phoneNumber').val();
        var currentUser = userSession.getCurrentUser();
        ajaxRequester.addPhonebook(name,number,currentUser.objectId, showInfoMessage("Phone added successfully."), addPhoneError);
    }
    function addPhoneError(){
        showErrorMessage("Phonebook add failed.");
    }
    function deletePhoneClicked(){
        var nameData = $(this).parent().parent().next('#person').val();
        var phoneData = $(this).parent().parent().next('#person').val();
        $("#delete-phone-form #personName").val(nameData);
        $("#delete-phone-form #phoneNumber").val(phoneData);
        $('body > *').hide();
        $('body header').show();
        $('#menu').show();
        $('#delete-phone-form').show();
        $('body footer').show();
        $('body header span').text(" - Delete phone");
    }

    function deletePhone(){
        var phone = $(this).parent().parent().data('phone');
        var currentUser = userSession.getCurrentUser();
        var sessionToken = currentUser.sessionToken;

        ajaxRequester.deletePhone(sessionToken, phone.objectId, showPhonebookListView, deletePhoneError );
    }
    function deletePhoneError(){
        showErrorMessage("Delete phonebook failed.");
    }
    function showInfoMessage(msg){
        noty({
            text: msg,
            type: 'info',
            layout: 'topCenter',
            timeout: 3000
        });
    }
    function showErrorMessage(msg){
        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 3000
        });
    }
}());