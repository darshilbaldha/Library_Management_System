import LibraryFunctionalities from "../../src/assessment/incubyte/Library/LibraryFunctionalities";

class MockLibraryFunctionalities extends LibraryFunctionalities {
  addBook() {
    // Mocking to return true always
    return true;
  }

  borrowBook() {
    // Mocking to return true always
    return true;
  }

  returnBook() {
    // Mocking to return true always
    return true;
  }

  showAvlBook() {
    // Mocking to return "OK" always
    return "OK";
  }
}

export default MockLibraryFunctionalities;
