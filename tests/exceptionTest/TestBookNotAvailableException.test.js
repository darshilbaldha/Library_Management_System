import Book from "../../src/assessment/incubyte/book/Book.js";
import BookNotAvailableException from "../../src/assessment/incubyte/exception/BookNotAvailableException.js";

describe("BookNotAvailableException Tests", () => {
  test("BookNotAvailableException constructor with no argument should throw an error", () => {
    expect(() => new BookNotAvailableException()).toThrow(
      "Can't raise Exception without book name"
    );
  });

  test("BookNotAvailableException constructor with null argument should throw an error", () => {
    expect(() => new BookNotAvailableException(null)).toThrow(
      "Can't raise Exception with null book"
    );
  });

  test("Constructor with appropriate argument should return a non-null object", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Darshil",
      publicationYear
    );

    const exception = new BookNotAvailableException(testBook);
    expect(exception).not.toBeNull();
  });

  test("toString method should return an appropriate message", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const unavailableBook = new Book(
      ISBN,
      "Web Development",
      "Darshil",
      publicationYear
    );

    const expectedErrMsg = `BookNotAvailableException: Sorry, ${unavailableBook.getBookTitle()} is currently not available`;

    const testExp = new BookNotAvailableException(unavailableBook);

    expect(testExp.toString()).toBe(expectedErrMsg);
  });
});
