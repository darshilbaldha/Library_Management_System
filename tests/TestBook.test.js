import Book from "../src/assessment/incubyte/Book";

describe('Book Tests', () => {

    test('Book constructor should throw an error if no arguments are passed', () => {
        expect(() => new Book()).toThrow("UnsupportedOperationException");
    });

});
