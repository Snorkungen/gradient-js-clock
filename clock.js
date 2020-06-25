//This project a simple javascript made complicated
//Also includes a gradient that corresponds with the clock
// Oghenochuko Oke 21/06/2020

// text 
const text = {
    button1: "Sätt igång klockan!",
    button2: "Stanna klockan!",
    info1: "Klockan var stannad",
    info2: "sekunder."
}

// Tiny kinda useful functions
let msToS = n => n / 1000, // milliseconds to seconds
    genRGBhour = H => (H + 1) * 10.625, // generate a value from the range 1 - 255 using hour
    genRGB = n => (n + 1) * 4.25, // generate a value from the range 1 - 255 usin value 0 - 59
    createEl = (el, parent) => parent.appendChild(document.createElement(el)); // creates and appends elemnt

//setup
let p;// stores date.now() for usage in pause method
let clock = document.getElementById("clock"); // selects clock div
let info = document.getElementById("info"); // selects info element
let e = createEl("h2", clock)//, b = createEl("button", clock); // creates an h2 and a button
function infoFunc(txt) {
    info.style.display = "block";
    info.textContent = txt;
    setTimeout(() => { info.style.display = "none" }, (1000 * 9))
}

function pause() {
    clearInterval(run);
    b.textContent = text.button1;
    b.setAttribute("onclick", "start()");
    pauseTimer("pause");
}


let pauseTimer = (method) => {
    if (method == "pause") p = Date.now()
    else {
        let x = Date.now() - p;
        infoFunc(`${text.info1} ${msToS(x)} ${text.info2}`);
    }

}

function start(m) {
    b.textContent = text.button2
    b.setAttribute("onclick", "pause()")
    run = setInterval(main, 1000);
    if (m == "start") console.log("clock started")
    else pauseTimer("unpause")
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
    let gradient = `linear-gradient(45deg,${gIn1},${gIn2},${gIn3})`;
    clock.style.background = gradient + ' no-repeat';
}
let run;
start("start");
