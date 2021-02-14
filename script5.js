/*

Задача про футбол.
Две команды, А и Б, играют в футбол. Некто делает свою 
ставку на результат матча, например "1:2".
По окончании матча становится известен настоящий счет, и
нам надо выдать тот или иной приз. Если некто угалад
точный счет - он получает большой приз. Если некто угадал
исход матча (выигрыш той или иной команды, или же
ничью) - он получает маленький приз. Если же он не угадал 
- он получает нулевой приз.
Необходимо написать функцию на вашем любимом языке 
программирования, которая принимает в качестве
аргументов предполагаемый счет и реальный счет, и 
возвращает целое число 0, 1 или 2(нулевой, маленький или 
большой приз).
*/

function getPrize(guessScore, realScore) {
    let guessArr = guessScore.split(':');
    let realArr = realScore.split(':');
    return (guessArr[0] - guessArr[1]) * (realArr[0] - realArr[1]) > 0 ? (guessArr[0] === realArr[0]) && (guessArr[1] === realArr[1]) ? 2 : 1 : (guessArr[0] - guessArr[1] === 0) && (realArr[0] - realArr[1] === 0) ? (guessArr[0] === realArr[0]) && (guessArr[1] === realArr[1]) ? 2 : 1 : 0;
}

console.log(getPrize('1:2', '1:2')); // 2
console.log(getPrize('2:1', '5:0')); // 1
console.log(getPrize('3:0', '2:2')); // 0
console.log(getPrize('0:0', '2:2')); // 1

/*
Вывести все пятизначные числа, которые делятся на 2, у которых средняя цифра
нечетная, и сумма всех цифр делится на 4
*/

function findNumbers() {
    for (let i = 1e4; i < 1e5; i++) {
        if (i % 2 !== 0) continue;
        let digits = new Array(5);

        for (let j = 0; j < 5; j++) {
            digits[j] = ~~(i % (10 ** (j + 1)) / 10 ** j);
        }

        if (digits[2] % 2 === 0) continue;
        if (digits.reduce((sum, e) => sum += e, 0) % 4 === 0) console.log(i);
        /*
        digits[4] = i % 10;
        digits[3] = ~~((i % 100) / 10);
        digits[2] = ~~((i % 1000) / 100);
        digits[1] = ~~((i % 10000) / 1000);
        digits[0] = ~~((i % 100000) / 10000);
        console.log(i);
        */
    }
}


function helloSasha() {
    console.log(this + " !");
}

let helloSasha2 = helloSasha.bind("Sasha").bind("Masha");
helloSasha2();

let age = 23;
console.log(age.prototype === Number.prototype); // false
console.log(age.__proto__ === Number.prototype); // true


/*
Кто убийца?

Мы - следователи. Нам удалось сузить список подозреваемых до небольшого числа
людей. К счастью, у нас есть информация о том, кто с кем встречался.

Дан список имен подозреваемых и всех, с кем подозреваемые встречались в этот день.

{
  'James': ['Jacob', 'Bill', 'Lucas'],
  'Johnny': ['David', 'Kyle', 'Lucas'],
  'Peter': ['Lucy', 'Kyle'],
}

А также список убитых:

['Lucas', 'Bill']

Найдите имя убийцы. В нашем случае это James, так как он единственный, кто видел
Lucas и Bill.
*/

function killer(suspectInfo, dead) {
    for (let suspect in suspectInfo) {
        let count = 0;
        suspectInfo[suspect].forEach((p) => {
            if (dead.some(el => el === p)) count++;
        });
        if (dead.length === count) return suspect;
    }
}

console.log(killer({
  'James': ['Jacob', 'Bill', 'Lucas'],
  'Johnny': ['David', 'Kyle', 'Lucas'],
  'Peter': ['Lucy', 'Kyle']
}, ['Lucas', 'Bill'])); // 'James'

console.log(killer({
  'Brad': [],
  'Megan': ['Ben', 'Kevin'],
  'Finn': []
}, ['Ben'])); // 'Megan'


/**
 *
 * Function thirdFunction
 * @param {string[]} routes - Samantha's plane tickets.
 *
 * Samantha travels a lot by different cities and countries.
 * She found a group of all plane tickets in her shelf, but she
 * can't exactly remember the order of the cities she visited.
 *
 * Create a function that receives an array of origin-destination tickets
 * and return the entire trip, ordered by city visited.
 */

