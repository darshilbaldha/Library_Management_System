import LibraryFunctionalitiesForBook from "./LibraryFunctionalitiesForBook"; // Adjust the path as necessary
import BookNotAvailableException from "../exception/BookNotAvailableException";
import Book from "../book/Book";
import User from "../user/User";
import InvalidBookException from "../exception/InvalidBookException";
import InvalidUserException from "../exception/InvalidUserException";
import LibraryInitialisationException from "../exception/LibraryInitialisationException";
import BorrowLimitExceededException from "../exception/BorrowLimitExceededException";
import IllegalArgumentException from "../exception/IllegalArgumentException";
import InvalidReturnAttemptException from "../exception/InvalidReturnAttemptException";

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
        this.borrowedBooksRecord = new Map(); // Initialize borrowed books record
        this.MAX_BOOK_ALLOWED_TO_BORROW = 2; // Max books allowed to borrow
      } else {
        throw new LibraryInitialisationException(
          "Library name must be at least 4 characters long"
        );
      }
    } else {
      throw new LibraryInitialisationException(
        "Library Constructor should be called with exactly one argument (i.e., Library name)"
      );
    }
  }

  isNameValid(libName) {
    return libName !== null && libName.length >= 4;
  }

  getName() {
    return this.libName;
  }

  getMaxBooksAllowedToBorrow() {
    return this.MAX_BOOK_ALLOWED_TO_BORROW;
  }

  addBook(book, usr) {
    if (!this.isValidBook(book) && !this.isValidUser(usr)) {
      throw new IllegalArgumentException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      throw new InvalidUserException(
        "User Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isValidBook(book)) {
      throw new InvalidBookException(
        "Book Parameter Is Either Null Or Invalid"
      );
    }
    if (this.isNewUser(usr)) {
      this.registerNewUser(usr);
    }
    if (this.doesBookHaveEntryInContainer(book)) {
      this.incrementBookCount(book);
    } else {
      this.addBookToContainer(book);
    }
    return true;
  }

  borrowBook(param, usr) {
    if (!this.isValidBook(param) && !this.isValidUser(usr)) {
      throw new IllegalArgumentException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    const paramType = this.isABookOrAnISBN(param);
    let book = null;

    if (paramType === null) {
      throw new InvalidBookException(
        "Book Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      throw new InvalidUserException(
        "User Parameter Is Either Null Or Invalid"
      );
    }
    if (paramType === "Book") {
      book = param;
    } else if (paramType === "ISBN") {
      const ISBN = param;
      book = this.getBookByISBN(ISBN);
    }
    if (!this.isValidBook(book)) {
      throw new InvalidBookException("Book/ISBN Is Either Null Or Invalid");
    }
    if (!this.isBookAvailableToBorrow(book)) {
      throw new BookNotAvailableException(book);
    }
    if (!this.isEligibleToBorrow(usr, book)) {
      throw new BorrowLimitExceededException(
        "You have exceeded the number of books allowed to borrow. Please return any of your previous books to continue."
      );
    }
    if (this.isNewUser(usr)) {
      this.registerNewUser(usr);
    }
    this.decrementBookCount(book);
    this.addBorrowEntry(usr, book);
    return true;
  }

  returnBook(book, usr) {
    if (!this.isValidBook(book) && !this.isValidUser(usr)) {
      throw new IllegalArgumentException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      throw new InvalidUserException(
        "User Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isValidBook(book)) {
      throw new InvalidBookException(
        "Book Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isUserEligibleToReturnThisBook(book, usr)) {
      throw new InvalidReturnAttemptException(book, usr);
    }
    this.incrementBookCount(book);
    this.removeBorrowEntry(book, usr);
    return true;
  }

  getBookByISBN(ISBN) {
    for (const book of this.bookContainer.keys()) {
      if (book.getISBN() === ISBN) {
        return book;
      }
    }
    return null;
  }

  isABookOrAnISBN(param) {
    if (param === null) {
      return null;
    }
    if (param instanceof Book) {
      return "Book";
    }
    if (typeof param === "string") {
      return "ISBN";
    }
    return null;
  }

  getAvlBooks() {
    return Array.from(this.bookContainer.keys());
  }

  isValidBook(book) {
    return book !== null;
  }

  isValidUser(usr) {
    return usr !== null;
  }

  doesBookHaveEntryInContainer(book) {
    return this.bookContainer.has(book);
  }

  isBookAvailableToBorrow(book) {
    return (
      this.doesBookHaveEntryInContainer(book) &&
      this.bookContainer.get(book) > 0
    );
  }

  incrementBookCount(book) {
    const currentCount = this.bookContainer.get(book);
    this.bookContainer.set(book, currentCount + 1);
  }

  decrementBookCount(book) {
    const currentCount = this.bookContainer.get(book);
    if (currentCount <= 0) {
      throw new Error("Book count cannot be less than 0.");
    }
    this.bookContainer.set(book, currentCount - 1);
  }

  addBookToContainer(book) {
    this.bookContainer.set(book, 1);
  }

  isNewUser(usr) {
    return !this.isRegisteredUser(usr);
  }

  isRegisteredUser(usr) {
    return this.userCollection.has(usr);
  }

  registerNewUser(usr) {
    this.userCollection.add(usr);
  }

  addBorrowEntry(usr, book) {
    let borrowedBookList = this.borrowedBooksRecord.get(usr);
    if (!borrowedBookList) {
      borrowedBookList = [];
      this.borrowedBooksRecord.set(usr, borrowedBookList);
    }

    if (borrowedBookList.length >= this.MAX_BOOK_ALLOWED_TO_BORROW) {
      throw new BorrowLimitExceededException("Exceeded borrowing limit.");
    }

    borrowedBookList.push(book);
  }

  isEligibleToBorrow(usr, book) {
    const borrowedBooks = this.borrowedBooksRecord.get(usr) || [];
    return borrowedBooks.length < this.MAX_BOOK_ALLOWED_TO_BORROW && !borrowedBooks.includes(book);
  }
  
  isUserEligibleToReturnThisBook(book, usr) {
    if (!this.doesBookHaveEntryInContainer(book)) {
      return false;
    }
    if (!this.isRegisteredUser(usr)) {
      return false;
    }
    const borrowedBookList = this.borrowedBooksRecord.get(usr);
    return borrowedBookList && borrowedBookList.includes(book);
  }

  removeBorrowEntry(book, usr) {
    const borrowedBookList = this.borrowedBooksRecord.get(usr);
    if (borrowedBookList) {
      const index = borrowedBookList.indexOf(book);
      if (index > -1) {
        borrowedBookList.splice(index, 1);
      }
    }
  }

  getRegisteredUsers() {
    return this.userCollection;
  }

  getBorrowedBooksRecord() {
    return this.borrowedBooksRecord;
  }

  getBookContainer() {
    return this.bookContainer;
  }
}

export default Library;
