class UnsupportedOperationException extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedOperationException";
    }
}

class Library {
    constructor() {
        throw new UnsupportedOperationException("Default constructor is not supported.");
    }
}

export default Library;
