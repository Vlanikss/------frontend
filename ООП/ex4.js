class Book {
    constructor(title, author, year, genre) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.genre = genre;
      this.isAvailable = true;
    }
  
    getInfo() {
      console.log(`Книга: "${this.title}", Автор: ${this.author}, Год: ${this.year}, Жанр: ${this.genre}`);
    }
  
    borrow() {
      if (this.isAvailable) {
        this.isAvailable = false;
        console.log(`Книга "${this.title}" была взята.`);
      } else {
        console.log(`Книга "${this.title}" уже на руках.`);
      }
    }
  
    returnBook() {
      if (!this.isAvailable) {
        this.isAvailable = true;
        console.log(`Книга "${this.title}" была возвращена.`);
      } else {
        console.log(`Книга "${this.title}" не была взята.`);
      }
    }
  }
  
  class User {
    constructor(name, age, libraryCardNumber) {
      this.name = name;
      this.age = age;
      this.libraryCardNumber = libraryCardNumber;
      this.borrowedBooks = [];
    }
  
    borrowBook(book) {
      if (book.isAvailable) {
        book.borrow();
        this.borrowedBooks.push(book);
      } else {
        console.log(`${this.name} не может взять книгу "${book.title}". Книга недоступна.`);
      }
    }
  
    returnBook(book) {
      if (this.borrowedBooks.includes(book)) {
        book.returnBook();
        const index = this.borrowedBooks.indexOf(book);
        this.borrowedBooks.splice(index, 1);
      } else {
        console.log(`${this.name} не брал книгу "${book.title}".`);
      }
    }
  
    getInfo() {
      console.log(`Пользователь: ${this.name}, Возраст: ${this.age}, Номер читательского билета: ${this.libraryCardNumber}`);
    }
  }
  
  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
      this.users = [];
    }
  
    addBook(book) {
      this.books.push(book);
      console.log(`Книга "${book.title}" добавлена в библиотеку.`);
    }
  
    addUser(user) {
      this.users.push(user);
      console.log(`Пользователь ${user.name} зарегистрирован в библиотеке.`);
    }
  
    showBooks() {
      console.log(`Список книг в библиотеке:`);
      this.books.forEach(book => {
        console.log(`"${book.title}" - ${book.isAvailable ? 'Доступна' : 'Недоступна'}`);
      });
    }
  
    showUsers() {
      console.log(`Список пользователей библиотеки:`);
      this.users.forEach(user => user.getInfo());
    }
  }
  

  
  const library = new Library('Центральная библиотека');
  
  const book1 = new Book('1984', 'Джордж Оруэлл', 1949, 'Дистопия');
  const book2 = new Book('Мастер и Маргарита', 'Михаил Булгаков', 1967, 'Роман');
  const book3 = new Book('Скотный двор', 'Джордж Оруэлл', 1945, 'Аллегория');
  
  library.addBook(book1);
  library.addBook(book2);
  library.addBook(book3);
  
  const user1 = new User('Иван', 25, 'A12345');
  const user2 = new User('Мария', 30, 'B67890');
  
  library.addUser(user1);
  library.addUser(user2);
  
  library.showBooks();
  library.showUsers();
  
  user1.borrowBook(book1);  
  user1.borrowBook(book2);  
  user2.borrowBook(book1);  
  
  user1.returnBook(book1);
  user2.borrowBook(book1);  
  
  library.showBooks();
  