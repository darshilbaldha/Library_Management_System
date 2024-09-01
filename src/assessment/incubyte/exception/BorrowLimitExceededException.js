class BorrowLimitExceededException extends Error {
  constructor(message) {
    super(message);
    this.name = "BorrowLimitExceededException";
  }
}
  
  export default BorrowLimitExceededException;
  