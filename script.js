/*
Реализовать функцию leftPad, которая добавляет слева к строке пробелы.
Функция принимает два аргумента: число, обозначающее минимальную длину
результата, и строку, которую нужно дополнить, если её длина меньше.
*/


function leftPad(len, str) {
    // первый вариант
    /*
    if (str.length >= len) return str;
    else {
        return new Array(len - str.length).fill(' ').join('').concat(str);
    }
    */
    
    // второй вариант
    //return str.padStart(len, '_'); // классный метод
    
    // тертий вариант
    return ' '.repeat((len - str.length > 0 ? len - str.length : 0)).concat(str);
}


console.log(leftPad(3, 'test'));

/*
Создать функцию objCreator(arr), в которую передается массив строк. Функция
должна вернуть объект с вложенными объектами под свойствами, переданными в
массиве.
*/

function objCreator(arr) {
    let obj = {};
    let temp = arr[0];
    arr.shift();
    if (arr.length !== 0) obj[arr[0]] = objCreator(arr);
    return obj;
}

console.log(objCreator(['a', 'b', 'c'])); // {a:{b:{c:{}}}}
console.log(objCreator(['a', 'b', 'c', 'd'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator([])); // {}


/*
Необходимо реализовать функцию accum, которая принимает строку, а возвращает
другую строку, как показано в примерах.

аккумулятор ("abcd") -> "A-Bb-Ccc-Dddd"
аккумулятор ("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
аккумулятор ("cwAt") -> "C-Ww-Aaa-Tttt"
Параметр аккумулятора - это строка, которая включает только буквы от a..z и A..Z.
*/

function accum(str) {
    let res = '';
    str.split('').forEach((symbol, i) => {
        res += symbol.toUpperCase();
        for (let j = 0; j < i; j++) res += symbol.toLowerCase();
        if (i !== str.length - 1) res += '-';
    });
    return res;
}

console.log(accum("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum("cwAt")); // "C-Ww-Aaa-Tttt"

/*
Завершите решение так, чтобы оно разбило строку на пары из двух символов.
Если строка содержит нечетное количество символов, она должна заменить
отсутствующий второй символ последней пары символом подчеркивания ('_').
*/

function solution(str) {
    return str.split('').map((el, i) => {
        if (i % 2 === 0) {
            return el + (str[i+1] ? str[i+1] : '_');
        }
    }).filter((el, i) => i % 2 === 0);
}

console.log(solution('abc')); // should return ['ab', 'c_']
console.log(solution('abcdef')); // should return ['ab', 'cd', 'ef']


/*
Реализовать debounce-функцию. Функция debounce принимает функцию - `f`, также 
число миллисекунд - `ms`. Функция debounce должна вернуть другую функцию, 
которая будет вызывать функцию `f` только если с момента последнего вызова 
функции `f` прошло `ms` миллисекунд.
*/

function debounce(f, ms) {
    var canUse = true;
    return function(arg) {
        if (canUse) {
            //f.call(this, arg);
            f(arg);
            canUse = !canUse;
            setTimeout(() => canUse = !canUse, ms);
        }
    }
}

let debounceFunc = debounce(console.log, 1000);
// выполняется немедленно
debounceFunc('MockInterview 1');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
debounceFunc('MockInterview 2');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 500'), 500);
// Выполнится
setTimeout(() => debounceFunc('MockInterview 1200'), 1200);
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 1500'), 1500);


/* В функцию передается строка в которой находятся круглые скобки. Проверить, парные ли они. */

function validParentheses(str) {
    let incomeP = [];
    let err = false;
    str.split('').forEach((el) => {
        if (el === '(') incomeP.push(el);
        if (el === ')') {
            if (incomeP.length) incomeP.pop();
            else err != err;
        }
    });
    if (incomeP.length || err) return false;
    return true;
}

console.log(validParentheses('(())()'));
console.log(validParentheses('(()()())'));
console.log(validParentheses('(()()'));
console.log(validParentheses('())('));


/* https://www.youtube.com/watch?v=KxORGm2_gRQ Second task */

function rate() {
    let arr = [];
    return function(num) {
        arr.push(num);
        let sum = arr.reduce((accum, x, i) => {
            return accum += x;
        }, 0);
        return Math.round((sum / arr.length));
    }
}

const setRate = rate();
console.log(setRate(5));
console.log(setRate(3));
console.log(setRate(4));
console.log(setRate(0));

/* Реализовать метод */

// Первый вариант
/*
Array.prototype.sum = function() {
    let sum = 0;
    for (let e of this) {
        sum += e;
    }
    return sum;
} */

const arr17 = [1, 2, 3, 4, 5];
// Второй вариант
arr17.sum = function() {
    let sum = 0;
    for (let e of this) {
        sum += e;
    }
    return sum;
}

const sum = arr17.sum();
console.log(sum);
console.log("___________");

/* Найти максимальное количество совпадающих елементов */

function t(mas) {
    // First variant
    /*
    return Math.max(...Object.values(mas.reduce((accum, el) => {
        (el in accum) ? accum[el]++ : accum[el] = 1;
        return accum;
    }, {})));
    */
    
    // Second variant
    let max_l = 0;
    let cur_l = 0;
    let current_num;
    //mas.sort((e1, e2) => e1 - e2).forEach((el, i) => (current_num !== el) ? ((cur_l >= max_l) ? (max_l = cur_l, (cur_l = 1), (current_num = el)) : (cur_l = 1, (current_num = el))) : cur_l++);
    
    mas.sort((e1, e2) => e1 - e2).forEach((el, i) => {
        if (current_num !== el) {
            if (cur_l >= max_l) max_l = cur_l;
            cur_l = 1;
            current_num = el;
        } else if (current_num === el && i === mas.length - 1) {
            if (cur_l + 1 >= max_l) max_l = cur_l + 1;
        } else {
            cur_l++;
        }
    }); 
    return max_l;
}

console.log(t([0, 1, 3, 0, 0, 9])); // 3
console.log(t([0, 1, 3, 0, 0, 9, 9, 9, 9, 9, 9, 9]));
console.log(t([1, 2, 3, 4, 5])); // 1