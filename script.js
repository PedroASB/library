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

// Adds a new book to the library array
function addBookToLibrary(title, author, pages, read, genre, release) {
    const newBook = new Book(title, author, pages, read, genre, release);
    library.push(newBook);
}

// Removes a book from the library array
function removeBookFromLibrary(id) {
    library.splice(0, library.length, library.filter((book) => {book.id !== id}));
}

// Handles the removal of a book and removes it from the DOM
function handleRemoveBook(event) {
    const card = event.target.closest(".card");
    const bookId = card.dataset.id;
    removeBookFromLibrary(bookId);
    card.remove();
}

// Displays a single book on the page
function displayBook(book) {
    const mainContent = document.querySelector("#main-content");
    const cardTemplate = document.querySelector("#card-template");
    const card = cardTemplate.content.cloneNode(true);
    const removeButton = card.querySelector("button.remove");
    
    card.querySelector(".card").setAttribute("data-id", book.id);
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author span").textContent = book.author;
    card.querySelector(".pages .value").textContent = book.pages;
    card.querySelector(".genre .value").textContent = book.genre;
    card.querySelector(".release .value").textContent = book.release;
    
    removeButton.addEventListener("click", handleRemoveBook);
    mainContent.appendChild(card);
}

// Displays all books in the library array on the page
function displayAllBooks() {
    for (const book of library) {
        displayBook(book);
    }
}

// Adds some random books to the library
function addSampleBooks() {
    addBookToLibrary("Nice Book", "AuTornado", 123, false, "Sci-Fi", 1980);
    addBookToLibrary("Another Nice Book", "AuThor", 456, false, "Wi-Fi", 1985);
    addBookToLibrary("A Nicer Book", "AuThor Ragnarok", 1089, false, "Action", 1990);
    addBookToLibrary("The Nicest One", "Alt Thor", 684, false, "Random", 1995);
}

// Extracts the data from the form and adds the book to the library array
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
    addBookToLibrary(title, author, pages, read, genre, release);
}

// Sets up the library app
function initializeLibrary() {
    const newBookButton = document.querySelector("#new-book-btn");
    const dialog = document.querySelector("#new-book-dialog");

    newBookButton.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "ok-button") {
            handleFormData();
            displayBook(library[library.length - 1]);
        }
    });

    // Adding some sample books to the page
    addSampleBooks();
    displayAllBooks();
}


/* Global constants and variables */
const EMPTY_FIELD = "\u2013";
const library = []; // Array that stores the books

/* Begin */
initializeLibrary();
