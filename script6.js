/*
var x = 10;

switch(x) {
    case 8:
        console.log("8");
        break;
    case 10:
        console.log("10");
        console.log("True");
        break;
    case 11:
        console.log("11");
        break;
    default:
        console.log("Default");
}

let arr = [];
for (var i = 0; i < 3; i++) {
    arr[i] = [];
    for (var j = 0; j < 3; j++) {
        arr[i][j] = [];
        for (var z = 0; z < 3; z++) {
            arr[i][j][z] = i + '/' + j + '/' + z;
        }
    }
}

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        for (var z = 0; z < 3; z++) {
            console.log(arr[i][j][z] + ' ');
        }
    }
}

var mas = [1,2,3,4,5,6,7,8,9,10];
var mas2 = [11,12];

var new_mas = mas.concat(mas2, 13);
console.log(new_mas);

function check(x) {
    //console.log(x);
    if (x === 3 || x === 6) {
        return true;
    }
    return false;
}

var res = new_mas.every(check);
res = new_mas.some(check);

new_mas.forEach(function(x) {
    console.log(x);
});

var m = new_mas.map(check);
console.log(m);

m = new_mas.filter(check);
console.log(m);

m = new_mas.reduce(function(x, y, index) {
    return x + y;
});
console.log(m);

for (let i of mas) {
    console.log(i);
}


var iterator = mas[Symbol.iterator]();
console.log(iterator.next().value);
console.log(iterator.next().value);

iterator = mas.entries();
console.log(iterator.next().value);
console.log(iterator.next().value);

iterator = mas.keys();
console.log(iterator.next());
console.log(iterator.next());

iterator = mas.values();
console.log(iterator.next());
console.log(iterator.next());


var arr3 = Array.from(mas);
console.log(arr3);
arr4 = Array.of(...arr3);
console.log(arr4);
arr4.fill(0,2,5);
console.log(arr4);
arr4.copyWithin(7, 1, 6);
console.log(arr4.toString());


var div = 10 / 3;
console.log(div);
console.log(10 % 3);
console.log(Math.floor(div)); //возвращает всегда меньшее целое число (даже для отрицательных чисел)


var arr10 = [1,2,3];
var arr11 = arr10;
arr11[2] = 5;
console.log(arr10);
*/

function countCloseNumbers(arr) {
    var maxNumber = Math.max(...arr);
    console.log(maxNumber);
    var count = [];
    for (let el of arr) {
        if (Math.abs((el - maxNumber)/maxNumber) < 0.1) {
            count.push(el);
        }
    }
    return count;
}

var mas = [11,12,16];
console.log(countCloseNumbers(mas));

function fillArr(arr, num) {
    /*
    let new_arr = new Array(num);
    new_arr.fill(0,0,new_arr.length);
    for (let i = 0; i < arr.length; i++) {
        new_arr[i] = arr[i];
    }
    return new_arr;
    */
    for (let i of arr.keys()) {
        console.log(i);
        num--;
        if (!num) {
            return arr.slice(0,i+1);
        }
        else if (i === arr.length-1) {
            let new_arr = new Array(num);
            new_arr.fill(0,0,new_arr.length);
            return arr.concat(new_arr);
        }
        
    }
}

console.log(fillArr(mas,6));

mas = [11,12,16,16,13,11];

function unique(arr) {
    /*
    new_arr = [];
    for (let el of arr) {
        if(!new_arr.includes(el)) {
            new_arr.push(el)
        } 
    }
    return new_arr;
    */
    let new_set = new Set(arr);
    //return new_set.values();
    return Array.from(new_set.values());
}

console.log(unique(mas));

var round5 = function(number) {
    var remainder = Math.abs(number%5);
    console.log(Math.trunc(number/5));
    if (remainder<=2) {
        return Math.trunc(number/5)*5;
    } else return ((number)>=0 ? Math.trunc(number/5)*5 + 5 : Math.trunc(number/5)*5 - 5);
}

console.log(round5(10));

function uniqueArr(arr) {
    my_obj= {};
    for (let obj of arr) {
        my_obj[obj.x + "," +obj.y] = obj.x + "," +obj.y;
    }
    uniqueArr = []
    for (let item in my_obj) {
        uniqueArr.push({x: item.split(",")[0],y:item.split(",")[1]})
    }
    return uniqueArr;
}

mas = [{x: 5, y: 10},{x: 5, y: 10},{x: 5, y: 13},{x: 6, y: 11}];
console.log(uniqueArr(mas));

function getArr(num) {
    let arr = [];
    while (num >= 0) {
        (num%3 === 0) && arr.push(num);
        num--;
    }
    return arr;
}

console.log(getArr(15));

