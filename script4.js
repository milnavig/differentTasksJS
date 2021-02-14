/*
Прислал Dmitriy Zhukov, задача с реального собеседования.

Мы получаем массив строк, состоящих из интервалов натуральных чисел, разделённых
дефисом ('1-5'). Нужно вернуть массив строк в таком же формате, но склеив
пересекающиеся интервалы.
*/
function intersect(arr) {
    /* Первый вариант
    for (let i = 0; i < arr.length; i++) {
      let [n1, n2] = arr[i].split('-');
      for (let j = i + 1; j < arr.length; j++) {
          let [p1, p2] = arr[j].split('-');
          if (p1 <= n2 && p1 >= n1 && p2 <= n2) { // [3, 7] [4, 6]
              arr.splice(j, 1, arr[i]);
              arr.splice(i, 1);
              break;
          } else if (p1 <= n2 && p1 >= n1 && p2 > n2) {
              n2 = p2;
              arr.splice(j, 1, [n1, n2].join('-')); // [3, 7] [4, 9]
              arr.splice(i, 1);
              break;
          } else if (p1 <= n1 && p2 <= n2 && p2 >= n1) {
              n1 = p1;
              arr.splice(j, 1, [n1, n2].join('-')); // [4, 6] [3, 5]
              arr.splice(i, 1);
              break;
          } else if (p1 <= n1 && p2 > n2 && p2 >= n1) {
              n1 = p1;
              n2 = p2;
              arr.splice(j, 1, [n1, n2].join('-')); // [4, 6] [3, 9]
              arr.splice(i, 1);
              break;
          }
      }
    }
    return arr;
    */
    
    // O(n)
    //return arr.sort((x, y) => x.split('-')[0] - y.split('-')[0]);
    let mas = arr.map(x => x.split('-')).sort((x, y) => x[0] - y[0]);
    
    let res = [];
    while(mas.length) {
        let first_item = mas.slice(0, 1)[0];
        let temp = [first_item[0], first_item[1]];
        let help_arr = [];
        
        for (let i = 0; i < mas.length; i++) {
            if (+first_item[1] < +mas[i][0]) {
                help_arr.push(...mas.slice(i));
                break;
            }
            
            if (+first_item[1] < +mas[i][1]) temp[1] = mas[i][1];
        }
        
        res.push(temp);
        mas = help_arr.slice();
    }
    return res.map(x => x.join('-'));
}

console.log(intersect(['1-5', '7-9', '2-6', '10-12', '8-8']));     // ['1-6', '7-9']
console.log(intersect(['2-4', '5-5', '5-15']));    // ['2-4', '5-15']
console.log(intersect([]));  


/*
Доминантные элементы массива.
Доминантным является элемент массива, который больше, чем все элементы, 
следующих за ним. 
Напишите функцию, которая принимает массив чисел и возвращает массив из 
доминантных чисел.
*/
function solve(arr) {
    let max = arr[arr.length - 1];
    return arr.reduceRight((accum, el, i) => {
        if (el > max) {
            max = el;
            return accum.concat(el);
        }
        return accum;
    }, [max]).reverse();
}

console.log(solve([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve([92,52,93,31,89,87,77,105])); // [105]
console.log(solve([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve([67,54,27,85,66,88,31,24,49])); // [88, 49]






























