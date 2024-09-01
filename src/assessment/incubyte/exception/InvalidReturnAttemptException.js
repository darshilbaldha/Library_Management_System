// File: src/exception/InvalidReturnAttemptException.js
class InvalidReturnAttemptException extends Error {
  constructor(book, usr) {
    super(`${book.getBookTitle()} book is not currently allowed to be returned by ${usr.getName()}`);
    this.name = "InvalidReturnAttemptException";
  }
}

export default InvalidReturnAttemptException;
