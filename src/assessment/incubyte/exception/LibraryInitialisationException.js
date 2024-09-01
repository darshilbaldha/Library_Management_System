class LibraryInitialisationException extends Error {
    constructor(errMsg) {
      super(errMsg);
      this.name = "LibraryInitialisationException";
    }
  }
  
  export default LibraryInitialisationException;
  