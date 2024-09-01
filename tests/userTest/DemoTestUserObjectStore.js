import User from "../../src/assessment/incubyte/user/User";

// Define a class for the demo user object store
class DemoTestUserObjectStore {
  static userObjectList = [
    new User("Biswojit"),
    new User("Aarav"),
    new User("Ananya"),
    new User("Lakshmi"),
    new User("Rajesh"),
    new User("Meera"),
    new User("Vikram"),
    new User("Priya"),
    new User("Sahil"),
    new User("Nandini")
  ];

  // Method to get a User object by index
  static getUserObject(index) {
    if (index < 0 || index >= DemoTestUserObjectStore.userObjectList.length) {
      throw new Error("Index out of bounds");
    }
    return DemoTestUserObjectStore.userObjectList[index];
  }
}

export default DemoTestUserObjectStore;
