import Book from "../../src/assessment/incubyte/book/Book";  

  class DemoTestBookObjectStore {
    static bookObjectList = [
      new Book('9780262035613', 'Introduction to Algorithms', 'Thomas H. Cormen', 2009),
      new Book('9780131103627', 'The C Programming Language', 'Brian W. Kernighan', 1988),
      new Book('9780201633610', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma', 1994),
      new Book('9780132350884', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 2008),
      new Book('9780201485677', 'Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 1999),
      new Book('9780134685991', 'Effective Java', 'Joshua Bloch', 2018),
      new Book('9780137903955', 'Artificial Intelligence: A Modern Approach', 'Stuart Russell', 2020),
      new Book('9781449355739', 'Fluent Python', 'Luciano Ramalho', 2015),
      new Book('9780321751041', 'Effective C++', 'Scott Meyers', 2005),
      new Book('9781491954249', 'Deep Learning with Python', 'François Chollet', 2017),
    ];
  
    static getBookObject(index) {
      return this.bookObjectList[index];
    }
  }
  
  export default DemoTestBookObjectStore;
  