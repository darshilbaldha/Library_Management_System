class Library {
  constructor(...args) {
    if (args.length === 0) {
      throw new Error("Library Can't be Created Without Name");
    }

    if (args.length === 1 && typeof args[0] === "string") {
      const libName = args[0];
      if (this.isNameValid(libName)) {
        this.libName = libName;
      } else {
        throw new Error("Library name must be at least 4 characters long");
      }
    } else if (args.length > 1) {
      throw new Error("Constructor should be called with only one argument");
    }
  }
  isNameValid(libName) {
    return libName !== null && libName.length >= 4;
  }

  getName() {
    return this.libName;
  }

  addBook(book, usr) {
    throw new Error("Method 'addBook' is not implemented");
  }

  borrowBook(usr) {
    throw new Error("Method 'borrowBook' is not implemented");
  }

  returnBook(book, usr) {
    throw new Error("Method 'returnBook' is not implemented");
  }

  showAvlBook() {
    throw new Error("Method 'showAvlBook' is not implemented");
  }
}

export default Library;
