import MockLibraryFunctionalitiesForBook from "./MockLibraryFunctionalitiesForBooks";
import Book from "../../src/assessment/incubyte/Book/Book";
import User from "../../src/assessment/incubyte/user/User";

describe("LibraryFunctionalitiesForBook Tests", () => {
  test("initial Test For Methods defined Library Functionalities Interface", () => {
    const testFunc = new MockLibraryFunctionalitiesForBook();
    const testUser = new User("Darshil");
    
    const ISBN = "1234567890"; 
    const publicationYear = 2000;
    const testBook = new Book(ISBN, "Deep Learning", "Ian Goodfellow", publicationYear);

    expect(testFunc.addBook(testBook, testUser)).toBe(true);
    expect(testFunc.borrowBook(testUser)).toBe(true);
    expect(testFunc.returnBook(testBook, testUser)).toBe(true);
    expect(testFunc.getAvlBooks()).toEqual([]);
  });
});
