// Collection "books" which contains the documents given as below(Perform on Mongo Terminal)
// name:"understanding JAVA", pages:400
// -using MapReduce, categerize books into small books and big books, based on number of pages display and categorize total number of books.

show dbs
use lib
db.createCollection("books")
db.books.insertMany([
    {name:"Understanding JAVA",pages:400},
    {name:"Learn MongoDB",pages:120},
    {name:"Mastering  Python",pages:650},
    {name:"C++ Basics",pages:180},
    {name:"Advance AI",pages:900}
])

var mapFunction=function(){
    var category=(this.pages>300) ? "Big Books" : "Small Books";
    emit(category,1);
};

var reduceFunction=function(key,values){
    return Array.sum(values)
};
db.books.mapReduce(
    mapFunction,
    reduceFunction,
    {
    out:"book_category_cout"
    }
);