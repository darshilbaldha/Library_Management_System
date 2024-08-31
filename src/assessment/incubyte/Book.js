class Book {
  constructor(...args) {
    if (args.length === 0) {
      throw new Error("Book Can't be Created Without Initial Data");
    }

    if (
      args.length === 4 &&
      Array.isArray(args[0]) &&
      typeof args[1] === "string" &&
      typeof args[2] === "string" &&
      typeof args[3] === "number"
    ) {
      this.ISBN = args[0];
      this.bookTitle = args[1];
      this.authorName = args[2];
      this.publicationYear = args[3];

    //   Validation of Book title 
      if (args[1] !== null && args[1].length < 4) {
        throw new Error(
          `Book Title must contain at least 4 characters { ${args[1]} }`
        );
      }
    //   Validation of name of author
      if (args[2] !== null && args[2].length < 4) {
        throw new Error(
          `Author Name must contain at least 4 characters { ${args[2]} }`
        );
      }
      // Validate publication year
      if (args[3] === null) {
        throw new Error("Publication Year must not be null");
      }
      const currentYear = new Date().getFullYear();
      if (args[3] <= 0) {
        throw new Error("Publication Year must not be 0000 or less");
      }
      if (args[3] > currentYear) {
        throw new Error(
          `Publication Year must not be greater than current year (${currentYear})`
        );
      }
    } else if (args.length > 4) {
      throw new Error(
        "Constructor should be called with only four (i.e., ISBN, bookTitle, authorName, publicationYear) arguments"
      );
    }
  }
}

export default Book;
