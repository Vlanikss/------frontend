// ex1

const wordStart = prompt('введите');
    let wordEnd = '';
    for (let i = wordStart.length - 1; i >= 0; i -= 1) {
        wordEnd += wordStart[i];
    }
    if(wordStart == wordEnd){
        console.log(`Слово ${wordStart} является палиндромом`);
        
    }else{
        console.log(`Слово ${wordStart} не является палиндромом`);  
    }
    



//ex 2
// const arr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know' ];
// const uniqueArr = new Set(arr)
// console.log(uniqueArr);

//ex 3
//  let number = +prompt('Введите число')
//  let arr = [];

//  for(let i = 0;i<=number;i+=1){
//     arr.push(i)
//  }
 
//  console.log(arr);

 
//ex 5
//  let arrValues = []
// const obj = {
//         some: 'some',
//         dom: 'text',
//         arr: [1, 2, 3, 4, 5],
//         tom: 'there'
//     };
//     for(let i in obj){

//         if(Array.isArray(obj[i])){
//         for(let j = 0 ;j<= obj[i].length; j++){
//             arrValues.push(obj[i][j])
//         }
//         }else{arrValues.push(obj[i])}
//     }
// console.log(arrValues);


//ex 4
// const boardSize = 3; 
// const board = [];

// for (let i = 0; i < boardSize; i++) {
//     const row = [];
//     for (let j = 0; j < boardSize; j++) {
//         row.push(Math.random() < 0.5 ? 'X' : 'O');
//     }
//     board.push(row);
//     console.log(board[i].join(' '))
// }