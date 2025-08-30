// Array that stores the books
const library = [];

// Book constructor
function Book(title, author, pages, read, genre, release) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    this.release = release;
    this.id = crypto.randomUUID();
}

// Adds a new book to the library
function addBookToLibrary(title, author, pages, read, genre, release) {
    const newBook = new Book(title, author, pages, read, genre, release);
    library.push(newBook);
}

function displayBook(book) {
    const mainContent = document.querySelector("#main-content");
    const cardTemplate = document.querySelector("#card-template");
    const card = cardTemplate.content.cloneNode(true);

    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author span").textContent = book.author;
    card.querySelector(".pages .value").textContent = book.pages;
    card.querySelector(".genre .value").textContent = book.genre;
    card.querySelector(".release .value").textContent = book.release;

    mainContent.appendChild(card);
}

function addSampleBooks() {
    const book1 = new Book("Nice Book", "AuTornado", 123, false, "Sci-Fi", 1980);
    const book2 = new Book("Another Nice Book", "AuThor", 456, false, "Wi-Fi", 1985);
    const book3 = new Book("A Nicer Book", "AuThor Ragnarok", 1089, false, "Action", 1990);
    const book4 = new Book("The Nicest One", "Alt Thor", 684, false, "Random", 1995);

    displayBook(book1);
    displayBook(book2);
    displayBook(book3);
    displayBook(book4);
}

function handleFormData() {
    const form = document.querySelector("#new-book-form");
    const formData = new FormData(form);
    let title, author, pages, read = false, genre, release;

    for (const [key, value] of formData) {
        switch (key) {
            case "title":
                title = value ? value : EMPTY_FIELD;
                break;
            case "author":
                author = value ? value : EMPTY_FIELD;
                break;
            case "pages":
                pages = value ? value : EMPTY_FIELD;
                break;
            case "genre":
                genre = value ? value : EMPTY_FIELD;
                break;
            case "release":
                release = value ? value : EMPTY_FIELD;
                break;
            case "read":
                read = true;
                break;
        }
    }

    form.reset();
    const newBook = new Book(title, author, pages, read, genre, release);
    return newBook;
}

function initializeLibrary() {
    const newBookButton = document.querySelector("#new-book-btn");
    const dialog = document.querySelector("#new-book-dialog");

    newBookButton.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "ok-button") {
            const newBook = handleFormData();
            displayBook(newBook);
        }
    });

    // Adding some sample books
    addSampleBooks();
}


// Global constants and variables
const EMPTY_FIELD = "\u2013";

// Begin
initializeLibrary();
