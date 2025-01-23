class Shape {
    constructor(name) {
      this.name = name;
    }
  
    area() {
      throw "Метод area() должен быть переопределен в подклассе!";
    }
  
    perimeter() {
      throw "Метод perimeter() должен быть переопределен в подклассе!";
    }
  
    describe() {
      console.log(`Это фигура: ${this.name}.`);
    }
  }
  
  class Rectangle extends Shape {
    constructor(width, height) {
      super('Прямоугольник');
      this.width = width;
      this.height = height;
    }
  
    area() {
      return this.width * this.height;
    }
  
    perimeter() {
      return 2 * (this.width + this.height);
    }
  }
  
  class Circle extends Shape {
    constructor(radius) {
      super('Круг');
      this.radius = radius;
    }
  
    area() {
      return Math.PI * this.radius * this.radius;
    }
  
    perimeter() {
      return 2 * Math.PI * this.radius;
    }
  }
  
  const rectangle = new Rectangle(5, 10);
  rectangle.describe();
  console.log(`Площадь: ${rectangle.area()}`);
  console.log(`Периметр: ${rectangle.perimeter()}`);
  
  const circle = new Circle(7);
  circle.describe();
  console.log(`Площадь: ${circle.area()}`);
  console.log(`Периметр: ${circle.perimeter()}`);
  