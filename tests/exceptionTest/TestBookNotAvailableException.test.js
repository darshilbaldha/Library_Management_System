import BookNotAvailableException from "../../src/assessment/incubyte/exception/BookNotAvailableException"
describe("BookNotAvailableException Tests", () => {
  test("BookNotAvailableException constructor should throw an error if no arguments are passed", () => {
    expect(() => new BookNotAvailableException()).toThrow(
      "BookNotAvailableException Can't be Created Without Details"
    );
  });

  test("BookNotAvailableException constructor should throw an error if null argument is passed", () => {
    expect(() => new BookNotAvailableException(null)).toThrow(
      "BookNotAvailableException Can't be Created Without Details"
    );
  });
});
