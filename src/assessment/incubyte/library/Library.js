import LibraryFunctionalitiesForBook from "./LibraryFunctionalitiesForBook"; // Adjust the path as necessary
import BookNotAvailableException from "../exception/BookNotAvailableException";
import Book from "../book/Book";
import User from "../user/User";
import InvalidBookException from "../exception/InvalidBookException";
import InvalidUserException from "../exception/InvalidUserException";
import LibraryInitialisationException from "../exception/LibraryInitialisationException";
import IllegalArgumentException from "../exception/IllegalArgumentException";

class Library extends LibraryFunctionalitiesForBook {
  constructor(...args) {
    super();
    if (args.length === 0) {
      throw new LibraryInitialisationException(
        "Can't Create Library Without Name Parameter"
      );
    }

    if (args.length === 1) {
      const libName = args[0];
      if (this.isNameValid(libName)) {
        this.libName = libName;
        this.bookContainer = new Map(); // Initialize the book container
        this.userCollection = new Set(); // For storing registered users
      } else {
        throw new LibraryInitialisationException(
          "Library name must be at least 4 characters long"
        );
      }
    } else if (args.length > 1) {
      throw new LibraryInitialisationException(
        "Library Constructor should be called with exactly one argument(i:e Library name)"
      );
    }
  }

  isNameValid(libName) {
    return libName !== null && libName.length >= 4;
  }

  getName() {
    return this.libName;
  }

  addBook(book, usr) {
    if (this.isValidUser(usr) && this.isValidBook(book)) {
      if (this.doesBookHaveEntryInContainer(book)) {
        const currBookCount = this.bookContainer.get(book);
        this.bookContainer.set(book, currBookCount + 1);
        return true;
      } else {
        this.bookContainer.set(book, 1);
        this.userCollection.add(usr);
        return true;
      }
    }
    return false;
  }

  doesBookHaveEntryInContainer(book) {
    return this.bookContainer.has(book);
  }

  isValidUser(usr) {
    return usr !== null;
  }

  isValidBook(book) {
    return book !== null;
  }

  throwInvalidUserException(errMsg) {
    throw new InvalidUserException(errMsg);
  }

  throwInvalidBookException(errMsg) {
    throw new InvalidBookException(errMsg);
  }

  throwBookNotAvailableException(book) {
    throw new BookNotAvailableException(book);
  }

  throwBothArgNotAvailableException(book) {
    throw new IllegalArgumentException(book);
  }

  borrowBook(book, usr) {
    if (this.isValidUser(usr) && this.isValidBook(book)) {
      if (this.doesBookHaveEntryInContainer(book)) {
        const currBookCount = this.bookContainer.get(book);
        this.bookContainer.set(book, currBookCount - 1);
        return true;
    } else {
        this.throwBookNotAvailableException(book);
    }
    } else {
      if (!this.isValidBook(book) && !this.isValidUser(usr)) {
        this.throwBothArgNotAvailableException(
          "Book Parameter Is Either Null Or Invalid"
        );
      }
      else if (!this.isValidBook(book)) {
        this.throwInvalidBookException(
          "Book Parameter Is Either Null Or Invalid"
        );
      }
      else{
        this.throwInvalidUserException(
          "User Parameter Is Either Null Or Invalid"
        );
      }
    }
    return false;
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
