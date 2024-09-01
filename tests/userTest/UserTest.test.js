import User from "../../src/assessment/incubyte/user/User";

describe("User Tests", () => {
  test("User constructor should throw an error if no arguments are passed", () => {
    expect(() => new User()).toThrow(
      "User Can't be Created Without Initial Data"
    );
  });

  test("User constructor should throw an error if name is null", () => {
    expect(() => new User(null)).toThrow(
      "User name must contain at least 4 characters"
    );
  });

  test("User constructor should throw an error if name is less than 4 characters", () => {
    expect(() => new User("abc")).toThrow(
      "User name must contain at least 4 characters"
    );
  });

  test("User constructor should return a non-null object with a valid name", () => {
    const testUser = new User("Darshil");
    expect(testUser).not.toBeNull();
    expect(testUser.getName()).toBe("Darshil")
  });

   test("Testing initialization of object with functionalities", () => {
    const usrName = "Darshil";
    const testUser = new User(usrName);
    expect(testUser).not.toBeNull();
    expect(testUser.getName()).toBe(usrName);
    expect(testUser.getUserId()).not.toBe(0);
    expect(testUser.getUserId()).not.toBeNull();
  });
});
