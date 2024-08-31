import User from "../../src/assessment/incubyte/user/User";

describe("User Tests", () => {
  test("User constructor should throw an error if no arguments are passed", () => {
    expect(() => new User()).toThrow(
      "User Can't be Created Without Initial Data"
    );
  });

  test("User constructor should throw an error if name is null", () => {
    expect(() => new User(null)).toThrow(
      "User name cannot be null"
    );
  });

  test("User constructor should throw an error if name is less than 4 characters", () => {
    expect(() => new User("abc")).toThrow(
      "User name must be at least 4 characters long"
    );
  });

  test("User constructor should return a non-null object with a valid name", () => {
    const testUser = new User("Biswojit");
    expect(testUser).not.toBeNull();
  });

  test("User constructor should throw an error if multiple arguments are passed", () => {
    expect(() => new User("Biswojit", "Other User")).toThrow(
      "User constructor accepts only one argument"
    );
  });

  test("Testing initialization of object with getName function", () => {
    const usrName = "Rollwala User";
    const testUser = new User(usrName);
    expect(testUser).not.toBeNull();
    expect(testUser.getName()).toBe(usrName);
  });
});
