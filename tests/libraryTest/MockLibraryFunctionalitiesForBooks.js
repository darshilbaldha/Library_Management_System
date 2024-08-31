import LibraryFunctionalitiesForBook from "../../src/assessment/incubyte/library/LibraryFunctionalitiesForBook";

class MockLibraryFunctionalitiesForBook extends LibraryFunctionalitiesForBook {
  addBook(book, usr) {
    // Mocking to return true always
    return true;
  }

  borrowBook(usr) {
    // Mocking to return true always
    return true;
  }

  returnBook(book, usr) {
    // Mocking to return true always
    return true;
  }

  showAvlBook() {
    // Mocking to return an empty array
    const bookList = [];
    return bookList;
  }
}

export default MockLibraryFunctionalitiesForBook;
