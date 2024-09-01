class InvalidUserException extends Error {
    constructor(errMsg) {
      super(errMsg);
      this.name = "InvalidUserException";
    }
  }
  
  export default InvalidUserException;
  