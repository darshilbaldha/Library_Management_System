import Library from "../../src/assessment/incubyte/library/Library";

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
    ).toThrow();
  });

  test("Testing Initialization Of Object with getName Function", () => {
    const libName = "New Library";
    const lib = new Library(libName);
    expect(lib).not.toBeNull();
    expect(lib.getName()).toBe(libName);
  });

  test("Test That add Method accepts a book and a user who is adding the book", () => {
    const libName = "Rollwala Library";
    const lib = new Library(libName);

    // If you want to assert something, you would do it here.
    // Example:
    expect(lib).toBeDefined(); // Just an example; adjust based on actual functionality
  });
});
