Array.prototype.myReduce = function (callback, initialValue) {
    let init = 0;
    let acc = initialValue === undefined ? 0 : initialValue;
    /*
    if (typeof callback === 'function') {
        for (let i = 0; i < this.length; i++) {
            acc = callback(acc, this[i], i, this);
        }
        return acc;
    } else {
        return new Error(callback + " is not a function");
    }
    */
    try {
        if (typeof callback === 'function') {
            for (let i = init; i < this.length; i++) {
                acc = callback(acc, this[i], i, this);
            }
            return acc;
        } else {
            throw new Error(callback + " is not a function");
        }
    } 
    catch(err) {
        return err;
    }
    
};

console.log(
  [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
    if (index % 2) {
      return acc + elem;
    }
    return acc;
  }, 0),
); // => 6
    
console.log(
  [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
    if (index % 2) {
      return acc + elem;
    }
    return acc;
  }),
); // => 6
    
console.log(
  [1, 2, 3, 4, 5].myReduce("Hello", 0),
); 
    
/*
Реализуйте функцию squareDigits, функция принимает число, 
вернуть функция должна также число, которое получается 
при конкатенировании возведенных в квадрат цифр переданного 
внутрь функции числа.
*/

function squareDigits(num) {
    return +(String(num).split('').map(x => String((+x) ** 2)).join(''));
}
console.log(squareDigits(9119)); // 9^2=81, 1^2=1 => 811181


/*
Дан массив строк arr.
Требуется написать функцию, которая принимает произвольную строку.
Функция должна проверить, существует ли как минимум два значения в
массиве, которые являются анаграммами к переданной в функцию строке,
если такие строки существуют, тогда функция должна вернуть первую
встретившуюся в массиве строку-анаграмму.
В случае если анаграмм в массиве менее 2, необходимо вернуть null.
*/
const arr = ['asfd', 'asd', 'dsa', '1nkil', 'asd', 'fhk', 'lfd', 'link', 'link1'];

const getFirstAnagram = (str) => {
    let letters = str.split('');
    let result;
    point: for (let i = 0; i < arr.length; i++) {
        if (str === arr[i]) continue;
        let l = arr[i].split('');
        if (l.length !== letters.length) continue;
        for (let j = 0; j < letters.length; j++) {
            let flag = false;
            for (let k = 0; k < l.length; k++) {
                if (letters[j] === l[k]) {
                    flag = true;
                    l.splice(k, 1);
                    if( j === letters.length - 1) return arr[i];
                }
            }
            if (!flag) continue point;
        }
    }
    return null;
};

console.log(getFirstAnagram('asd')); // "asd"
console.log(getFirstAnagram('link')); // null
console.log(getFirstAnagram('link1')); // "1nkil"

/*
Представьте что вы попали на собеседование в Гугл, так-вот у Гугла
очень крутая система защиты от взлома серверов. Каждый сервер
расположен на разном уровне от 0 к N, но не всё так просто чтобы
попасть на N уровень нужно пройти все N-1 уровней защиты. Ваша задача,
как собеседуемого, состоит в том чтобы получить все данные с i-го
уровня защиты.
*/
/*
function getDataFromSecurityNumber(arr, floor) {
    let result = [];
    let f = (arr, floor) => {
        if (floor === 0) return [];
        let flat_arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                flat_arr.push(...f(arr[i], floor - 1));
            } else flat_arr.push(arr[i]);
        }
        return flat_arr;
    }
    return f(arr, floor);
}
*/

function getDataFromSecurityNumber(arr, floor) {
    let result = [];
    
    let f = (arr, floor) => {
        let flat_arr = [];
        if (floor === 0) {
            for (let i = 0; i < arr.length; i++) {
                if (!Array.isArray(arr[i])) {
                    //flat_arr.push(...f(arr[i], floor - 1));
                    flat_arr.push(arr[i]);
                };
            }
            //return flat_arr;
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    flat_arr.push(...f(arr[i], floor - 1));
                };
            }
        }
        
        return flat_arr;
    }
    
    return f(arr, floor);
}

const arr_1 = [1, 2, 3, [4, 5], [6, [7]], [8, 9]];

console.log(getDataFromSecurityNumber(arr_1, 0)); // [1, 2, 3]
console.log(getDataFromSecurityNumber(arr_1, 1)); // [4, 5, 6, 8, 9]
console.log(getDataFromSecurityNumber(arr_1, 2)); // [7]
console.log(getDataFromSecurityNumber(arr_1, 3)); // []


/*
У программиста есть 25 вариантов кода, однако протестировать на одинаковых 
данных этот код не получится, входящие данные всегда разные. За один раз мы 
можем запустить только 5 вариантов кода одновременно с одними и теми же 
входящими параметрами, при этом, мы поймем какой вариант отработал первым, 
вторым, третьим, четвертым и пятым.
Какое минимальное количество запусков нам нужно сделать, чтобы определить топ-3 
самых быстрых вариантов кода?
Необходимо реализовать алгоритм для нахождения топ-3 быстрейших вариантов, 
нужно будет вывести порядковые номера вариантов кода.
*/
const testSpeed = (() => {
  const codeVariants = Array.from(
    {length: 25},
    (_, i) => ({number: i + 1, value: Math.floor(Math.random() * 1001)})
  ).reduce((acc, o) => (acc[o.number] = o.value, acc), {});
  /*
  const codeVariants = {
    1: 1,   2: 2,   3: 3,   4: 4,   5: 5,
    6: 6,   7: 7,   8: 8,   9: 9,   10: 10,
    11: 11, 12: 12, 13: 13, 14: 14, 15: 15,
    16: 16, 17: 17, 18: 18, 19: 19, 20: 20,
    21: 21, 22: 22, 23: 23, 24: 24, 25: 25,
  };
  */
  console.group('Code speeds');
  console.log(codeVariants);
  console.groupEnd();
  return arr => {
    if (arr.length !== 5 || arr.some(v => !Number.isInteger(v))) {
      throw TypeError('Array must contain 5 integers.');
    }
    if (new Set(arr).size !== arr.length) {
      throw TypeError('Array must contain different integers.');
    }
    if (arr.some(v => v > 25 || v < 1)) {
      throw TypeError('Array must contain integers in range [1, 25].');
    }
    return arr
      .map(number => ({number, value: codeVariants[number]}))
      .sort((a, b) => a.value - b.value)
      .map(o => o.number);
  };
})();



