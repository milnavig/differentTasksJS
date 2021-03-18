obj = {
    name: 'alex',
    age: 18
}

obj.__proto__['5'] = 55;

for (let x in obj) {
    console.log(x)
}

function TestProto() {
    this.x = 10;
    TestProto.prototype = {
        hello: 15
    }
}

let tp = new TestProto();
tp.__proto__.hello = 16;
console.log(tp.hello);
console.log(TestProto.prototype);
console.log(tp.__proto__ === TestProto.prototype); // false


/*

Задача:
1. Переписать на ES6.
2. Нужно вернуть значение из метода после 2-х секунд.
*/
var john = {
  name: 'John Doe',
  balance: 1500,
  deduct: function(amount) {
    this.balance = this.balance - amount;
    return this.name + ' has a balance of ' + this.balance;
  },
};

john = {
  name: 'John Doe',
  balance: 1500,
  deduct: function(amount) {
    this.balance = this.balance - amount;
    let func = (res) => {
        setTimeout(() => res(this.name + ' has a balance of ' + this.balance), 2000);
    }
    let prom = new Promise(func);
    return prom;
  },
};

console.log(john.deduct(200).then(console.log));

/*
Дан массив, содержащий объекты с именами.
Нужно вернуть строку, отформатированную в виде списка имен, разделенных 
запятыми, за исключением двух последних имен, которые должны быть разделены 
амперсандом.
*/

function list(names) {
    return names.reduceRight((accum, el, i, arr) => {
        if (i === arr.length - 1 && arr.length !== 1) return [' & ', el.name, ...accum]
        else if (i === 0 || arr.length === 1) return [el.name, ...accum]
        else return [', ', el.name, ...accum]
    }, []).join('');
}

// 'Bart, Lisa & Maggie'
console.log(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}]));

// 'Bart & Lisa'
console.log(list([ {name: 'Bart'}, {name: 'Lisa'} ]));

// 'Bart'
console.log(list([ {name: 'Bart'} ]));

// ''
console.log(list([]));


function songDecoder(song){
    let i = song.indexOf('WUB');
    while( i !== -1) {
        let arr = song.split('');
        arr.splice(i, 3, ' ');
        song = arr.join('');
        i = song.indexOf('WUB');
    }
    
    let arr = song.split('');
    let new_str = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ' ') {
            if (arr[i + 1] === ' ') {
                continue;
            }
            else {
                new_str.push(arr[i]);
                continue;
            }
        }
        new_str.push(arr[i])
    }
    return new_str.join('').trim();
}

console.log(songDecoder("AWUBWUBBWUBC"));

/*
Подсчитайте количество вхождений каждого символа и верните его в виде списка
массивов в порядке появления. Для пустого вывода верните пустой список.
*/

function orderedCount(text) {
    /*
    let arr = [];
    text.split('').map(x => {
        let found = false;
        arr.forEach((el, i) => el[0] === x ? (arr[i][1]++, found = true) : null);
        if (!found) arr.push([x, 1]);
    })
    return arr;
    */
    // With Map
    let m = new Map();
    text.split('').forEach(x => m.has(x) ? m.set(x, m.get(x) + 1) : m.set(x, 1));
    return [...m.entries()];
}

// [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]
console.log(orderedCount("abracadabra"));

// [['2', 2], ['3', 3], ['1', 1 ]]
console.log(orderedCount('233312'));


/*
Учитывая строку слов (x), вам необходимо вернуть массив слов, отсортированных
в алфавитном порядке по последнему символу в каждом.
Если два слова имеют одинаковую последнюю букву, возвращаемый массив должен
показывать их в том порядке, в котором они появились в данной строке.
*/

function last(x) {
    //return x.split(' ').sort((str1, str2) => str1.split('')[str1.length - 1] > str2.split('')[str2.length - 1] ? 1 : str1.split('')[str1.length - 1] == str2.split('')[str2.length - 1] ? 0 : -1);
    
    return x.split(' ').sort((str1, str2) => str1.split('')[str1.length - 1].localeCompare(str2.split('')[str2.length - 1]));
}

