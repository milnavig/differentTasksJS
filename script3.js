/* https://www.youtube.com/watch?v=KrOBpFwwlGQ */

// Четвертая задача

Array.prototype.except = function(el) {
    let new_arr = [];
    if (el.__proto__ === Array.prototype) {
        for (let i = 0; i < this.length; i++) {
            el.includes(i) ? null : new_arr.push(this[i]);
        }
    } else {
        for (let i = 0; i < this.length; i++) {
            (i === el) ? null : new_arr.push(this[i]);
        }
    }
    return new_arr;
}

console.log(['a', 'b', 'c', 'd', 'e'].except(3));
console.log(['a', 'b', 'c', 'd', 'e'].except([1, 3]));
console.dir(Array.__proto__);

// Пятая задача

const oFunc = (obj) => {
    for (let key in obj) {
        //let value = key.split('').reverse().join('');
        //obj[key] = value;
        obj[key] = key.split('').reverse().join('');
    }
    return obj;
}

console.log(oFunc({abc: undefined, cde: undefined, kgt: undefined}));

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(2 ** 53);

/*
Напишите функцию, replaceItems(arr, item, replaceItem) которая находит все
элементы массива arr, равные item и возвращает новый массив, в котором на
месте найденных значений стоит replaceItem.
*/

function replaceItems(arr, item, replaceItem) {
    return arr.map((el) => el === item ? replaceItem : el);
}

console.log(replaceItems([1,2,3,4,2], 2, 'a')); //  [1,'a',3,4,'a']

/*
Дан массив вида `[1, 2, [3,4,[5]], 6, 7, [[8]]]`, необходимо получить массив
без вложенных массивов, то есть: `[1, 2, 3, 4, 5, 6, 7, 8]`.
*/

function flatArr(arr) {
    // первый вариант
    //return arr.flat(2);
    
    // второй вариант
    let new_arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            new_arr.push(...flatArr(arr[i]));
        } else {
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}

console.log(flatArr([1, 2, [3, 4, [5]], 6, 7, [[8]]]));

/*
В функцию fillArr передается количество строк и количество колонок в массиве, 
необходимо реализовать функцию так, чтоб она возвращала заполненный массив 
размером rows*cols целыми инкрементируемыми числами идущими по спирали против
часовой стрелки.
*/

function fillArr(rows, cols) {
    let matrix = new Array(rows).fill(0).map(el => new Array(cols).fill('*'));
    //console.log(matrix);
    let count = 1, mi = 0, mj = 0;
    let direction = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (direction === 0) {
                if (mj === cols - 1 || matrix[mi][mj + 1] !== '*') {
                    direction = 1;
                    //mi--;
                    matrix[mi++][mj] = count++;
                } else {
                    matrix[mi][mj++] = count++;
                }
                
            } else if (direction === 1) {
                if (mi === rows - 1 || matrix[mi + 1][mj] !== '*') {
                    direction = 2;
                    //mj++;
                    matrix[mi][mj--] = count++;
                } else {
                    matrix[mi++][mj] = count++;
                }
                
            } else if (direction === 2) {
                if (mj === 0 || matrix[mi][mj - 1] !== '*') {
                    direction = 3;
                    //mi++;
                    matrix[mi--][mj] = count++;
                } else {
                    matrix[mi][mj--] = count++;
                } 
            } else if (direction === 3) {
                if (mi === 0 || matrix[mi - 1][mj] !== '*') {
                    direction = 0;
                    //mj--;
                    matrix[mi][mj++] = count++;
                } else {
                    matrix[mi--][mj] = count++;
                } 
            }
            
        }
    }
    return matrix;
}

/*
  [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ]
*/
console.log(fillArr(3, 3));

/*
  [
    [1,   2,  3, 4],
    [10, 11, 12, 5],
    [9,   8,  7, 6],
  ]
*/

console.log(fillArr(3, 4));


/*
В функцию checkMaxTime передается массив со значениями времени в которое звенит
каждый день будильник. Будильник звенит ровно одну минуту, необходимо найти самый 
большой промежуток времени, когда будильник звенеть не будет.
*/

function checkMaxTime(arr) {
    // поиск минимума
    /*
    let a = arr.map((time) => time.split(':')).map((time) => +time[0] * 60 + +time[1]);
    let min = Infinity;
    
    for (let i = 0; i < a.length; i++) {
        for (let j = i; j < a.length; j++) { 
            if (i !== j) {   
                if (Math.abs(a[i] - a[j]) - 1 < min) min = Math.abs(a[i] - a[j]) - 1;
            }
            
            if (Math.abs(3600 - a[i] + a[j])  - 1 < min) min = Math.abs(24*60 - a[i] + a[j])  - 1;
        }
    }

    return Math.floor(min / 60) + ':' + min % 60;
    */
    // поиск максимума
    
    let maxt = arr.map((time) => time.split(':')).map((time) => +time[0] * 60 + +time[1]).sort((t1, t2) => t1 - t2).reduce((max, t, i, arr) => {
        if (i !== arr.length - 1) {
            if (arr[i+1] - t - 1 > max) return arr[i+1] - t - 1;
            
        }
        if (i === arr.length - 1) {
            
            if ((24*60 - t + arr[0] - 1) > max) return (24*60 - t + arr[0] -1);
            
        }
        return max;
    }, 0);
    
    return Math.floor(maxt / 60) + ':' + (maxt % 60);
}

console.log(checkMaxTime(["14:51"])); // "23:59"
console.log(checkMaxTime(["23:00","04:22","18:05","06:24"])); // "11:40"
console.log(checkMaxTime(["21:14", "15:34", "14:51", "06:25", "15:30"])); // "09:10"


