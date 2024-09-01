import Book from "../../src/assessment/incubyte/book/Book";

describe("Book Tests", () => {
  test("Book constructor should throw an error if no arguments are passed", () => {
    expect(() => new Book()).toThrow(
      "Book Can't be Created Without Initial Data"
    );
  });

  test("Book constructor should return a non-null object with valid arguments", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const book = new Book(ISBN, "Web Development", "Darshil", publicationYear);
    expect(book).not.toBeNull();
  });

  test("Book constructor should throw an error if more than required arguments are passed", () => {
    const ISBN = "1234567890";
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
    ).toThrow(
      "Constructor should be called with only four (i.e., ISBN, bookTitle, authorName, publicationYear) arguments"
    );
  });

  test("Book constructor with null title should throw IllegalArgumentException", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    expect(
      () => new Book(ISBN, null, "Darshil", publicationYear)
    ).toThrow("Book Title must contain at least 4 characters { null }");
  });

  test("Book constructor should throw an error if the book title is less than 4 characters", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;

    expect(
      () => new Book(ISBN, "Dee", "Darshil", publicationYear)
    ).toThrow("Book Title must contain at least 4 characters { Dee }");
  });

  test("Book constructor with null author name should throw IllegalArgumentException", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    expect(
      () => new Book(ISBN, "Web Development", null, publicationYear)
    ).toThrow("Author Name must contain at least 4 characters { null }");
  });

  test("Book constructor should throw an error if the author name is less than 4 characters", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    expect(
      () => new Book(ISBN, "Web Development", "Ian", publicationYear)
    ).toThrow("Author Name must contain at least 4 characters { Ian }");
  });

  test("Book constructor with null publication year should throw IllegalArgumentException", () => {
    const ISBN = "1234567890";
    expect(
      () => new Book(ISBN, "Web Development", "Darshil", null)
    ).toThrow("Publication Year must not be null");
  });

  test("Book constructor should throw an error if publication year is less than or equal to 0000", () => {
    const ISBN = "1234567890";
    const invalidPublicationYear = 0; // Assuming 0000 is represented as 0

    expect(
      () =>
        new Book(ISBN, "Valid Title", "Valid Author", invalidPublicationYear)
    ).toThrow("Publication Year must not be 0000 or less");
  });

  test("Book constructor should throw an error if publication year is greater than the current year", () => {
    const ISBN = "1234567890";
    const futureYear = new Date().getFullYear() + 1;

    expect(
      () => new Book(ISBN, "Valid Title", "Valid Author", futureYear)
    ).toThrow(
      "Publication Year must not be greater than current year (" +
        new Date().getFullYear() +
        ")"
    );
  });

  test("Book constructor with null ISBN should throw an error", () => {
    const publicationYear = 2000;
    expect(() => new Book(null, "Web Development", "Darshil", publicationYear))
      .toThrow("ISBN must not be null");
  });

  test("Book constructor with ISBN length less than 10 should throw an error", () => {
    const ISBN = "1234567";
    const publicationYear = 2000;
    expect(() => new Book(ISBN, "Web Development", "Darshil", publicationYear))
      .toThrow(`ISBN must be at least 10 characters long { ${ISBN} }`);
  });

  test("Book constructor with ISBN length less than 10 should throw an error", () => {
    const ISBN = "12345678910112";
    const publicationYear = 2000;
    expect(() => new Book(ISBN, "Web Development", "Darshil", publicationYear))
      .toThrow(`ISBN length can be a maximum of 13 characters long { ${ISBN} }`);
  });

  test("Get methods should work fine for a perfectly created Book object", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const bookTitle = "web Development";
    const authorName = "Darshil";
    const testBook = new Book(ISBN, bookTitle, authorName, publicationYear);

    expect(testBook.getISBN()).toEqual(ISBN);
    expect(testBook.getBookTitle()).toBe(bookTitle);
    expect(testBook.getAuthorName()).toBe(authorName);
    expect(testBook.getPublicationYear()).toBe(publicationYear);
  });

  test("Testing toString method must not return null for a perfectly created object", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const bookTitle = "Web Development";
    const authorName = "Darshil"; // Corrected the name typo

    const testBook = new Book(ISBN, bookTitle, authorName, publicationYear);

    const expectedString = `Book [ISBN=${ISBN.toString()}, bookTitle=${bookTitle}, authorName=${authorName}, publicationYear=${publicationYear}]`;
    // Check that toString does not return null
    expect(testBook.toString()).not.toBeNull();

    // Check that toString returns the expected string
    expect(testBook.toString()).toBe(expectedString);
  });

  test("Testing equality and hash code contract for Book objects", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const bookTitle = "Web Development";
    const authorName = "Darshil";

    const testBook1 = new Book(ISBN, bookTitle, authorName, publicationYear);
    const testBook2 = new Book(ISBN, bookTitle, authorName, publicationYear);

    // Check that the references are not the same
    expect(testBook1).not.toBe(testBook2); // Reference check

    // Check that the objects are equal based on the equality method
    expect(testBook1.equals(testBook2)).toBe(true); // Equality check

    expect(testBook1 === testBook2).toBe(false); // reference is not same
    expect(testBook1).toEqual(testBook2); // Checks value equality
  });

  test("hashCode functionality should stay consistent", () => {
    const ISBN = "1234567890";
    const publicationYear = 2000;
    const bookTitle = "Web Development";
    const authorName = "Darshil";
    const testBook1 = new Book(ISBN, bookTitle, authorName, publicationYear);
    const testBook2 = new Book(ISBN, bookTitle, authorName, publicationYear);

    expect(testBook1.hashCode()).toBe(testBook2.hashCode());
  });

  test("Additional Testing of equals Method", () => {
    const ISBN = "1234567890";
    const ISBN2 = "12345678901";
    const publicationYear = 2000;
    const publicationYear2 = 2002;
    const bookTitle = "Web Development";
    const authorName = "Darshil";
    const testBook1 = new Book(ISBN, bookTitle, authorName, publicationYear);
    const testBook2 = new Book(ISBN, bookTitle, authorName, publicationYear);
    const testBook3 = new Book(
      ISBN2,
      "other book",
      "demo name",
      publicationYear2
    );

    expect(testBook1.equals(null)).toBe(false);
    expect(testBook1.equals(testBook3)).toBe(false);
    expect(testBook1.equals({})).toBe(false);
    expect(testBook1.equals(testBook2)).toBe(true);
    expect(testBook1.equals(testBook1)).toBe(true);
  });
});
