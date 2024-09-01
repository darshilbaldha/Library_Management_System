import Library from "../../src/assessment/incubyte/library/Library";
import User from "../../src/assessment/incubyte/user/User";
import Book from "../../src/assessment/incubyte/book/Book";
import DemoTestBookObjectStore from "../bookTest/DemoTestBookObjectStore";
import DemoTestUserObjectStore from "../userTest/DemoTestUserObjectStore";
import BookNotAvailableException from "../../src/assessment/incubyte/exception/BookNotAvailableException";
import InvalidBookException from "../../src/assessment/incubyte/exception/InvalidBookException";
import InvalidUserException from "../../src/assessment/incubyte/exception/InvalidUserException";
import LibraryInitialisationException from "../../src/assessment/incubyte/exception/LibraryInitialisationException";
import IllegalArgumentException from "../../src/assessment/incubyte/exception/IllegalArgumentException";
import BorrowLimitExceededException from "../../src/assessment/incubyte/exception/BorrowLimitExceededException";
import InvalidReturnAttemptException from "../../src/assessment/incubyte/exception/InvalidReturnAttemptException";

const libName1 = "New Library";
const libName2 = "Gujarat University Library";

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
    const libName = libName1;
    const lib = new Library(libName);
    expect(lib.getName()).toBe(libName);
  });

  test("should throw LibraryInitialisationException with multiple arguments", () => {
    expect(
      () => new Library(libName1, libName2)
    ).toThrow(LibraryInitialisationException);
  });

  test("Testing Initialization Of Object with getName Function", () => {
    const libName = libName1;
    const lib = new Library(libName);
    expect(lib).not.toBeNull();
    expect(lib.getName()).toBe(libName);
  });

  test("Test That addBook Method returns true when a new book is added to library", () => {
    const libName = libName1;
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
  });

  test("Test That getAvlBooks Method returns empty array when there are no books in the library", () => {
    const libName = libName1;
    const lib = new Library(libName);
    expect(lib.getAvlBooks()).toEqual([]);
  });

  test("addBook method should add the book and only that book to the library in order", () => {
    const libName = libName1;
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
    const avlBooks = lib.getAvlBooks();
    expect(avlBooks.length).toBe(1);
    expect(avlBooks[0]).toEqual(testBook);
  });

  test("should throw InvalidBookException if addBook is called with null book", () => {
    const lib = new Library(libName1);
    const usr = new User("Darshil");
    expect(() => lib.addBook(null, usr)).toThrow(InvalidBookException);
  });

  test("should throw InvalidUserException if addBook is called with null user", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    expect(() => lib.addBook(testBook, null)).toThrow(InvalidUserException);
  });

  test("should throw InvalidUserException when borrowBook is called with null user", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    expect(() => lib.borrowBook(testBook, null)).toThrow(InvalidUserException);
  });

  test("addBook method should not add duplicate books again", () => {
    const libName = libName1;
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
    expect(lib.getAvlBooks()[0]).toEqual(testBook);
  });

  test("addBook method should register a user if not registered previously", () => {
    const lib = new Library(libName1);
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
    const userList = lib.getRegisteredUsers();
    expect(userList.has(usr)).toBe(true);
  });

  test("should throw InvalidBookException when borrowBook is called with null book", () => {
    const lib = new Library(libName1);
    const usr = new User("Darshil");
    expect(() => lib.borrowBook(null, usr)).toThrow(InvalidBookException);
  });

  test("should throw IllegalArgumentException when borrowBook is called with null book and user", () => {
    const lib = new Library(libName1);
    expect(() => lib.borrowBook(null, null)).toThrow(IllegalArgumentException);
  });

  test("should throw BookNotAvailableException when borrowBook is called with empty bookContainer", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BookNotAvailableException
    );
  });

  test("borrowBook method should decrement book count by 1 when called with proper parameters", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    lib.addBook(testBook, usr);
    lib.borrowBook(testBook, usr);
    const bookContainer = lib.bookContainer;
    expect(bookContainer.get(testBook)).toBe(0);
  });

  test("borrowBook method does not decrement book count when count is already zero", () => {
    const libName = libName1;
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
    const bookContainer = lib.bookContainer;
    expect(bookContainer.get(testBook)).toBe(1);
    lib.borrowBook(testBook, usr);
    expect(bookContainer.get(testBook)).toBe(0);
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BookNotAvailableException
    );
  });

  test("borrowBook method registers a user and only that user if not registered previously", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    const borrower = new User("Borrower");
    lib.addBook(testBook, usr);
    lib.borrowBook(testBook, borrower);
    const userCollection = lib.getRegisteredUsers();
    expect(userCollection.has(borrower)).toBe(true);
  });

  test("borrowBook method logs successful borrowing (logging user & book)", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    lib.addBook(testBook, usr);
    lib.borrowBook(testBook, usr);
    const borrowedBooksRecord = lib.getBorrowedBooksRecord();
    expect(borrowedBooksRecord.has(usr)).toBe(true);
    expect(borrowedBooksRecord.get(usr)).toContain(testBook);
  });

  test("Test that borrowBook method limits the max borrowing numbers to specified value", () => {
    const lib = new Library(libName1);
    const testBook1 = new Book(
      "1234567890",
      "Web Development 1",
      "Ian Goodfellow",
      2000
    );
    const testBook2 = new Book(
      "1234567891",
      "Web Development 2",
      "Ian Goodfellow",
      2000
    );
    const testBook3 = new Book(
      "1234567892",
      "Web Development 3",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    lib.addBook(testBook1, usr);
    lib.addBook(testBook2, usr);
    lib.addBook(testBook3, usr);
    lib.borrowBook(testBook1, usr);
    lib.borrowBook(testBook2, usr);
    expect(() => lib.borrowBook(testBook3, usr)).toThrow(
      BorrowLimitExceededException
    );
  });

  test("returnBook method throws expected exceptions for invalid scenarios", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    expect(() => lib.returnBook(testBook, null)).toThrow(InvalidUserException);
    expect(() => lib.returnBook(null, usr)).toThrow(InvalidBookException);
    expect(() => lib.returnBook(null, null)).toThrow(IllegalArgumentException);
  });

  test("Test That returnBook Method Throws InvalidReturnAttemptException with Invalid User Or Book", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const unregBook = new Book(
      "12345678901",
      "Web Development 2",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    const unregUser = new User("Unregistered User");
    lib.addBook(testBook, usr);
    expect(() => lib.returnBook(unregBook, usr)).toThrow(
      InvalidReturnAttemptException
    );
    expect(() => lib.returnBook(testBook, unregUser)).toThrow(
      InvalidReturnAttemptException
    );
    expect(() => lib.returnBook(unregBook, unregUser)).toThrow(
      InvalidReturnAttemptException
    );
  });

  test("should allow only a single copy of any book to be borrowed by a single user", () => {
    const lib = new Library(libName1);
    const testBook = new Book(
      "1234567890",
      "Web Development",
      "Ian Goodfellow",
      2000
    );
    const usr = new User("Darshil");
    lib.addBook(testBook, usr);
    lib.borrowBook(testBook, usr);
    expect(() => lib.borrowBook(testBook, usr)).toThrow(
      BookNotAvailableException
    );
  });

  test("should accept book object and ISBN for borrowing books", () => {
    const libName = libName1;
    const lib = new Library(libName);
    const usr = DemoTestUserObjectStore.getUserObject(4);
    const testBook = DemoTestBookObjectStore.getBookObject(6);
    lib.addBook(testBook, usr);
    expect(lib.borrowBook(testBook, usr)).toBe(true);
    lib.returnBook(testBook, usr);
    expect(lib.borrowBook(testBook.getISBN(), usr)).toBe(true);
  });

  test("throws InvalidBookException if parameters passed are other than ISBN or Book type", () => {
    const lib = new Library("libName1");
    const usr = DemoTestUserObjectStore.getUserObject(4);
    const testBook = DemoTestBookObjectStore.getBookObject(6);
    lib.addBook(testBook, usr);
    expect(() => lib.borrowBook({}, usr)).toThrowError(
      new InvalidBookException("Book Parameter Is Either Null Or Invalid")
    );
  });
});
