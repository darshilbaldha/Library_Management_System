import Book from "../../src/assessment/incubyte/book/Book";

describe("Book Tests", () => {
  test("Book constructor should throw an error if no arguments are passed", () => {
    expect(() => new Book()).toThrow(
      "Book Can't be Created Without Initial Data"
    );
  });

  test("Book constructor should return a non-null object with valid arguments", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    const book = new Book(ISBN, "Web Development", "Darshil", publicationYear);
    expect(book).not.toBeNull();
  });

  test("Book constructor should throw an error if more than required arguments are passed", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    expect(
      () =>
        new Book(
          ISBN,
          "Web Development",
          "Darshil",
          publicationYear,
          "Extra Arg"
        )
    ).toThrow();
  });

  test("Book constructor should throw an error if the book title is less than 4 characters", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;

    expect(
      () => new Book(ISBN, "Dee", "Ian Goodfellow", publicationYear)
    ).toThrow("Book Title must contain at least 4 characters");
  });

  test("Book constructor should throw an error if the author name is less than 4 characters", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    expect(
      () => new Book(ISBN, "Web Development", "Ian", publicationYear)
    ).toThrow("Author Name must contain at least 4 characters");
  });

  test("Book constructor should throw an error if publication year is less than or equal to 0000", () => {
    const ISBN = [1234567890];
    const invalidPublicationYear = 0; // Assuming 0000 is represented as 0

    expect(
      () =>
        new Book(ISBN, "Valid Title", "Valid Author", invalidPublicationYear)
    ).toThrow();
  });

  test("Book constructor should throw an error if publication year is greater than the current year", () => {
    const ISBN = [1234567890];
    const futureYear = new Date().getFullYear() + 1;

    expect(
      () => new Book(ISBN, "Valid Title", "Valid Author", futureYear)
    ).toThrow();
  });

  test("Testing get methods of perfectly created Book Object", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    const bookTitle = "Deep Learning";
    const authorName = "Ian Goodfellow";
    const testBook = new Book(ISBN, bookTitle, authorName, publicationYear);

    expect(testBook.getISBN()).toEqual(ISBN);
    expect(testBook.getBookTitle()).toEqual(bookTitle);
    expect(testBook.getAuthorName()).toEqual(authorName);
    expect(testBook.getPublicationYear()).toEqual(publicationYear);
  });
});
