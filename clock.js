//This project a simple javascript made complicated
//Also includes a gradient that corresponds with the clock
// Oghenochuko Oke 21/06/2020

// Tiny kinda useful functions
let msToS = n => n / 1000, // milliseconds to seconds
    genRGBhour = H => (numberScramble(H) + 1) * 10.625, // generate a value from the range 1 - 255 using hour
    genRGB = n => (numberScramble(n) + 1) * 4.25, // generate a value from the range 1 - 255 usin value 0 - 59
    createEl = (el, parent) => parent.appendChild(document.createElement(el)); // creates and appends elemnt

//setup
let p; // stores date.now() for usage in pause method
let clock = document.getElementById("clock"); // selects clock div
let gradientC = document.getElementById("gradient"); // selects clock div
let info = document.getElementById("info"); // selects info element
let e = createEl("h2", clock); //, b = createEl("button", clock); // creates an h2 and a button

function start(m) {
    main();
    run = setInterval(main, 1000);
    console.log("clock started");
}

function hsl (h,m,s) {
    return `hsl(${(m*s/2)*4},100%,${h*4.1666}%)`;
}

function numberScramble (n) {
    let temp = n * 0.3244;
    temp += 1;
    temp *= 0.2467;
    temp *= temp;
    return temp * 4;
}

function makeTwoDigit(num) {
    let x = num.toString();
    if (x.length >= 2) return x
    else return "0" + x;
}

let formatedTime = o => {
    return {
        min: makeTwoDigit(o.min),
        sec: makeTwoDigit(o.sec),
        H: makeTwoDigit(o.H)
    }
}

let getTime = () => {
    let date = new Date();
    let min = date.getMinutes(),
        sec = date.getSeconds(),
        H = date.getHours();

    return {
        min,
        sec,
        H
    }
}

function main() {
    let n = getTime(),
        t = formatedTime(n);

    e.textContent = `${t.H}:${t.min}:${t.sec}`;
    let gIn1 = `rgb(${genRGBhour(n.H)},${genRGB(n.min)},${genRGB(n.sec)})`,
        gIn2 = `rgb(${genRGB(n.min)},${genRGBhour(n.H)},${genRGB(n.sec)})`,
        gIn3 = `rgb(${genRGB(n.sec)},${genRGBhour(n.H)},${genRGB(n.min)})`;
    let gradient = `linear-gradient(90deg,${gIn1},${gIn2},${gIn3})`;
    gradientC.style.background = gradient + ' no-repeat';
    bbLoop(14,hsl(n.H,n.sec,n.min))
    //bbLoop(12,`linear-gradient(60deg,${gIn1},${gIn2},${gIn3})`)
}
let run;
start("start");

function bbLoop(count, grad) {
    let z = 1000 / count,
    t = 0;
    for (let i = 0; i < count; i++) {
        setTimeout(()=>{createBubble(grad);},t)
        t+=z
    }
}

function createBubble(g) {
    let el = createEl("span", gradientC);
    let size = Math.random() * 60 + 18;

    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.left = Math.random() * innerWidth - size + "px";
    el.style.background = g;
    setTimeout(() => {
        el.remove();
    },5000)
}