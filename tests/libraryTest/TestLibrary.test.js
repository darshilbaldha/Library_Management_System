import Library from "../../src/assessment/incubyte/library/Library";
import User from "../../src/assessment/incubyte/user/User";
import Book from "../../src/assessment/incubyte/book/Book";
import BookNotAvailableException from "../../src/assessment/incubyte/exception/BookNotAvailableException";
import InvalidBookException from "../../src/assessment/incubyte/exception/InvalidBookException";
import InvalidUserException from "../../src/assessment/incubyte/exception/InvalidUserException";
import LibraryInitialisationException from "../../src/assessment/incubyte/exception/LibraryInitialisationException";
import IllegalArgumentException from "../../src/assessment/incubyte/exception/IllegalArgumentException";
import BorrowLimitExceededException from "../../src/assessment/incubyte/exception/BorrowLimitExceededException";

describe("Library Tests", () => {
  test("should throw LibraryInitialisationException with no arguments", () => {
    expect(() => new Library()).toThrow(LibraryInitialisationException);
  });

  test("should throw LibraryInitialisationException with null name argument", () => {
    expect(() => new Library(null)).toThrow(LibraryInitialisationException);
  });

  test("should throw LibraryInitialisationException with name length less than 4", () => {
    expect(() => new Library("abc")).toThrow(LibraryInitialisationException);
  });

  test("should create Library with valid name", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    expect(lib.getName()).toBe(libName);
  });

  test("should throw LibraryInitialisationException with multiple arguments", () => {
    expect(
      () => new Library("New Library", "Gujarat University Library")
    ).toThrow(LibraryInitialisationException);
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
    const publicationYear = 2000;
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

  test("should throw InvalidBookException if addBook is called with null book", () => {
    const lib = new Library("New Library");
    const usr = new User("Darshil");

    // Expect addBook to throw InvalidBookException when the book is null
    expect(() => lib.addBook(null, usr)).toThrow(InvalidBookException);
  });

  test("should throw InvalidUserException if addBook is called with null user", () => {
    const lib = new Library("New Library");
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );

    // Expect addBook to throw InvalidUserException when the user is null
    expect(() => lib.addBook(testBook, null)).toThrow(InvalidUserException);
  });

  test("should throw InvalidUserException when borrowBook is called with null user", () => {
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
    expect(() => lib.borrowBook(testBook, null)).toThrow(InvalidUserException);
  });

  test("should throw InvalidUserException when borrowBook is called with null user", () => {
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
    expect(() => lib.borrowBook(testBook, null)).toThrow(InvalidUserException);
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

  test("should throw InvalidBookException when borrowBook is called with null book", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    const usr = new User("Darshil");
    expect(() => lib.borrowBook(null, usr)).toThrow(InvalidBookException);
  });

  test("should throw IllegalArgumentException when borrowBook is called with null book and user", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    expect(() => lib.borrowBook(null, null)).toThrow(IllegalArgumentException);
  });

  test("should throw BookNotAvailableException when borrowBook is called with empty bookContainer", () => {
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
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BookNotAvailableException
    );
  });

  test("borrowBook method should decrement book count by 1 when called with proper parameters", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Adjust as needed
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );
    const usr = new User("Darshil");

    lib.addBook(testBook, usr);
    // Access the private bookContainer property via reflection-like approach
    const bookContainer = lib.bookContainer;

    expect(bookContainer.has(testBook)).toBe(true);
    expect(bookContainer.get(testBook)).toBe(1);

    expect(() => lib.borrowBook(testBook, usr)).not.toThrow();
    expect(bookContainer.get(testBook)).toBe(0);
  });

  test("borrowBook method does not decrement book count when count is already zero", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    const ISBN = "1234567890";
    const publicationYear = 2000; // Assume the publication year is just a number for simplicity
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );
    const usr = new User("Darshil");
    lib.addBook(testBook, usr);
    const bookContainer = lib.bookContainer;
    expect(bookContainer.get(testBook)).toBe(1);
    lib.borrowBook(testBook, usr);
    expect(bookContainer.get(testBook)).toBe(0);
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BookNotAvailableException
    );
  });
  test("borrowBook method registers a user and only that user if not registered previously", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Assuming Year.of() is not necessary in JS
    const testBook = new Book(
      ISBN,
      "Web Development",
      "Ian Goodfellow",
      publicationYear
    );

    const usr = new User("Darshil");
    const borrower = new User("Borrower");
    const otherUser = new User("other user");

    expect(lib.addBook(testBook, usr)).toBe(true);
    expect(lib.borrowBook(testBook, borrower)).toBe(true);

    // Access private field (assuming you have a method to expose it)
    const userCollection = lib.getRegisteredUsers(); // You need to implement this method if not available

    expect(userCollection.has(borrower)).toBe(true);
    expect(userCollection.has(otherUser)).toBe(false);
  });

  test("borrowBook method logs successful borrowing (logging user & book)", () => {
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

    lib.addBook(testBook, usr);
    lib.borrowBook(testBook, usr);

    const borrowedBooksRecord = lib.getBorrowedBooksRecord(); // Assumes you have a getter for borrowedBooksRecord

    expect(borrowedBooksRecord.has(usr)).toBe(true);
    expect(borrowedBooksRecord.get(usr)).toContain(testBook);
  });
  test("borrowBook method limits the max borrowing numbers to specified value", () => {
    const libName = "Rollwala Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000;
    const testBook = new Book(
      ISBN,
      "Deep Learning",
      "Ian Goodfellow",
      publicationYear
    );
    const usr = new User("Biswojit");

    const maxBooksAllowedToBorrow = lib.getMaxBooksAllowedToBorrow();

    // Add books to the library
    for (let i = 0; i < maxBooksAllowedToBorrow + 2; i++) {
      lib.addBook(testBook, usr);
    }

    // Borrow books until the limit is reached
    for (let i = 0; i < maxBooksAllowedToBorrow; i++) {
      lib.borrowBook(testBook, usr);
    }

    // Expect an exception to be thrown when borrowing exceeds the limit
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BorrowLimitExceededException
    );
  });

  test("returnBook method throws exceptions for invalid arguments", () => {
    const libName = "New Library";
    const lib = new Library(libName);

    const ISBN = "1234567890";
    const publicationYear = 2000; // Adjust as needed
    const testBook = new Book(
      ISBN,
      "WEb Development",
      "Ian Goodfellow",
      publicationYear
    );
    const usr = new User("Darshil");

    // Check for InvalidUserException when user is null
    expect(() => lib.returnBook(testBook, null)).toThrow(InvalidUserException);

    // Check for InvalidBookException when book is null
    expect(() => lib.returnBook(null, usr)).toThrow(InvalidBookException);

    // Check for IllegalArgumentException when both parameters are null
    expect(() => lib.borrowBook(null, null)).toThrow(IllegalArgumentException);
  });
});
