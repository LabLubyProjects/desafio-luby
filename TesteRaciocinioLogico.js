/*
1) Implemente um método que crie um novo array baseado nos valores passados.
Entradas do método (3,a), Resultado do método: ['a', 'a', 'a']
*/

const createNewArray = (quantity, value) => {
  const newArray = [];
  for(let i=0; i<quantity; i++)
    newArray.push(value);
  return newArray;  
}

console.log(`1) Input: (3, 'a') => Output: [${createNewArray(3, 'a')}]`);

/*
2) Implemente um método que inverta um array, não utilize métodos nativos do array.
Entrada do método ([1,2,3,4]), Resultado do método: [4,3,2,1]
*/

const invertArray = (source) => {
  const invertedArray = [];
  for(let i=source.length-1; i>=0; i--)
    invertedArray.push(source[i]);
  return invertedArray;  
}

const input2 = [1,2,3,4];
console.log(`2) Input: [${input2}] => Output: [${invertArray(input2)}]`);

/*
3) Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null).
Entrada do método ([1,2,'', undefined]), Resultado do método: [1,2]
*/

const cleanse = (source) => {
  const cleanArray = [];
  for(let i=0; i<source.length-1; i++) {
    if(source[i])
      cleanArray.push(source[i]);
  }
  return cleanArray;
}

const input3 = [1,2,'', undefined, false, 0, null];
console.log(`3) Input: [1,2,'', undefined, false, 0, null] => Output: [${cleanse(input3)}]`);

/*
4) Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor.
Entrada do método ([["c",2],["d",4]]), Resultado do métdodo: {c:2, d:4}
*/

const convertToObject = (source) => {
  const obj = {};
  source.forEach(item => {
    obj[item[0]] = item[1]
  });
  return obj;
}

const input4 = [["c",2],["d",4]];
console.log(`4) Input: [${input4}] => Output: ${JSON.stringify(convertToObject(input4))}`);

/*
5) Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada.
Entrada do método ([5,4,3,2,5], 5,3), Resultado do método: [4,2]
*/

const filter = (source, ...filters) => {
  return source.filter(item => !filters.includes(item));
}

console.log(`5) Input: ([5,4,3,2,5], 5,3) => Output: [${filter([5,4,3,2,5], 5, 3)}]`);

/*
6) Implemente um método que retorne um array, sem valores duplicados.
Entrada do método ([1,2,3,3,2,4,5,4,7,3]), Resultado do método: [1,2,3,4,5,7]
*/

const removeDuplicates = (source) => {
  return source.filter((item, index, self) => self.indexOf(item) == index);
}

const input6 = [1,2,3,3,2,4,5,4,7,3];
console.log(`6) Input: [${input6}] => Output: [${removeDuplicates(input6)}]`);

/*
7) Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano.
Entrada do método ([1,2,3,4],[1,2,3,4]), Resultado do método: true
*/

const isEqual = (arrayOne, arrayTwo) => {
  if(arrayOne.length !== arrayTwo.length) return false;

  for(let i=0; i<arrayOne.length-1; i++)
    if(arrayOne[i]!==arrayTwo[i]) return false;

  return true;
}

const input7one = [1,2,3,4];
const input7two = [1,2,3,4];
console.log(`7) Input: ([${input7one}], ${input7two}) => Output: ${isEqual(input7one, input7two)}`);

/*
8) Implemente um método que remova os aninhamentos de um array de arrays para um array unico.
Entrada do método ([1, 2, [3], [4, 5]]), Resultado do método: [1, 2, 3, 4, 5]
*/

const removeNests = (source) => {
  const oneDimensionArray = [];

  for(const item of source) 
    Array.isArray(item) ? oneDimensionArray.push(removeNests(item)) : oneDimensionArray.push(item);

  return oneDimensionArray;
}

const input8 = [1, 2, [3], [4, 5]];
console.log(`8) Input: ([1, 2, [3], [4, 5]] => Output: [${removeNests(input8)}]`);

/*
9) Implemente um método divida um array por uma quantidade passada por parâmetro.
Entrada do método ([1, 2, 3, 4, 5], 2), Resultado do método: [[1, 2], [3, 4], [5]]
*/

const divide = (source, value) => {
  const dividedArray = [];

  for(let i=0; i<source.length; i+=value) {
    const miniArray = [];

    for(let j=i; j<i+value; j++) {
      if(source[j]) miniArray.push(source[j]);
    }
      
    dividedArray.push(miniArray);  
  }

  return dividedArray;
}

console.log(`9) Input: ([1, 2, 3, 4, 5], 2) => Output: ${JSON.stringify(divide([1, 2, 3, 4, 5], 2))}`);

/*
10) Implemente um método que encontre os valores comuns entre dois arrays.
Entrada do método ([6, 8], [8, 9]), Resultado do método: [8]
*/

const common = (arrayOne, arrayTwo) => {
  return arrayOne.filter(item => arrayTwo.includes(item));
}

const input10one = [6, 8];
const input10two = [8, 9];
console.log(`10) Input: ([${input10one}], ${input10two}) => Output: [${common(input10one, input10two)}]`);