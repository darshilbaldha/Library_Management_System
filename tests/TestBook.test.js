import Book from "../src/assessment/incubyte/Book";

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
    ).toThrow("Book title must be at least 4 characters long");
  });
});