console.log(last('держите меня семеро')); // ["держите", "семеро", "меня"]
console.log(last('её код сводит меня с ума')); // ["ума", "код", "её", "с", "сводит", "меня"]
console.log(last('мама ама криминал')); // ["мама", "ама", "криминал"]

/*
Напишите функцию, которая объединяет два массива, поочередно выбирая элементы
из каждого массива. Массивы могут иметь разную длину.
*/

function mergeArrays(a, b) {
    let res = [];
    let i = 0;
    while(i < Math.max(a.length, b.length)) {
        if (i < a.length) res.push(a[i]);
        if (i < b.length) res.push(b[i]);
        i++;
    }
    return res;
}

// [1, "a", 2, "b", 3, "c", 4, "d", 5, "e", 6, 7, 8]
console.log(mergeArrays([1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e']));

// [1, 'a', 2, 'b', 3, 'c', 'd', 'e', 'f']
console.log(mergeArrays([1, 2, 3], ['a', 'b', 'c', 'd', 'e', 'f']));

/*
Учитывая строку в качестве входных данных, переместите все ее гласные
(a, e, i, o, u, y) в конец строки в том же порядке
*/

function moveVowel(input) {
    let vovels = ['a', 'e', 'i', 'o', 'u', 'y'];
    let temp = [];
    return input.split('').filter((x) => vovels.includes(x) ? (temp.push(x), false) : true).concat(temp).join('');
}

console.log(moveVowel("day"));   // "day"
console.log(moveVowel("apple")); // "pplae"
console.log(moveVowel("peace")); // "pceae"


function rot13(message){
  return message.split('').map((x, i, arr) => {
    if ((x.charCodeAt(0) > 64 && x.charCodeAt(0) < 91) || (x.charCodeAt(0) > 96 && x.charCodeAt(0) < 123)) {
      let boundary = x.charCodeAt(0) > 96 ? 97 : 65;
      return String.fromCharCode(boundary + (x.charCodeAt(0) - boundary + 13 ) % 25);
    }
    return x;
  }).join('');
}

function sumPairs(ints, s) {
    let res = [];
    ints = ints.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]);
    
    for (let i = 0, j = ints.length - 1; i !== j && i < ints.length && j >= 0;) {
        if (ints[i][0] + ints[j][0] > s) j--;
        else if (ints[i][0] + ints[j][0] < s) i++;
        else {
            res.push([ints[i], ints[j]])
            i++;
        }
    }
    let dist = Infinity;
    let pair = [];
    res = res.sort((a, b) => a[0][1] - b[0][1]);

    res.forEach(m => {
        if (Math.abs(m[0][1] - m[1][1]) < dist) {
            dist = Math.abs(m[0][1] - m[1][1]);
            pair = m[0][1] < m[1][1] ? [m[0][0], m[1][0]] : [m[1][0], m[0][0]];
        }
    })
    return pair.length ? pair : undefined;
}

console.log(sumPairs([10, 5, 2, 3, 7, 5], 10));
// 2 3 5 5 7 10
console.log(sumPairs([4, -2, 3, 3, 4], 8));
// -2 3 3 4 4 
console.log(sumPairs([1, 2, 3, 4, 1, 0], 2));

/*
Необходимо реализовать функцию getEvenChars так, чтобы она возвращала строку 
"неверная строка", в случае если в функцию была передана строка с одним символом
или меньше, либо если символов в строке больше 100. В случае если количество 
символов надодится в диапазоне (1, 100), необходимо вернуть массив, в котором 
будут записаны все четные символы строки.
*/

function getEvenChars(str) {
    if (str.length <= 1 || str.length > 100) return "неверная строка";
    else {
        return str.split('').filter((x, i) => i % 2);
    }
}

console.log(getEvenChars("abcdefghijklm")); // ["b", "d", "f", "h", "j", "l"]
console.log(getEvenChars("a")); // "неверная строка"


/*
Напишите функцию isPrime, которая вернет true, в случае если переданное в 
функцию число простое, иначе false.
Простое число - это натуральное число, имеющее ровно два различных натуральных 
делителя — единицу и самого себя. 
Если проще - число является простым если оно больше единицы, целое и делится без 
остатка только на 1 и на само себя, других делителей, которые дадут результат 
без остатка не существует. 
Решать можно без всяких оптимизаций.
*/


function isPrime(num) {
    if (num < 2) return;
    let count = 0;
    /*
    for (let i = num; i > 0; i--) {
        if (num % i === 0) count++;
    }
    if (count === 2) return true;
    return false;
    */
    num = Math.floor(num / 2);
    for (let i = num; i > 0; i--) {
        if (num % i === 0) count++;
    }
    if (count === 2) return true;
    return false;
}

console.log(isPrime(1));
console.log(isPrime(12));
console.log(isPrime(23));

console.log('-------');
/*
В функцию передается массив слов, а также искомое слово. Необходимо вернуть
правду, если такое слово можно составить из того паззла что передали внутрь
функции, ложь, если такое слово невозможно составить.
Правила состававления слова: 
1. Направления от букв должны быть влево, вправо, вниз, вверх. Переходить с 
одного конца слова в другой конец запрещено (например в слове 'RFIDTCL' нельзя 
с буквы "R" перейти на букву "L").
2. В слове все символы должны быть уникальны, то есть нельзя из паззла 
использовать одну и ту же букву на том же самом месте.
*/

function findWord(puzzle, word) {
    puzzle = puzzle.map(x => x.split(''));
    let findFirstSymbol = (puzzle, s) => {
        let res = []
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                if (puzzle[i][j] === s) res.push([i, j]);
            }   
        }
        return res;
    };
    
    let findNextSymbol = (puzzle, pos, str) => {
        let success = false;
        if (str.length === 0) {
            return true;
        }
        
        if (puzzle[pos[0]][pos[1] + 1] !== undefined && puzzle[pos[0]][pos[1] + 1] === str[0]) {
            success = findNextSymbol(puzzle, [pos[0], pos[1] + 1], str.slice(1))
        } 
        
        if (success) return true;
        
        if (puzzle[pos[0] + 1] !== undefined && puzzle[pos[0] + 1][pos[1]] !== undefined && puzzle[pos[0] + 1][pos[1]] === str[0]) {
            success = findNextSymbol(puzzle, [pos[0] + 1, pos[1]], str.slice(1))
        }
        
        if (success) return true;

        if (puzzle[pos[0] - 1] !== undefined && puzzle[pos[0] - 1][pos[1]] !== undefined && puzzle[pos[0] - 1][pos[1]] === str[0]) {
            success = findNextSymbol(puzzle, [pos[0] - 1, pos[1]], str.slice(1))
        }
        
        if (success) return true;
        
        if (puzzle[pos[0]][pos[1] - 1] !== undefined && puzzle[pos[0]][pos[1] - 1] === str[0]) {
            success = findNextSymbol(puzzle, [pos[0], pos[1] - 1], str.slice(1))
        } 
        
        return success;
    };
    
    let positions = findFirstSymbol(puzzle, word[0]);

    word = word.split('');
    for (let i = 0; i < positions.length; i++) {
        if (findNextSymbol(puzzle, positions[i], word.slice(1))) return true;
    }
    return false;
}

