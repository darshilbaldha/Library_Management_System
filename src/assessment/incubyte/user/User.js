class User {
  static userCounter = 1000;
  constructor(userName) {
    if (arguments.length === 0) {
      throw new Error("User Can't be Created Without Initial Data");
    } else if (arguments.length > 1) {
      throw new Error("Constructor should be called with only one argument");
    } else if (!this.isNameValid(userName)) {
      throw new Error("User name must contain at least 4 characters");
    } else {
      this.userName = userName;
      this.userId = ++User.userCounter;
    }
  }

  isNameValid(userName) {
    return userName != null && userName.length >= 4;
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.userName;
  }
}

export default User;
