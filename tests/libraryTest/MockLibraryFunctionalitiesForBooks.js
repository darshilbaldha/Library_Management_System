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
    // Mocking to return "OK" always
    return "OK";
  }
}

export default MockLibraryFunctionalitiesForBook;