const puzzle = [
  'ANGULAR',
  'REDNCAE',
  'RFIDTCL',
  'AGNEGSA',
  'YTIRTSP',
];

console.log(findWord(puzzle, 'ANGULAR')); // true (первая строка)
console.log(findWord(puzzle, 'REACT')); // true (начиная справа сверху)
console.log(findWord(puzzle, 'ARRAY')); // true (первая колонка)
console.log(findWord(puzzle, 'UNDEFINED')); // true
console.log(findWord(puzzle, 'RED')); // true
console.log(findWord(puzzle, 'STRING')); // true
console.log(findWord(puzzle, 'CLASS')); // true
console.log(findWord(puzzle, 'FUNCTION')); // false
console.log(findWord(puzzle, 'NULL')); // false

console.log(Number.parseInt('3A', 16)); // 58
console.log(Number.parseInt('EF', 16)); // 15*1 + 14*16
// 01011 = 1 + 2 + 8

/*

В функцию sumNumbers передается массив, содержащий все подряд (любые
типы данных). Необходимо реализовать функцию так, чтобы она вернула
среднее арифметическое всех элементов, которые могут быть нативно
представлены в javascript в виде числа, т.е. мы считаем значение, если
при прверащении в число, значение не является NaN.
*/
function sumNumbers(arr) {
    return arr.filter((el) => typeof(el) !== 'symbol' && typeof(el) !== 'object' && typeof(el) !== 'boolean' && !isNaN(el)).map(x => { 
        console.log(x)
        return +x;
    }).reduce((accum, x, i, arr) => accum + x/arr.length, 0)
}

