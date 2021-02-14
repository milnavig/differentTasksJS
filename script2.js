/* Алгоритм Дейкстры */

var graph = [[0, 2, 4, 0, 0, 0],
             [0, 0, 1, 4, 2, 0],
             [0, 0, 0, 0, 3, 0],
             [0, 0, 0, 0, 0, 2],
             [0, 0, 0, 3, 0, 2],
             [0, 0, 0, 0, 4, 0]];

var minDistance = function(dist, visited){
    var min = Infinity, minIndex = -1;
    for (var v = 0; v < dist.length; v++){
        if (visited[v] == false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
            //console.log(minIndex);
        }
    }
    return minIndex;
};

var dijkstra = function(src){
    var dist = [], visited = [], length = graph.length;
    
    for (var i = 0; i < length; i++) { 
        dist[i] = Infinity;
        visited[i] = false;
    }
    
    dist[src] = 0; 
    for (var i = 0; i < length-1; i++) { 
        var u = minDistance(dist, visited); 
        visited[u] = true; 
        for (var v = 0; v < length; v++) {
            if (!visited[v] && graph[u][v]!=0 && dist[u] != Infinity && dist[u]+this.graph[u][v] < dist[v]){ 
                dist[v] = dist[u] + this.graph[u][v]; 
            }
        }
    }
    return dist; 
};

console.log(dijkstra(0));

let RADIUS = 30;
let WIDTH = 500;
let HEIGHT = 500;


function setStructure(mas) {
    let arr = [];
    let center_points =[];
    mas.forEach((node, i) => {
        let obj = {};
        obj.id = i;
        
        let temp = true;
        mark: while (temp) {
            obj.x_pos = Math.random() * (WIDTH - 2*RADIUS) + RADIUS;
            obj.y_pos = Math.random() * (HEIGHT - 2*RADIUS) + RADIUS;
            for (c of center_points) {
                if (((obj.x_pos - c[0])**2 + (obj.y_pos - c[1])**2)**0.5 <= RADIUS*2) continue mark;
            }
            temp = false;
        }
        
        obj.relatives = node;
        center_points.push([obj.x_pos, obj.y_pos]);
        arr.push(obj);
    });
    
    return arr;
}

function drawSVG(struct) {
    for (let node of struct) {
        console.log("hello")
        
        
        let counter = 0
        for (r of node.relatives) {
            if (r !== 0) {
                let l1 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
                l1.setAttributeNS(null, 'x1', node.x_pos);
                l1.setAttributeNS(null, 'y1', node.y_pos);
                l1.setAttributeNS(null, 'x2', struct[r].x_pos);
                l1.setAttributeNS(null, 'y2', struct[r].y_pos);
                l1.setAttributeNS(null, 'style', 'stroke:rgb(255,0,0);stroke-width:2');
                mySVG.append(l1);
                
            }
            counter++;
        }
        
        let c1 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        c1.setAttributeNS(null, 'cx', node.x_pos);
        c1.setAttributeNS(null, 'cy', node.y_pos);
        c1.setAttributeNS(null, 'r', RADIUS);
        c1.setAttributeNS(null, 'style', 'fill: yellow; stroke: blue; stroke-width: 1px;');
        mySVG.append(c1);
        
        let t1 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        t1.setAttributeNS(null, 'x', node.x_pos);
        t1.setAttributeNS(null, 'y', node.y_pos);
        t1.setAttributeNS(null, 'fill', 'red');
        t1.textContent = node.id;
        mySVG.append(t1);
    }
}

drawSVG(setStructure(graph));


// Сортировки

// Bubble sort

