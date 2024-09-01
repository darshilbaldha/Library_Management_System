import LibraryFunctionalitiesForBook from "./LibraryFunctionalitiesForBook"; // Adjust the path as necessary
import BookNotAvailableException from "../exception/BookNotAvailableException";
import Book from "../book/Book";
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
    if (book != null && usr != null) {
      try {
        if (this.bookContainer.has(book)) {
          const currBookCount = this.bookContainer.get(book);
          this.bookContainer.set(book, currBookCount + 1);
        } else {
          this.bookContainer.set(book, 1);
          this.userCollection.add(usr);
        }
        return true;
      } catch (e) {
        // Handle the exception if needed
        return false;
      }
    } else {
      return false;
    }
  }

  borrowBook(book, user) {
    if(user === null && book === null){
      throw new Error("Book and User must not be null");
    }
    else  if (user === null) {
      throw new Error("User must not be null");
    } else if (book === null) {
      throw new Error("Book must not be null");
    } else {
      if (!this.bookContainer.has(book)) {
        throw new BookNotAvailableException(book);
      }
      return true;
    }
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
