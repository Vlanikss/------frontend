class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      console.log(`Привет, меня зовут ${this.name}, мне ${this.age} лет.`);
    }
  
    haveBirthday() {
      this.age++;
      console.log(`С днём рождения, ${this.name}! Теперь вам ${this.age} лет.`);
    }
  }
  
  const person1 = new Person('Алексей', 30);
  person1.greet();
  person1.haveBirthday();
  
  const person2 = new Person('Мария', 25);
  person2.greet();
  