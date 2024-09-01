import Library from "../../src/assessment/incubyte/library/Library";
import User from "../../src/assessment/incubyte/user/User";
import Book from "../../src/assessment/incubyte/book/Book";

describe("Library Tests", () => {
  test("Library constructor should throw an error if no arguments are passed", () => {
    expect(() => new Library()).toThrow(
      "Library Can't be Created Without Name"
    );
  });

  test("Library constructor should throw an error if name is less than 4 characters", () => {
    expect(() => new Library("abc")).toThrow(
      "Library name must be at least 4 characters long"
    );
  });

  test("Library constructor should return a non-null object with a valid name", () => {
    const lib = new Library("New Library");
    expect(lib).toBeDefined();
  });

  test("Library constructor should throw an error if multiple arguments are passed", () => {
    expect(
      () => new Library("New Library", "Gujarat University Library")
    ).toThrow("Constructor should be called with only one argument");
  });

  test("Testing Initialization Of Object with getName Function", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    expect(lib).not.toBeNull();
    expect(lib.getName()).toBe(libName);
  });

  test("Test That addBook Method returns true when a new book is added to library", () => {
    const libName = "New-Library";
    const lib = new Library(libName);

    const ISBN = [1234567890];
    const publicationYear = 2000 // JavaScript's Year.of equivalent
    const testBook = new Book(
      ISBN,
      "Web-Development",
      "lan-goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");
    expect(lib.addBook(testBook, usr)).toBe(true);
  });

  test("Test That getAvlBooks Method returns empty array when there are no books in the library", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    // Call getAvlBooks method
    const avlBooks = lib.getAvlBooks();

    // Assert that the result is an empty array
    expect(avlBooks).toEqual([]);
  });
});
