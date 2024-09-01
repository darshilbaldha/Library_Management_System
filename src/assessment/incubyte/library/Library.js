import LibraryFunctionalitiesForBook from "./LibraryFunctionalitiesForBook"; // Adjust the path as necessary
import Book from "../Book/Book";
import User from "../user/User";

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
        this.bookContainer = new Map(); // Initialize the book container
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
    // Here you might want to add additional logic for adding books
    if (book instanceof Book && usr instanceof User) {
      const currentCount = this.bookContainer.get(book) || 0;
      this.bookContainer.set(book, currentCount + 1);
      return true; // Assume the book was added successfully
    }
    return false;
  }

  borrowBook(usr) {
    throw new Error("Method 'borrowBook' is not implemented");
  }

  returnBook(book, usr) {
    throw new Error("Method 'returnBook' is not implemented");
  }

  getAvlBooks() {
    return Array.from(this.bookContainer.keys());
  }
}

export default Library;
