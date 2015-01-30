$(function () {
    var PARSE = {
        APP_ID : "j5UK3OtqhobYzVyhdkVDkm9UmBbYpBibIseiccyV",
        REST_API : "kVVX3oyfIr0266xzFtiLBBs31UWW3CSE1zoAtvDX",
        API_URL: 'https://api.parse.com/1/classes/Book'
    }


    var PARSE_APP_ID = "j5UK3OtqhobYzVyhdkVDkm9UmBbYpBibIseiccyV";
    var PARSE_REST_API = "kVVX3oyfIr0266xzFtiLBBs31UWW3CSE1zoAtvDX";

    loadBook();

    function loadBook() {
        jQuery.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API
            },
            url: "https://api.parse.com/1/classes/Book?order=name",
            success: bookLoaded,
            error: errorLoadBooks
        });
    }

    function bookLoaded(data) {
        $('#content').html('');
        for (var e in data.results) {
            var book = data.results[e];
            var bookItem = $('<div class="book_section">');
            var bookTitle = $('<p>').text("Title: " + book.title);
            var bookAuthor = $('<p>').text("Author: " + book.author);
            var booISBN = $('<p>').text(book.isbn ? "ISBN: " + book.isbn : "");
            $(bookItem).data('book', book);

            bookItem.append(bookTitle);
            bookItem.append(bookAuthor);
            bookItem.append(booISBN);
            $('#content').append(bookItem);
            // TODO: if not needed anymore - delete this commented code
            //countryLink.appendTo(countryItem);
            //$(countryLink).click(countryClicked);
            //countryItem.appendTo($('#country'));
        }
    }

    function addBook() {
        var title = $('input#title').val();
        var author = $('input#author').val();
        var isbn = $('input#isbn').val();

        var data = {
            'title': title,
            'author': author,
            'isbn': isbn
        };
        if (data.title == '' || data.author == '') {
            errorAddBook('Author and Title are required');
            return;
        }
        jQuery.ajax({
            method: "POST",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API
            },
            contentType: 'application/json',
            data: JSON.stringify(data),
            url: "https://api.parse.com/1/classes/Book",
            success: successAddBook,
            error: errorAddBook
        });
    }

    $("#add_book").click(function () {
        $('#add_form').show();
    });

    $("input:button").click(function () {
        addBook();
    });

    function successAddBook() {
        alert('Book added correctly.');
        loadBook();
    }

    function errorLoadBooks() {
        alert('Cannot load Books.');
    }

    function errorAddBook() {
        alert('Cannot add Books.');
    }
});