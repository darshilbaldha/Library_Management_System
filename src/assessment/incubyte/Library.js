class Library {
    constructor() {
        if (arguments.length === 0) {
            throw new Error("Library Can't be Created Without Name");
        }
    }
}

export default Library;
