class Car {
    constructor(brand, model, year) {
      this.brand = brand;
      this.model = model;
      this.year = year;
    }
  
    startEngine() {
      console.log(`${this.brand} ${this.model} завел двигатель.`);
    }
  
    stopEngine() {
      console.log(`${this.brand} ${this.model} выключил двигатель.`);
    }
  
    getInfo() {
      console.log(`Автомобиль: ${this.year} ${this.brand} ${this.model}`);
    }
  }
  
  class ElectricCar extends Car {
    constructor(brand, model, year, batteryCapacity) {
      super(brand, model, year);
      this.batteryCapacity = batteryCapacity;
    }
  
    charge() {
      console.log(`${this.brand} ${this.model} заряжается. Емкость батареи: ${this.batteryCapacity} кВт.`);
    }
  
    startEngine() {
      console.log(`${this.brand} ${this.model} бесшумно завел двигатель на электричестве.`);
    }
  }
  
  class SportsCar extends Car {
    constructor(brand, model, year, maxSpeed) {
      super(brand, model, year);
      this.maxSpeed = maxSpeed;
    }
  
    accelerate() {
      console.log(`${this.brand} ${this.model} ускоряется до ${this.maxSpeed} км/ч!`);
    }
  
    startEngine() {
      console.log(`${this.brand} ${this.model} заводит мощный двигатель!`);
    }
  }
  
  const car1 = new Car('Toyota', 'Camry', 2022);
  car1.getInfo();
  car1.startEngine();
  car1.stopEngine();
  
  const electricCar = new ElectricCar('Tesla', 'Model S', 2023, 100);
  electricCar.getInfo();
  electricCar.startEngine();
  electricCar.charge();
  electricCar.stopEngine();
  
  const sportsCar = new SportsCar('Ferrari', '488', 2021, 330);
  sportsCar.getInfo();
  sportsCar.startEngine();
  sportsCar.accelerate();
  sportsCar.stopEngine();
  