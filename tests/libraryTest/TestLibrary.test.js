import Library from "../../src/assessment/incubyte/library/Library";
import User from "../../src/assessment/incubyte/user/User";
import Book from "../../src/assessment/incubyte/book/Book";
import BookNotAvailableException from "../../src/assessment/incubyte/exception/BookNotAvailableException";
import InvalidBookException from "../../src/assessment/incubyte/exception/InvalidBookException";
import InvalidUserException from "../../src/assessment/incubyte/exception/InvalidUserException";
import LibraryInitialisationException from "../../src/assessment/incubyte/exception/LibraryInitialisationException";

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

  test('should throw LibraryInitialisationException with multiple arguments', () => {
    expect(() => new Library('New Library', 'Gujarat University Library')).toThrow(LibraryInitialisationException);
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

  test('should return false if addBook is called with null book', () => {
    const libName = "New Library";
    const lib = new Library(libName);
    const usr = new User("Darshil");
    expect(lib.addBook(null, usr)).toBe(false);
  });

  test('should return false if addBook is called with null user', () => {
    const libName = 'New Library';
    const lib = new Library(libName);
    const ISBN = '1234567890';
    const publicationYear = 2000;
    const testBook = new Book(ISBN, 'Web Development', 'Ian Goodfellow', publicationYear);
    expect(lib.addBook(testBook, null)).toBe(false);
  });

  test('should throw InvalidUserException when borrowBook is called with null user', () => {
    const libName = 'New Library';
    const lib = new Library(libName);
    const ISBN = '1234567890';
    const publicationYear = 2000;
    const testBook = new Book(ISBN, 'Web Development', 'Ian Goodfellow', publicationYear);
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



  test('should throw InvalidBookException when borrowBook is called with null book', () => {
    const libName = 'New Library';
    const lib = new Library(libName);
    const usr = new User('Biswojit');
    expect(() => lib.borrowBook(null, usr)).toThrow(InvalidBookException);
  });

  test('should throw IllegalArgumentException when borrowBook is called with null book and user', () => {
    const libName = 'New Library';
    const lib = new Library(libName);
    expect(() => lib.borrowBook(null, null)).toThrow(IllegalArgumentException);
  });

  test('should throw BookNotAvailableException when borrowBook is called with empty bookContainer', () => {
    const libName = 'New Library';
    const lib = new Library(libName);
    const ISBN = '1234567890';
    const publicationYear = 2000;
    const testBook = new Book(ISBN, 'Web Development', 'Ian Goodfellow', publicationYear);
    const usr = new User('Biswojit');
    expect(() => lib.borrowBook(testBook, usr)).toThrow(BookNotAvailableException);
  });
});
