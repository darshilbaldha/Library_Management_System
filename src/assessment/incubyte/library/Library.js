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
        this.userCollection = new Set(); // For storing registered users
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
    try {
      if (book === null || usr === null) {
        return false; // Handle null arguments if necessary
      }

      if (this.bookContainer.has(book)) {
        let currBookCount = this.bookContainer.get(book);
        this.bookContainer.set(book, currBookCount + 1);
      } else {
        this.bookContainer.set(book, 1);
        this.userCollection.add(usr);
      }

      return true;
    } catch (error) {
      // Handle exception
      return false;
    }

   
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

  getRegisteredUsers() {
    return this.userCollection;
  }
}

export default Library;