console.log(sumNumbers([
  1,
  "9",
  NaN,
  9.5,
  true,
  "WebInterview",
  Symbol("5"),
  null,
  //  5n, // В jsfiddle bigint нормально не работает
  undefined,
  {a: 5},
  () => 100,
])); // 4.25


/*
На вход нам приходит url товара из магазина.
Все URL-адреса имеют одинаковый формат, сначала это домен exampleshop.com,
затем у нас есть название продукта, разделенное тире (-), после чего есть буква
p, указывающая начало идентификатора продукта, после которого следует
фактический идентификатор (без ограничения по длине) и, наконец, 8-значное
представление даты добавления товара, за которым следует .html.

Необходимо получить идентификатор продукта (см. примеры).
*/
function getProductId(url) {
    return url.slice(url.lastIndexOf('-p-') + 3).split('-')[0];
}

console.log(getProductId('exampleshop.com/fancy-coffee-cup-p-90764-12052019.html')); // 90764
console.log(getProductId('exampleshop.com/c-3-p-0-p-654-11112011.html')); // 654


function Hw(x) {
    this.x = x;
}

let hw = Hw.prototype.constructor(10);
console.log(hw);

let hw1 = new Hw.prototype.constructor(10);
console.log(hw1);

let hw2 = new (new Hw(10)).constructor(14);
console.log(hw2);


for (var i = 0; i < 10; i++) {
    let y = i;
    //setTimeout(() => console.log(i), 1000);
    //setTimeout(() => console.log(y), 1000);
}



/*
Implement function check(str, bracketsConfig), that for given brackets
sequence will return true if it is correct and false otherwise.

In the second param there is bracketsConfig - the array of pairs
open-closed brackets. Each subarray includes only 2 elements - opening
and closing bracket.
*/
function check(str, bracketsConfig) {
    
    let open = bracketsConfig.map(x => x[0]);
    let close = bracketsConfig.map(x => x[1]);
    let stack = [];
    return str.split('').every((s) => {
        if (open.includes(s)) {
            if (close[open.indexOf(s)] !== open[open.indexOf(s)]) {
                stack.push(open.indexOf(s));
                return true;
            }
            else {
                if (s === close[stack[stack.length - 1]]) {
                    stack.pop();
                    return true;
                }
                else {
                    stack.push(open.indexOf(s));
                    return true;
                }
            }
        }
        else if (close.includes(s)) { 
            if (s === close[stack[stack.length - 1]]) {
                stack.pop();
                return true;
            }
            else return false;
        }
        else return false;
        
    }) && stack.length === 0;
    
}

console.log(check('()', [['(', ')']]), true); // -> true
console.log(check('((()))()', [['(', ')']]), true); // -> true
console.log(check('())(', [['(', ')']]), false); // -> false
console.log(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true
console.log(check('[(])', [['(', ')'], ['[', ']']]), false); // -> false
console.log(check('[]()', [['(', ')'], ['[', ']']]), true); // -> true
console.log(check('[]()(', [['(', ')'], ['[', ']']]), false); // -> false

// special case: opening and closing bracket can be the same :)

console.log(check('||', [['|', '|']]), true); // -> true
console.log(check('|()|', [['(', ')'], ['|', '|']]), true); // -> true
console.log(check('|(|)', [['(', ')'], ['|', '|']]), false); // -> false
console.log(check('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true
console.log(check('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true
console.log(check('|(|||(||)|||)|', [['(', ')'], ['|', '|']]), true); // -> true









