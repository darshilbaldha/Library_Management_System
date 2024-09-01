class LibraryFunctionalitiesForBook {
  // Abstract method for adding a book
  addBook(book, usr) {
    throw new Error("Method 'addBook()' must be implemented.");
  }

  // Abstract method for borrowing a book
  borrowBook(book, usr) {
    throw new Error("Method 'borrowBook()' must be implemented.");
  }

  // Abstract method for returning a book
  returnBook(book, usr) {
    throw new Error("Method 'returnBook()' must be implemented.");
  }

  // Abstract method for getting available books
  getAvlBooks() {
    throw new Error("Method 'getAvlBooks()' must be implemented.");
  }
}

export default LibraryFunctionalitiesForBook;
