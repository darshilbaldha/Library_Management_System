import LibraryFunctionalitiesForBook from "./LibraryFunctionalitiesForBook"; // Adjust the path as necessary

class Library extends LibraryFunctionalitiesForBook {
  constructor(...args) {
    super();
    if (args.length === 0) {
      throw new Error("Library Can't be Created Without Name");
    }

    if (args.length === 1 && typeof args[0] === "string") {
      const libName = args[0];
      if (this.isNameValid(libName)) {
        this.libName = libName;
        this.bookList = []; // Initialize the book list
      } else {
        throw new Error("Library name must be at least 4 characters long");
      }
    } else if (args.length > 1) {
      throw new Error("Constructor should be called with only one argument");
    }
  }

  isNameValid(libName) {
    return libName !== null && libName.length >= 4;
  }

  getName() {
    return this.libName;
  }

  addBook(book, usr) {
    // Example implementation
    // Here you might want to add additional logic
    return true; // Assume the book was added successfully
  }

  borrowBook(usr) {
    throw new Error("Method 'borrowBook' is not implemented");
  }

  returnBook(book, usr) {
    throw new Error("Method 'returnBook' is not implemented");
  }

  getAvlBooks() {
    return Object.freeze([...this.bookList]); // Return an immutable copy of the book list
  }
}

export default Library;
