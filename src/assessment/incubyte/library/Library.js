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
      this.throwBothArgNotAvailableException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      this.throwInvalidUserException(
        "User Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isValidBook(book)) {
      this.throwInvalidBookException(
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

  borrowBook(book, usr) {
    if (!this.isValidBook(book) && !this.isValidUser(usr)) {
      this.throwBothArgNotAvailableException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      this.throwInvalidUserException(
        "User Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isValidBook(book)) {
      this.throwInvalidBookException(
        "Book Parameter Is Either Null Or Invalid"
      );
    }
    if (!this.isBookAvailableToBorrow(book)) {
      this.throwBookNotAvailableException(book);
    }
    if (!this.isEligibleToBorrow(usr,book)) {
      this.throwBorrowLimitExceededException(
        "You have Exceeded The Number Of Books Allowed To Borrow. Please Return Any Of Your Previous Books To Continue"
      );
    }
    if (this.isNewUser(usr)) {
      this.registerNewUser(usr);
    }
    this.decrementBookCount(book);
    this.addBorrowEntry(book, usr);
    return true;
  }

  returnBook(book, usr) {
    if (!this.isValidBook(book) && !this.isValidUser(usr)) {
      this.throwBothArgNotAvailableException(
        "Both Parameters Are Either Null Or Invalid"
      );
    }
    if (!this.isValidUser(usr)) {
      this.throwInvalidUserException("User Parameter Is Either Null Or Invalid");
    }
    if (!this.isValidBook(book)) {
      this.throwInvalidBookException("Book Parameter Is Either Null Or Invalid");
    }
    if (!this.isUserEligibleToReturnThisBook(book, usr)) {
      this.throwInvalidReturnAttemptException(book, usr);
    }
    this.incrementBookCount(book);
    this.removeBorrowEntry(book, usr);
    return true;
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

  addBorrowEntry(book, usr) {
    let borrowedBookList = this.borrowedBooksRecord.get(usr);
    if (!borrowedBookList) {
      borrowedBookList = new Array(this.MAX_BOOK_ALLOWED_TO_BORROW);
      this.borrowedBooksRecord.set(usr, borrowedBookList);
    }
    borrowedBookList.push(book);
  }
  

  isEligibleToBorrow(usr, book) {
    const borrowedBooks = this.borrowedBooksRecord.get(usr);

    if (!borrowedBooks) {
        return true;
    } 
    if (borrowedBooks.length >= this.MAX_BOOK_ALLOWED_TO_BORROW) {
        return false;
    }
    if (borrowedBooks.includes(book)) {
        return false;
    }
    return true;
}


  throwInvalidUserException(errMsg) {
    throw new InvalidUserException(errMsg);
  }

  throwInvalidBookException(errMsg) {
    throw new InvalidBookException(errMsg);
  }
throwBookNotAvailableException
  (book) {
    throw new BookNotAvailableException(book);
  }

  throwBorrowLimitExceededException(errMsg) {
    throw new BorrowLimitExceededException(errMsg);
  }

  throwBothArgNotAvailableException(errMsg) {
    throw new IllegalArgumentException(errMsg);
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

  throwInvalidReturnAttemptException(book, usr) {
    throw new InvalidReturnAttemptException(book, usr);
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
