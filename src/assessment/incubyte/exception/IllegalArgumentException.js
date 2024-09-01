class IllegalArgumentException extends Error {
    constructor(errMsg) {
      super(errMsg);
      this.name = "IllegalArgumentException";
    }
  }
  
  export default IllegalArgumentException;
  