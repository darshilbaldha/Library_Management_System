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

  test("Testing toString method must not return null for a perfectly created object", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    const bookTitle = "Deep Learning";
    const authorName = "Darshil"; // Corrected the name typo

    const testBook = new Book(ISBN, bookTitle, authorName, publicationYear);

    const expectedString = `Book [ISBN=${ISBN.toString()}, bookTitle=${bookTitle}, authorName=${authorName}, publicationYear=${publicationYear}]`;
    // Check that toString does not return null
    expect(testBook.toString()).not.toBeNull();

    // Check that toString returns the expected string
    expect(testBook.toString()).toBe(expectedString);
  });

  test("Testing equality and hash code contract for Book objects", () => {
    const ISBN = [1234567890];
    const publicationYear = 2000;
    const bookTitle = "Deep Learning";
    const authorName = "Darshil";

    const testBook1 = new Book(ISBN, bookTitle, authorName, publicationYear);
    const testBook2 = new Book(ISBN, bookTitle, authorName, publicationYear);

    // Check that the references are not the same
    expect(testBook1).not.toBe(testBook2); // Reference check

    // Check that the objects are equal based on the equality method
    expect(testBook1.equals(testBook2)).toBe(true); // Equality check

    // Test getters
    expect(testBook1.getISBN()).toEqual(ISBN);
    expect(testBook1.getBookTitle()).toEqual(bookTitle);
    expect(testBook1.getAuthorName()).toEqual(authorName);
    expect(testBook1.getPublicationYear()).toEqual(publicationYear);
  });
});
