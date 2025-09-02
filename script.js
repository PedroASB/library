// Book constructor
function Book(title, author, pages, read, genre, release, cover) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    this.release = release;
    this.cover = cover; // Path to the cover image
    this.id = crypto.randomUUID();
}

// Toggle the read status of a book object between true/false
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

// Adds a new book to the library array
function addBookToLibrary(title, author, pages, read, genre, release, cover) {
    const newBook = new Book(title, author, pages, read, genre, release, cover);
    library.push(newBook);
}

// Removes a book from the library array
function removeBookFromLibrary(id) {
    library.splice(0, library.length, ...library.filter((book) => book.id !== id));
}

// Handles the removal of a book and removes it from the DOM
function handleRemoveBook(event) {
    const card = event.target.closest(".card");
    const bookId = card.dataset.id;
    removeBookFromLibrary(bookId);
    card.remove();
}

// Returns a book given its id
function getBookFromId(id) {
    for (const book of library) {
        if (book.id === id) return book;
    }
    return null;
}

// Handles the toggle of the read status of a book
function handleReadBook(event) {
    const card = event.target.closest(".card");
    const bookId = card.dataset.id;
    const book = getBookFromId(bookId);
    const unreadBooksDiv = document.querySelector("#main-content .unread-books");
    const readBooksDiv = document.querySelector("#main-content .read-books");

    card.remove();

    if (book.read) { // Read to Unread
        unreadBooksDiv.appendChild(card);
        card.querySelector("button.read").textContent = "Mark as read";
    }
    else { // Unread to Read
        readBooksDiv.appendChild(card); 
        card.querySelector("button.read").textContent = "Mark as unread";
    }

    book.toggleReadStatus();
}

// Displays a single book on the page
function displayBook(book) {
    const unreadBooksDiv = document.querySelector("#main-content .unread-books");
    const readBooksDiv = document.querySelector("#main-content .read-books");
    const cardTemplate = document.querySelector("#card-template");
    const card = cardTemplate.content.cloneNode(true);
    const removeButton = card.querySelector("button.remove");
    const readButton = card.querySelector("button.read");
    
    card.querySelector(".card").setAttribute("data-id", book.id);
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author span").textContent = book.author;
    card.querySelector(".pages .value").textContent = book.pages;
    card.querySelector(".genre .value").textContent = book.genre;
    card.querySelector(".release .value").textContent = book.release;
    if (book.cover) {
        card.querySelector(".picture").style.backgroundColor = "inherit";
        card.querySelector(".picture img").src = book.cover;
    }
    
    removeButton.addEventListener("click", handleRemoveBook);
    readButton.addEventListener("click", handleReadBook);

    if (book.read) {
        readBooksDiv.appendChild(card);
        readButton.textContent = "Mark as unread";
    }
    else {
        unreadBooksDiv.appendChild(card);
        readButton.textContent = "Mark as read";
    }
}

// Loops through the library array and displays each book on the page
function displayAllBooks() {
    for (const book of library) {
        displayBook(book);
    }
}

// Adds some random books to the library
function addSampleBooks() {
    addBookToLibrary("Dracula", "Bram Stoker", 461, false,
                     "Horror", 1897, "./assets/imgs/dracula-cover.jpg");
    addBookToLibrary("Moby Dick", "Herman Melville", 635, true,
                     "Adventure", 1851, "./assets/imgs/moby-dick-cover.jpg");
    addBookToLibrary("Sherlock Holmes", "Arthur Conan Doyle", 307, false,
                     "Fiction", 1892, "./assets/imgs/sherlock-holmes-cover.jpg");
    addBookToLibrary("Frankenstein", "Mary Shelley", 280, false,
                     "Horror", 1818, "./assets/imgs/frankenstein-cover.jpg");
    addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 292, false,
                     "Adventure", 1883, "./assets/imgs/treasure-island-cover.jpg");
    addBookToLibrary("The Wonderful Wizard of Oz", "L. Frank Baum", 154, true,
                     "Fantasy", 1900, "./assets/imgs/wizard-of-oz-cover.jpg");
    addBookToLibrary("The Mysterious Island", "Jules Verne", 650, false,
                     "Adventure", 1875, "./assets/imgs/the-mysterious-island-cover.jpg");
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
