const NUM_ITERATIONS = 2000;
const TIME_INTERVAL = 10;

let step = TIME_INTERVAL / NUM_ITERATIONS;
let init_time = 0;

let dx1 = 0.15;
let dx2 = 0.25;

const k1 = 100, k2 = 100;
const ix1 = 0.1, ix2 = 0.2;

const m1 = 1, m2 = 1;

let z1 = 0, z2 = 0;

let f1 = (dx1, dx2) => {
    return (k2*((dx2 - dx1) - (ix2 - ix1)) - k1*(dx1 - ix1))/m1;
}

let f2 = (dx1, dx2) => {
    return (-k2*((dx2 - dx1) - (ix2 - ix1)))/m2;
}

//let res = "sep =, \n";
let res = '';

let time = 0;

let runge_kutt = () => {
    let g0 = z1;
    let l0 = f1(dx1, dx2);
    
    let m0 = z2;
    let e0 = f2(dx1, dx2);
    
    
    let g1 = z1 + l0*step/2;
    let l1 = f1(dx1 + g0*step/2, dx2 + m0*step/2);
    
    let m1 = z2 + e0*step/2;
    let e1 = f2(dx1 + g0*step/2, dx2 + m0*step/2);
    
    
    let g2 = z1 + l1*step/2;
    let l2 = f1(dx1 + g1*step/2, dx2 + m1*step/2);
    
    let m2 = z2 + e1*step/2;
    let e2 = f2(dx1 + g1*step/2, dx2 + m1*step/2);
    
    
    let g3 = z1 + l2*step/2;
    let l3 = f1(dx1 + g2*step, dx2 + m2*step);
    
    let m3 = z2 + e2*step/2;
    let e3 = f2(dx1 + g2*step, dx2 + m2*step);
    
    
    let speed1 = z1+ (step/6) * (l0 + 2*l1 + 2*l2 + l3);
    dx1 = dx1 + (step/6) * (g0 + 2*g1 + 2*g2 + g3);
    
    let speed2 = z2 + (step/6) * (e0 + 2*e1 + 2*e2 + e3);
    dx2 = dx2 + (step/6) * (m0 + 2*m1 + 2*m2 + m3);
    
    z1 = speed1;
    z2 = speed2;
    
    //res += time + ',' + dx1 + '\n';
    res += time + ',' + dx2 + '\n';
    //res += time + ',' + speed1 + '\n';
    //res += time + ',' + speed2 + '\n';
    
    time += step;
    
}

for (let i = 0; i < NUM_ITERATIONS; i++) {
    runge_kutt();
}

console.log(res)