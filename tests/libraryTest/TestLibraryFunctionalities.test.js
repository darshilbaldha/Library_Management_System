import MockLibraryFunctionalities from "./MockLibraryFunctionalities";

describe("LibraryFunctionalities Tests", () => {
  test("initial Test For Methods defined in LibraryFunctionalities", () => {
    const testFunc = new MockLibraryFunctionalities();

    expect(testFunc.addBook()).toBe(true);
    expect(testFunc.borrowBook()).toBe(true);
    expect(testFunc.returnBook()).toBe(true);
    expect(testFunc.showAvlBook()).toBe("OK");
  });
});
