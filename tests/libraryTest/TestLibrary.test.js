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
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Year handling
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");
    expect(lib.addBook(testBook, usr)).toBe(true);
  });

  test("Test That getAvlBooks Method returns empty array when there are no books in the library", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const avlBooks = lib.getAvlBooks();

    expect(avlBooks).toEqual([]);
  });

  test("addBook method should add the book and only that book to the library in order", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Year handling
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");

    expect(lib.addBook(testBook, usr)).toBe(true);
    expect(lib.getAvlBooks().length).toBe(1);

    const avlBookList = lib.getAvlBooks();
    expect(avlBookList[0]).toEqual(testBook);
  });

  test("addBook method returns false if null is passed as the book argument", () => {
    const libName = "Rollwala Library";
    const lib = new Library(libName);

    const usr = new User("Biswojit");

    // Test that adding a null book returns false
    expect(lib.addBook(null, usr)).toBe(false);

    // Test that the available books list is empty
    const avlBookList = lib.getAvlBooks();
    expect(avlBookList).toEqual([]);
  });

  test("addBook method returns false if null is passed as the user argument", () => {
    const libName = "Rollwala Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Assuming how you handle years
    const testBook = new Book(
      ISBN,
      "Deep Learning",
      "Ian Goodfellow",
      publicationYear
    );

    // Test that adding a book with a null user returns false
    expect(lib.addBook(testBook, null)).toBe(false);

    // Test that the available books list is empty
    const avlBookList = lib.getAvlBooks();
    expect(avlBookList).toEqual([]);
  });

  test("addBook method should not add duplicate books again", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000;
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");

    expect(lib.addBook(testBook, usr)).toBe(true);
    expect(lib.addBook(testBook, usr)).toBe(true);

    expect(lib.getAvlBooks().length).toBe(1);

    const avlBookList = lib.getAvlBooks();
    expect(avlBookList[0]).toEqual(testBook);
  });

  test("addBook method should register a user if not registered previously", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000;
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");

    expect(lib.addBook(testBook, usr)).toBe(true);

    // Assuming Library class has a method getRegisteredUsers() to access userList
    const userList = lib.getRegisteredUsers();
    expect(userList.has(usr)).toBe(true);
  });

  test("Borrow book method throws IllegalArgumentException when called with null argument for user", () => {
    const lib = new Library("New Library");

    const testBook = new Book("1234567890", "Web Development", "Ian Goodfellow", 2000);

    expect(() => lib.borrowBook(testBook, null)).toThrow("User must not be null");
  });

  test("Borrow book method throws IllegalArgumentException when called with null argument for book", () => {
    const lib = new Library("New Library");

    const usr = new User("Darshil");

    expect(() => lib.borrowBook(null, usr)).toThrow("Book must not be null");
  });

  test("Borrow book method throws IllegalArgumentException when called with null argument for both book and user", () => {
    const lib = new Library("New Library");

    expect(() => lib.borrowBook(null, null)).toThrow("Book and User must not be null");
  });

});