function getEvenNumbers(a,b,c) {
    let mas = [];
    if (a > b) {
        [a,b] = [b,a];
    }
    console.log(a);
    for (let i=a; i<=b; i++){
        if (i % c === 0) mas.push(i);
    }
    return mas;
}

console.log(getEvenNumbers(15,5,3));
/*
function polindrom(a,b,c) {
    let mas = [];
    
    for (let i=0; i<1000; i++){
        if (String(i) === String(i).split("").reverse().join("") && i.toString(2) === i.toString(2).split("").reverse().join("")) {
            
            mas.push(i);}
    }
    return mas;
}

console.log(polindrom());
*/
/*
function strCombinations(str) { //recursion
    var help = [];
    if (str.length === 1) {
        return [str];
    }
    for (let i = 0; i < str.length; i++) {
        let nstr = str.split("");
        nstr.splice(i,1);
        //console.log(nstr.join(""));
        //strCombinations(nstr.join(""));
        //console.log(strCombinations(nstr.join("")));
        for (let s of strCombinations(nstr.join(""))) {
            help.push([str[i],s].join(""));
        }
        //help.push([str[i], strCombinations(nstr.join(""))].join(""));
    }
    return help;
}

console.log(strCombinations("asd"));

function encode(str) { 
    var new_str = str.split("");
    new_str.forEach((el, i) => {
        switch(el) {
            case 'a':
                new_str[i] = 1;
                break;
            case 'e':
                new_str[i] = 2;
                break;
            case 'l':
                new_str[i] = 3;
                break;
            case 'o':
                new_str[i] = 4;
                break;
            case 'u':
                new_str[i] = 5;
                break;
        }
    })
    return new_str.join("");;
}

function decode(str) { 
    var new_str = str.split("");
    new_str.forEach((el, i) => {
        switch(el) {
            case '1':
                new_str[i] = 'a';
                break;
            case '2':
                new_str[i] = 'e';
                break;
            case '3':
                new_str[i] = 'l';
                break;
            case '4':
                new_str[i] = 'o';
                break;
            case '5':
                new_str[i] = 'u';
                break;
        }
    })
    return new_str.join("");
}

console.log(encode("asdot"));
console.log(decode("1sd4t"));

function numbers() { 
    for (let i = 0; i <100; i++) {
        (i % 3 === 0) ? ((i % 5 === 0) ? console.log("BuzzFizz") : console.log("Fizz")) : ((i % 5 === 0) ? console.log("Buzz") : console.log(i));
    }
}

console.log(numbers());

let sum = 0;

function add(arg) { // каррирование
    if (arg === undefined) {
        let temp = sum;
        sum = 0;
        return temp;
    } else {
        sum += arg;
        
        return add;
    }
}

console.log(add());
console.log(add(2)());
console.log(add(2)(3)());
console.log(add(5)(-1)(2)());
console.log("//");
*/
function sumAge(obj) { 
    var age = 0;
    for (let prop in obj) {
        if (prop === "age") {
            age += obj[prop];
        } else if (Array.isArray(obj[prop])) {
            /*
            obj[prop].forEach(el => {
                if (typeof el == "object") {
                    age += sumAge(el);
                }
            })*/
            age += obj[prop].reduce((accumulator, el) => accumulator + sumAge(el), 0);
        }
    }
    return age;
}

console.log(sumAge({name:"Alex", age: 32, children:[{name:"Lexa", age: 16, children:[{name:"Serhey", age: 8},{name:"Oleg", age: 3}]},{name:"Valy", age: 18}]}));
/*
function sequence(val = 0, step = 1) { 
    var current = val;
    return function() {
        var t = current;
        current += step;
        return t;
    }
}

const generator = sequence(2,3);
console.log(generator());
console.log(generator());
console.log(generator());

function transform(arr) { 
    let obj = new Object();
    arr.forEach((prop) => obj[prop.name] = prop.value);
    return obj;
}

var arr = [
    {name: "name", value: "Alex"}, {
      name: "age", value: 40  
    }
];
console.log(transform(arr));

function getSum(num) {
    //let n = num;
    let arr = new Array(num).fill(0);
    return String(arr.map((el, i) => num--).reduce((accum, el) => accum*el)).split('').reduce((accum, el) => accum + +el, 0);
}

console.log(getSum(10));

function maxSum(mas) { //!!!!! https://www.youtube.com/watch?v=vQpwGDrIFdI&t=2711s
    if (mas.length === 1) return mas[0];
    
    let new_mass = [];
    
    let index_start;
    let index_end;
    mas[1].forEach((el, index) => {
        let m = [[+el + +mas[0][0]]];
        if (index <= 0) {
            index_start = index;
            index_end = index + 1;
        } 
        else {
            index_start = index - 1;
            index_end = index + 1;
        }
        for (let i = 2; i < mas.length; i++) {
            m.push([...mas[i].slice(index_start, index_end + 1)]);
            (index_start === 0) ? index_start : index_start--;
            index_end++;
        }
        new_mass.push(m);
    });

    let n = [];
    new_mass.forEach(m => n.push(...maxSum(m)));
    n = [Math.max(...n)];
    return n;
}

console.log(maxSum([[1],[4,8],[1,5,3]]));
*/

