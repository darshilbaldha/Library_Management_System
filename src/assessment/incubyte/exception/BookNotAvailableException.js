class BookNotAvailableException extends Error {
    constructor(unavailableBook) {
        super(`Sorry ${unavailableBook.getBookTitle()} is currently not available`);
        this.name = "BookNotAvailableException";
    }
}
