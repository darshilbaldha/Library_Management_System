class InvalidBookException extends Error {
    constructor(errMsg) {
      super(errMsg);
      this.name = "InvalidBookException";
    }
  }
  
  export default InvalidBookException;
  