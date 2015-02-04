(function() {

    if (typeof require !== 'undefined') {
        _ = require('./node_modules/underscore/underscore.js');
    }

    var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
        {"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
        {"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
        {"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
        {"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
        {"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
        {"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
        {"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
        {"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
        {"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
        {"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
        {"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}];
//-----------------------------------------------------------
        var bookByLanguages = _.chain(books)
        .sortBy('author','price')
        .groupBy('language')
        .value();

        console.log(bookByLanguages);

//-----------------------------------------------------------
     var averageBookPrices = {};

    _.each(books, function (book) {
        var price = parseFloat(book.price.replace(',', '.'));
        var author = book.author;
        if (!averageBookPrices[author]) {
            averageBookPrices[author] = {
                'booksLength': 0,
                'totalPrice': 0
            };
        }

        averageBookPrices[book.author]['booksLength'] += 1;
        averageBookPrices[book.author]['totalPrice'] += price;
    });


    for (var author in averageBookPrices) {
        var averageBookPrice = averageBookPrices[author]['totalPrice'] / averageBookPrices[author]['booksLength'];
        console.log(author + ', Average book price: ' + averageBookPrice.toFixed(2));
    }
 //-----------------------------------------------------------

    var groupedBook = _.chain(books)
        .filter(function (book) {
            return (book.language == 'English' ||
                book.language == 'German')  ;
        })
        .groupBy('author')
        .value();

    console.log(groupedBook);
})();
