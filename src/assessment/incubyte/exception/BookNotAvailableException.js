import Book from "../book/Book.js";

class BookNotAvailableException extends Error {
  constructor(unavailableBook) {
    if (unavailableBook === undefined) {
      throw new Error("Can't raise Exception without book name");
    } else if (unavailableBook === null) {
      throw new Error("Can't raise Exception with null book");
    } else {
      super(`Sorry, ${unavailableBook.getBookTitle()} is currently not available`);
      this.name = "BookNotAvailableException";
    }
  }
}

export default BookNotAvailableException;
