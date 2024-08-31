class Library {
    constructor(...args) {
        if (args.length === 0) {
            throw new Error("Library Can't be Created Without Name");
        }

        if (args.length === 1 && typeof args[0] === 'string') {
            const libName = args[0];
            if (libName.length < 4) {
                throw new Error("Library name must be at least 4 characters long");
            } else {
                this.libName = libName;
            }
        } else if (args.length > 1) {
            throw new Error("Constructor should be called with only one argument");
        }
    }
}

export default Library;
