// ex2

// const calculator = function(a,b,operator){
//    if(operator === '+'){
//        return a + b
//    } 
//    if(operator === '*'){
//        return a * b
//    } 
//    if(operator === '/'){
//        return a / b
//    } 
//    if(operator === '-'){
//        return a - b
//    } 
   
// }

// const array = {
//    a: '',
//    b: '',
//    operator: ''
// }
// const finish = calculator.apply(array,[2,5,'*'])
// console.log(finish);





// ex3


// const array = [
//    {name:'vlad',age:17},
//    {name:'oleg',age:22}
// ]
// const arrayOlder = array.filter((Number)=>{

//    return Number.age > 18;
// }
// );

// const keys = array.map(function (name) {
//    return name.name
// });

// console.log(keys);

// console.log(arrayOlder);



// ex1

// const person = {
//    name: 'vlad',
//    age: 20
// }

// const printInfo = function(){
// return person
// }



// const finish = function(){
//  return  printInfo.call(person)
// }




// console.log(finish());




// ex  5
// const arr = [423, 2, -12, 4, 1423, 2, 5];


// function sortAsc(arr) {
//   return arr.sort((a, b) => a - b);
// }

// function unique(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) === index);
// }


// function uniqueSorted(arr) {
//   return sortAsc(unique(arr));
// }



// const uniqueSortedArr = uniqueSorted(arr);

// console.log(uniqueSortedArr);




// ex4


// const Person = {
//   name: 'Vlad',
//   age: 25,
//   fullName: 'Yanko'
// } 
 
// function setPersonFullName(str){

//   console.log(1,Person.fullName);

//     function setFullName(obj){

//    obj.fullName = str;

//    console.log(2,Person.fullName)

//    return obj.fullName;
//   }
//   setFullName(Person)
// }

// setPersonFullName.bind(Person)("John Smith")