// Без рекурсии
/*
function rememberTheOrderOfVisitedCity(routes) {
    let destinations = routes.map((el) => el[1]);
    let points = [];
    let next_point;
    routes.forEach(el => {
        if (!destinations.includes(el[0])) {
            points.push(el[0]);
            next_point = el[1];
        }
    });
    let temp = true;
    while(temp) {
        temp = false;
        routes.forEach(el => {
            if(el[0] === next_point) {
                points.push(el[0]);
                next_point = el[1];
                temp = true;
            }
        });
        if (!temp) points.push(next_point);
    }
    //console.log(points);
    return points.toString();
} */

// С рекурсией
function findNextNode(routes, next_point) {
    let points = [];
    if (routes.length === 0) return [next_point];
    routes.forEach((el, i) => {
        if(el[0] === next_point) {
            points.push(el[0]);
            routes.splice(i,1);
            next_point = el[1];
        }
    });
    
    points.push(...findNextNode(routes, next_point));
    return points;
}

function rememberTheOrderOfVisitedCity(routes) {
    let destinations = routes.map((el) => el[1]);
    let points = [];
    let next_point;
    routes.forEach((el, i) => {
        if (!destinations.includes(el[0])) {
            points.push(el[0]);
            routes.splice(i,1);
            next_point = el[1];
        }
    });
    points.push(...findNextNode(routes, next_point));
    return points;
} 

console.log(rememberTheOrderOfVisitedCity([
  ["MNL", "TAG"], // 1
  ["CEB", "TAC"], // 3
  ["TAG", "CEB"], // 2
  ["TAC", "BOR"], // 4
])); // "MNL, TAG, CEB, TAC, BOR"

console.log(rememberTheOrderOfVisitedCity([
  ["Chicago", "Winnipeg"], // 4
  ["Halifax", "Montreal"], // 1
  ["Montreal", "Toronto"], // 2
  ["Toronto", "Chicago"],  // 3
  ["Winnipeg", "Seattle"], // 5
])); // "Halifax, Montreal, Toronto, Chicago, Winnipeg, Seattle"

console.log(rememberTheOrderOfVisitedCity([
  ["USA","BRA"], // 1
  ["JPN","PHL"], // 4
  ["BRA","UAE"], // 2
  ["UAE","JPN"], // 3
])); // "USA, BRA, UAE, JPN, PHL"


let Component = (props) => "Hi!";

function Component2() {
    return "Hi2"
}

//console.dir(Component.prototype);
//console.dir(Component2.prototype);
//console.dir(Component.__proto__);
//console.dir(Component2.__proto__);
//console.dir(Function.prototype);


let smth = 0;
/*
function s(smth = 1, func_x = () => {console.log(smth);}) {
    var smth = 2;
    func_x();
} // 1
*/
function s(func_x = () => {console.log(smth);}) {
    var smth = 2;
    func_x();
} // 0

s();

/*
В функцию realizeDistance передается дистанция, которую должен проехать человек,
вторым параметром передается дистанция после которой необходимо сделать 
остановку. Необходимо вывести лог всего пути внутри функции, как в примере.
*/

function realizeDistance(distance, stopAfter) {
    if (distance < stopAfter) console.log(`Вы проехали ${distance} метров и доехали до точки.`);
    else {
        let count = 1;
        
        while(distance > stopAfter) {
            console.log(`Остановка №${count}. Вы проехали ${stopAfter*count} метров.`);
            count++;
            distance -= stopAfter;
        }
        console.log(`Вы проехали еще ${distance} метров и доехали до точки.`)
    }
}

// Вы проехали 100 метров и доехали до точки.
console.log(realizeDistance(100, 150));

/*
Остановка №1. Вы проехали 300 метров.
Остановка №2. Вы проехали 600 метров.
Остановка №3. Вы проехали 900 метров.
Вы проехали еще 100 метров и доехали до точки.
*/
console.log(realizeDistance(1000, 300));

/*
Дан массив возрастов в семье, вернуть
массив c возрастом самого младшего, самого старшего и разницу между самым
старшим и младшим. Если ребенку 9 месяцев, считаем как 0. P.S. Желательно
не использовать встроенные функции типа sort и т.п.
*/

function differenceInAges(ages) {
    let max = 0;
    let min = ages[0];
    ages.forEach((el) => (el > max) ? max = el : (el < min) ? min = el : null);
    return [min, max, max - min];
}

