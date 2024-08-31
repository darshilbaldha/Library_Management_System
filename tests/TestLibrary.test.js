// Import the Library class
import Library from "../src/assessment/incubyte/Library";

// Describe the test suite
describe('TestLibrary', () => {
    // Define the test case
    test('Constructor should throw an error with no arguments', () => {
        expect(() => new Library()).toThrow("Default constructor is not supported.");
    });
});
