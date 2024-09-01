class Book {
  constructor(...args) {
    // Check for no arguments or undefined/null arguments
    if (args.length === 0 || args.some((arg) => arg === undefined)) {
      throw new Error("Book Can't be Created Without Initial Data");
    }

    if (args.length === 4) {
      this.ISBN = args[0];
      this.bookTitle = args[1];
      this.authorName = args[2];
      this.publicationYear = args[3];

      this.checkParameterValidityAndRaiseAppropriateError();
    } else if (args.length > 4) {
      throw new Error(
        "Constructor should be called with only four (i.e., ISBN, bookTitle, authorName, publicationYear) arguments"
      );
    }
  }

  // Method to validate and raise appropriate errors
  checkParameterValidityAndRaiseAppropriateError() {
    // Validation of ISBN
    if (!this.ISBN || this.ISBN.length < 10) {
      throw new Error(
        `ISBN must be at least 10 characters long { ${this.ISBN} }`
      );
    }
    // Validation of Book title
    if (this.bookTitle === null || this.bookTitle.length < 4) {
      throw new Error(
        `Book Title must contain at least 4 characters { ${this.bookTitle} }`
      );
    }

    // Validation of Author Name
    if (this.authorName === null || this.authorName.length < 4) {
      throw new Error(
        `Author Name must contain at least 4 characters { ${this.authorName} }`
      );
    }

    // Validate publication year
    if (this.publicationYear === null) {
      throw new Error("Publication Year must not be null");
    }
    const currentYear = new Date().getFullYear();
    if (this.publicationYear <= 0) {
      throw new Error("Publication Year must not be 0000 or less");
    }
    if (this.publicationYear > currentYear) {
      throw new Error(
        `Publication Year must not be greater than current year (${currentYear})`
      );
    }
  }

  // Getter for ISBN
  getISBN() {
    return this.ISBN;
  }

  // Getter for book title
  getBookTitle() {
    return this.bookTitle;
  }

  // Getter for author name
  getAuthorName() {
    return this.authorName;
  }

  // Getter for publication year
  getPublicationYear() {
    return this.publicationYear;
  }
  // Overriding equals method
  equals(other) {
    if (this === other) return true;
    if (!(other instanceof Book)) return false;
    return this.ISBN === other.ISBN;
  }

  hashCode() {
    return this.ISBN.split("").reduce((acc, val) => acc + val.charCodeAt(0), 0);
  }

  toString() {
    return `Book [ISBN=${this.ISBN}, bookTitle=${this.bookTitle}, authorName=${this.authorName}, publicationYear=${this.publicationYear}]`;
  }
}

// Adding hashCode method to String prototype for hashCode implementation
String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const character = this.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export default Book;
