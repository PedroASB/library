// Array that stores the books
const library = [];

// Book constructor
function Book(title, author, pages, read, genre, year) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    this.year = year;
    this.id = crypto.randomUUID();
}

// Adds a new book to the library
function addBookToLibrary(title, author, pages, read, genre, year) {
    let newBook = new Book(title, author, pages, read, genre, year);
    library.push(newBook);
}