function ArrayList(){
    var array = []; 
    this.insert = function(item) { 
        array.push(item);
    };
    this.toString= function() {
        return array.join();
    };
    
    var swap = function(array, index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };
    
    this.bubbleSort = function(){
        var length = array.length;
        for (var i=0; i<length; i++){ 
            for (var j=0; j<length-1; j++ ){ 
                if (array[j] > array[j+1]){ 
                    swap(array, j, j+1); 
                }
            }
        }
    };
    
    this.modifiedBubbleSort = function(){
        var length = array.length;
        for (var i=0; i<length; i++) {
            for (var j=0; j<length-1-i; j++) { 
                if (array[j] > array[j+1]) {
                    swap(array, j, j+1);
                }
            }
        }
    };
    
    this.modifiedBubbleSort2 = function(){
        var length = array.length;
        for (var i=0; i<length; i++) {
            let flag = 0;
            for (var j=0; j<length-1-i; j++) { 
                if (array[j] > array[j+1]) {
                    swap(array, j, j+1);
                    flag++;
                }
            }
            if (!flag) break;
        }
    };
    
    this.selectionSort = function(){ // Selection sort
        var length = array.length, 
        indexMin;
        for (var i=0; i<length-1; i++){ 
            indexMin = i; 
            for (var j=i; j<length; j++){ 
                if(array[indexMin]>array[j]){ 
                    indexMin = j; 
                }
            }
            if (i !== indexMin){ 
                swap(array, i, indexMin);
            }
        }
    };
    
    this.insertionSort = function(){
        var length = array.length, 
        j, temp;
        for (var i=1; i<length; i++){ 
            j = i; 
            temp = array[i];
            while (j>0 && array[j-1] > temp){ 
                array[j] = array[j-1]; 
                j--;
            }
            array[j] = temp; 
        }
    };
    
    var merge = function(left, right){
        var result = [], 
        il = 0,
        ir = 0;

        while(il < left.length && ir < right.length) { 
            if(left[il] < right[ir]) {
                result.push(left[il++]); 
            } else{
                result.push(right[ir++]); 
            }
        }

        while (il < left.length){ 
            result.push(left[il++]);
        }

        while (ir < right.length){ 
            result.push(right[ir++]);
        }
        return result; 
    };
    
    var mergeSortRec = function(array){
        var length = array.length;
        if (length === 1) { 
            return array; 
        }
        var mid = Math.floor(length / 2), 
        left = array.slice(0, mid), 
        right = array.slice(mid, length); 
        
        return merge(mergeSortRec(left), mergeSortRec(right)); 
    };
    
    this.mergeSort = function(){
        array = mergeSortRec(array);
    };
    
    var partition = function(array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)], 
        i = left, 
        j = right; 
        while (i <= j) { 
            while (array[i] < pivot) { 
                i++;
            }
            while (array[j] > pivot) { 
                j--;
            }
            if (i <= j) { 
                swap(array, i, j); 
                i++;
                j--;
            }
        }
        return i; 
    };
    
    var quick = function(array, left, right){
        var index;
        if (array.length > 1) { 
            index = partition(array, left, right); 
            if (left < index - 1) { 
                quick(array, left, index - 1); 
            }
            if (index < right) { 
                quick(array, index, right); 
            }
        }
    };
    
    this.quickSort = function(){
        quick(array, 0, array.length - 1);
    };
    
    var heapify = function(array, heapSize, i){
        var left = i * 2 + 1,
        right = i * 2 + 2,
        largest = i;
        if (left < heapSize && array[left] > array[largest]) {
            largest = left;
        }
        if (right < heapSize && array[right] > array[largest]) {
            largest = right;
        }
        if (largest !== i) {
            swap(array, i, largest);
            heapify(array, heapSize, largest);
        }
    };
    
    var buildHeap = function(array){
        var heapSize = array.length;
        for (var i = Math.floor(array.length / 2); i >= 0; i--) {
            heapify(array, heapSize, i);
        }
    };
    
    this.heapSort = function(){
        var heapSize = array.length;
        buildHeap(array); 
        while (heapSize > 1) {
            heapSize--;
            swap(array, 0, heapSize); 
            heapify(array, heapSize, 0); 
        }
    };
}

function createNonSortedArray(size){ 
    var array = new ArrayList();
    for (var i = size; i > 0; i--) {
        array.insert(i);
    }
    return array;
}
var array = createNonSortedArray(5);
console.log(array.toString());
//array.bubbleSort(); 
//array.modifiedBubbleSort(); 
//array.modifiedBubbleSort2(); 
//array.selectionSort(); 
//array.insertionSort(); 
//array.mergeSort();
array.quickSort();
//array.heapSort();

console.log(array.toString());
