console.log(differenceInAges([82, 15, 6, 38, 35])); // [6, 82, 76]
console.log(differenceInAges([57, 99, 14, 32])); // [14, 99, 85]

/*
В функцию mostFrequentDays передается год (целое число), необходимо реализовать
функцию так, чтобы из нее вернулся массив с наиболее часто встречаемыми днями
недели в году, что был передан. Массив должен быть отсортирован по дням недели
(от понедельника к воскресенью). 
*/


function mostFrequentDays(year) {
    let codes = ["понедельник", "вторник", "среда", "четверг", "пятница", "субота", "воскресенье"];
    let mas = [0,0,0,0,0,0,0];
    //let codes = ["субота", "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница"];
    //first_day = codes[(2 + ~~((6 + +String(year).slice(-2) + +String(year).slice(-2)/4) % 7 )) % 7];
    first_day = (2 + ((6 + +String(year).slice(-2) + Math.floor(+String(year).slice(-2)/4)) % 7 )) % 7 - 2;
    
    let num_days = ((year % 4 === 0) ? (first_day--, 366) : 365);
    
    first_day = first_day > 0 ? first_day : first_day + 7;
    console.log(codes[first_day])
    let index = first_day;
    for (let i = 0; i < num_days; i++) {
        mas[index]++;
        (index === 6) ? index = 0 : index++;
    }

    let max = Math.max(...mas);
    let days = [];
    mas.forEach((el, i) => {el === max ? days.push(i) : null });
 
    console.log(mas);
    return days.map(i => codes[i]);
}


console.log(mostFrequentDays(2016)); // ["пятница"]
console.log(mostFrequentDays(2019)); // ["вторник", "среда"]
console.log(mostFrequentDays(2020)); // ["среда"]

/*
Задача генерацию случайного постфикса
На вход получаем значение, для которого нужно сгенерировать постфикс. Если
постфикс уже запрашивался ранее - возвращаем его.
Если нет - генерируем строку заданной длины, с заданным префиксом. В качестве
рандомных символов могут быть буквы латинского алфавита в малом регистре и цифры.
*/

function genRandomPostfix(prefix, num) {
    let codes = [];
    let symbols = [];
    for (let i = 48; i < 123; i++) {
        symbols.push(String.fromCharCode(i));
        if (i === 57) i = 96;
    }
    
    return function(str) {
        for (let o of codes) {
            if (o.basic_str === str) return o.code;
        }
        let obj = {};
        obj.basic_str = str;
        obj.code = prefix;
        
        for (let i = 0; i < num; i++) {
            obj.code += symbols[~~(Math.random()*(symbols.length - 1))];
        }
        codes.push(obj);
        return obj.code;
    }
}

const getRandomString = genRandomPostfix('_prefix_', 4);

//_prefix_ag6t - это пример, последние 4 цифры могут быть любые
console.log(getRandomString('5689u'));

//_prefix_56po  - это пример, последние 4 цифры могут быть любые
console.log(getRandomString('1iuo'));

// _prefix_ag6t - это пример, последние 4 цифры могут быть любые, но должно
// совпадать с первым console.log
console.log(getRandomString('5689u'));


function redir() {
    // Simulate a mouse click:
    window.location.href = "http://www.w3schools.com";
    
    // Simulate an HTTP redirect:
    window.location.replace("http://www.w3schools.com");
}

//redir();


let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// срабатывает сеттер!
admin.fullName = "Alice Cooper"; // (**)
console.log(admin.name); // Alice
console.log(admin.surname); // Cooper

console.log(user.surname); // Smith


function m() {
    this.test = "test"
}

m.prototype.hello = "hello";
console.log(m.prototype);
console.dir(m.__proto__);
console.log(new m());


/* https://www.youtube.com/watch?v=KrOBpFwwlGQ */

function getRandomArr() {
    let arr = [];
    for (let i = 0; i < 100; i++) {
        let num = Math.floor(Math.random()*199 + 1);
        if (!arr.includes(num)) arr.push(num);
        else i--;
    }
    return arr;
}

console.log(getRandomArr());


// Вторая задача

function getFullArr(arr) {
    for (let i = arr.length - 1, j = 4; i >= 0; i -=2, j--) {
        arr[i] = arr[i-1] = arr[j];
    }
    return arr;
}

console.log(getFullArr([1,2,3,4,5,0,0,0,0,0]));

// Третья задача

function checkArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return true;
        }
    }
    return false;
}

console.log(checkArr([1,2,3,4,5,0,0,0]));

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