/*
Реализовать функцию iqTest, которая среди заданных чисел найдёт одно, 
отличающееся по чётности, и вернёт позицию (не индекс, а позицию по счету) этого 
числа из первоначальной строки.
*/

function iqTest(numbers) {
    let num = numbers.split(' ');
    let even = 0;
    
    for (let i = 0; i < 3; i++) {
        num[i] % 2 === 0 ? even++ : even--;
    }
    even = (even > 0) ? true : false;

    /*
    for (let i = 0; i < num.length; i++) {
        if (even) {
            if (num[i] % 2) return i+1;
        }
        else if (num[i] % 2 === 0) return i+1;
    } */
    return num.findIndex((el) => {
        if (even) {
            if (el % 2) return true;
        }
        else if (el % 2 === 0) return true;
        return false;
    }) + 1;
}

console.log(iqTest('2 4 7 8 10')); // 3
console.log(iqTest('1 2 2')); // 1

console.log("_______");

/*
Реализовать функцию findNearestPrimeNumber, которая возвращает ближайшее простое
число. На вход функция получает целое число, рядом с которой нужно найти 
ближайшее значение простого числа. Если разница между значениями равна, выбрать 
меньшее найденное значение.
*/

function findNearestPrimeNumber(num) {
    let lowerPrime;
    let upperPrime;
    let i = num, j = num;
    
    function checkIsPrime(num) {
        let dividers = 0;
        for (let i = Math.abs(num); i > 0; i--) {
            if (num % i === 0) dividers++;
        }
        return (dividers === 2 || dividers === 1);
    }
    //console.log(checkIsPrime(4));
    //console.log(checkIsPrime(5));
    
    let flag = true;
    while (flag) {
        if (i > 0) {
            if (checkIsPrime(i--)) return i+1;
        }
        if (checkIsPrime(j++)) return j-1;
    }
    
}

console.log(findNearestPrimeNumber(0));
console.log(findNearestPrimeNumber(4)); // 3 Разница равна - берем меньшее.
console.log(findNearestPrimeNumber(3)); // 3
console.log(findNearestPrimeNumber(11)); // 11
console.log(findNearestPrimeNumber(125)); // 127
console.log(findNearestPrimeNumber(110)); // 109
console.log(findNearestPrimeNumber(1110)); // 1109
console.log(findNearestPrimeNumber(-1110));
console.log(findNearestPrimeNumber(350000)); // 350003


let descriptorObj = {};

Object.defineProperty(descriptorObj, "name", {
    value: "Sasha",
    writable: false,
    enumerable: false,
    configurable: false
});

console.log(descriptorObj);


/* */

let d = {d: 5};

function df() {
    //console.log(d);
    console.log(this.d);
}

function df2(x) {
    console.log(x);
}

setTimeout(console.log.bind(null, d), 1000);
setTimeout(df.bind(d), 1000);
setTimeout(df2.bind(d), 1000, 10);


/* */
const printSeconds = function(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Passed ${number}`);
            resolve();
        }, 1000);
    })
}

printSeconds(1).then(() => printSeconds(2)).then(() => printSeconds(3));

/*
В функцию findIndex передается число и отсортированный по возрастанию массив.
Функция должна вернуть сумму двух индексов массива, элементы которых в сумме
дают число переданное первым аргументом.
*/
function findIndexSum(val, arr) {
    /*
    // O(n^2)
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === val) return i + j;
        }
    }
    return -1;
    */
    /*
    // O(n^2)
    let finalIndex;
    for (let i = 0; i < arr.length; i++) {
        if (arr[0] + arr[i] > val) {
            finalIndex = i;
            break;
        }
    }
    
    for (let i = 0; i < finalIndex; i++) {
        for (let j = i + 1; j < finalIndex; j++) {
            if (arr[i] + arr[j] === val) return i + j;
        }
    }
    
    return -1;
    */
    // O(n) - метод двух указателей
    for (let i = 0, j = arr.length - 1; i < arr.length && j > -1;) {
        if (arr[i] + arr[j] > val) j--;
        else if (arr[i] + arr[j] < val) i++;
        else return i + j;
    }
    return -1;
}

const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];
console.log(findIndexSum(79, arr)); // 4 + 5 -> 9
console.log(findIndexSum(70, arr)); // -1

/**
 *
 * Returns the rectangle object with width and height parameters and 
 * getArea() method.
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function() {
        return this.width * this.height;
    }
    this.getPerimeter = () => {
        return 2*this.width + 2*this.height;
    }
    Rectangle.prototype.getName = () => {
            return this.width + ' ' + this.height;
    }
}

Rectangle.prototype.getWidth = () => {
    return 'w = ' + this.width;
}

const r = new Rectangle(10,20);
console.log(r);
console.log(r.width); // 10
console.log(r.height); // 20
console.log(r.getArea()); // 200
console.log(r.getPerimeter()); // 60
console.log(r.getName());
console.log(r.getWidth());


/* Принцип единственной ответственности */

function fibonaci(num) {
    if (num === 1) return 1;
    if (num === 2) return 2;
    return fibonaci(num - 1) + fibonaci(num - 2);
}

console.log('Fibonaci ' + fibonaci(3));


let new_prom = Promise.resolve(true);
console.log(new_prom);

// Любой объект в логическом контексте – true, даже если это пустой массив [] или объект {}
console.dir(Array);
console.log([] == ""); // [].toString === ""
console.log(0 == "");
console.log(true >= "");

















