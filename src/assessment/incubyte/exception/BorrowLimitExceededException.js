class BorrowLimitExceededException extends Error {
    constructor(errMsg) {
        super(errMsg);
        this.name = 'BorrowLimitExceededException';
    }
}

export default BorrowLimitExceededException;