function matrix(arr) { 
    let new_matrix = (new Array(arr[0].length)).fill(new Array(arr.length).fill(0)); // не верно, отправляем один и тот же массив (ссылку) в каждую строку
    new_matrix[1][2] = 3; // не верно
}

arr = [[1, -2, 3, 4],
           [-4, 2, 5, 5],
           [2, -3, 1, 5]];

console.log(matrix(arr));

function transpose(original) {
    let tran = function(m) {
        var copy = [];
        for (var i = 0; i < m.length; ++i) {
            for (var j = 0; j < m[i].length; ++j) {   
                if (copy[j] === undefined) copy[j] = [];
                copy[j][i] = m[i][j];
            }
        }
        return copy;
    }
    new_matrix = tran(original);
    console.log(new_matrix);
    for (var i = 0; i < new_matrix.length; ++i) {
        let num = 0;
        for (var j = 0; j < new_matrix[i].length; ++j) {   
            if (new_matrix[i][j] > 0) num++;
        }
        if (num === new_matrix[i].length) {
            new_matrix.splice(i,1); 
            i--;
        }
    }
    return tran(new_matrix);
}

console.log(transpose(arr));

function func(arr) {
    /*
    let sum = 0;
    
    arr.forEach((el, i) => {
        if (el % 2) sum += el ** 0.5;
    });
    */
    let sum = arr.reduce((accum, el) => (el % 2) ? accum + el ** 0.5 : accum, 0);
    return sum;
}

console.log(func([1, 3, 5, 6, 4, 8, 9]));

function mySort(arr) {
    return arr.sort((obj1, obj2) => obj1.val - obj2.val).filter((el) => el.val >= 0);
}

console.log(mySort([{id: 1, val: 2},{id: 2, val: -2},{id: 3, val: 5},{id: 4, val: 1},{id: 5, val: -6}]));

function fillArr2(n) {
    let box = [];
    for (let i = 0; i < (n - 1)*2 + 1; i++) {
        let row = [];
        let type;
        if (i > n - 1) type = (n - 1)*2 - i;
            else type = i;
        
        for (let j = 0; j < (n - 1)*2 + 1; j++) {
            if (j < type) row.push(j + 1);
            else if (j >= (n - 1)*2 - type) row.push((n - 1)*2 + 1 - j);
            else row.push(type+1);
        }
        box.push(row);
    }
    return box;
}

console.log(fillArr2(4));


function bind(target, context) {
    return function(...params) {
        let wrap = {
            ...context,
            target
        }
        return wrap.target(...params);
    }
}

function func(params) {console.log(this); console.log(params);}
let person = {name: "sasha"};

let h = bind(func, person);
h("Test");

function Obj() {
    this.hello = "Hello";
    var hello = "Hello";
    this.h = function() {
        return 5;
    }
}

let o = new Obj();
console.log(Obj);

let set = new Object({test: "week", hello: 4});

console.log(Object.values(set));

function sumMatrix(m) {
    let sum = 0;
    for (let i = 1; i < m.length; i++) {
        for (let j = 0; j < i; j++) {
            sum += m[i][j];
        }
    }
    return sum;
}

console.log(sumMatrix([[1, -2, 3, 4],
           [-4, 2, 5, 5],
           [2, -3, 1, 5],
           [2, -3, 1, 5]]));

let str = '';
for (let i = 0; i < 10; i++) {
    if (i === 0 || i === 9) {
        str += "########## \n";
        continue;
    }
    for (let j = 0; j < 10; j++) {
        if (j === 0 || j === 9) {
            str += "#";
            continue;
        }
        if (i === j || j === 9 - i) str += "#";
        else str+= " ";
        
    }
    str += "\n";
}
console.log(str);

function selectBanners(banners, count) {
    banners.sort((b1, b2) => b2.weight - b1.weight);
    console.log(banners);
    let mas = [];
    for (let i = 0; i < count; i++) {
        //mas.push(banners[Math.round(Math.random()**2 * banners.length)])
        let id = Math.round(Math.random()**2 * (banners.length-1));
        if(!mas.some((el) => el.id === banners[id].id)) mas.push(banners[id]);
        else i--;
    }
    return mas;
}

let banners = [{id: 1, weight: 13},{id: 2, weight: 16}, {id: 2, weight: 10},{id: 3, weight: 4}, {id: 4, weight: 92}];
console.log(selectBanners(banners, 3));