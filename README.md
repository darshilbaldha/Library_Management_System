# Library Management TDD (Incubyte)

Welcome to my solution for the Library Management Kata! This repository showcases the use of Test-Driven Development (TDD) to solve a programming problem, emphasizing small, incremental commits and clear, concise code.

## Table of Contents
- [Problem Statement](#problem-statement)
- [Requirements](#requirements)
- [Solution](#solution)
- [Features](#features)
- [Setup Instructions](#setup-instructions)

## Problem Statement

Create a simple library management system that allows users to perform basic operations such as adding books, borrowing books, returning books, and viewing available books.

### Requirements

- **Add Books**:
  - Users should be able to add new books to the library.
  - Each book should have a unique identifier (e.g., ISBN), title, author, and publication year.

- **Borrow Books**:
  - Users should be able to borrow a book from the library.
  - The system should ensure that the book is available before allowing it to be borrowed.
  - If the book is not available, the system should raise an appropriate error.

- **Return Books**:
  - Users should be able to return a borrowed book.
  - The system should update the availability of the book accordingly.

- **View Available Books**:
  - Users should be able to view a list of all available books in the library.

For a detailed problem statement and requirements, [click here](Problem%20Statement.md).

## Solution

This project follows TDD principles to solve the kata problem. The solution is built with small, incremental commits, ensuring that each feature is developed and tested in isolation, demonstrating effective TDD practices.


### Features

	•	Add Books: Seamlessly add new books to the library.[book, user validation, register user if not registred previously]
	•	Borrow Books: Allow users to borrow books while maintaining proper records.[restrict max book borrowing to two, restrict single copy for single user]
	•	Return Books: Track the return of borrowed books.[verify user, book combination]
	•	User Management: Manage library users effectively.[register users]


### Setup instructions
1. Open your terminal or command prompt.
2. Run the following command to clone the repository:

    ```bash
    git clone https://github.com/darshilbaldha/Library_Management_System.git
    ```

3. Navigate into the project directory:

    ```bash
    cd Library_Management
    ```

4. Install dependencies

   ```bash
   npm install
   ```

5. Running Tests
   ```bash
   npm test
   ```   