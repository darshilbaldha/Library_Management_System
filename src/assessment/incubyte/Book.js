class Book {
    constructor(ISBN, bookTitle, authorName, publicationYear) {
        if (arguments.length === 0) {
            throw new Error("Book Can't be Created Without Initial Data");
        }
        this.ISBN = ISBN;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.publicationYear = publicationYear;
    }
}

export default Book;
