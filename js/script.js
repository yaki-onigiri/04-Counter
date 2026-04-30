const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;
let isPressing = false;
let isLongPress = false;
let pressStartTime = 0;
let timerId;

function updateDisplay() {
    countEl.textContent = count;
}

function getInterval(duration) {

    // ⓵Task2. getInterval の加速差を分かりやすくする
    if (duration < 1500) return 300;

    if (duration < 3500) return 100;

    return 70;
}

// Task1. count の増減処理を共通関数にまとめる
function changeCount(step) {

    count += step;

    if (count < 0) {
        count = 0;
    }
    updateDisplay();
}

// Task2-1. 「click処理」と「長押し連続処理」を changeCount() に差し替える
function startCounting(step) {

    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    changeCount(step);

    timerId = setTimeout(() => startCounting(step), interval);

    // console.log("duration", duration, "interval", interval);
}

// Task3-1. 使わなくなった旧関数を削除する
// function startCountingDecrement() {
//     const duration = Date.now() - pressStartTime;
//     const interval = getInterval(duration);

//     if (count > 0) {
//         count--;
//         updateDisplay();
//     }
    
//     timerId = setTimeout(startCountingDecrement, interval);
// }

function startLongPress(step) {

    clearTimeout(timerId);

    if (isPressing) return;

    isPressing = true;
    isLongPress = false;

    timerId = setTimeout(() => {
        isLongPress = true;
        pressStartTime = Date.now();
        startCounting(step);
    }, 500);
}

incrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    // Task2-2. 「click処理」と「長押し連続処理」を changeCount() に差し替える
    changeCount(1);
});

incrementBtn.addEventListener("mousedown", () => {
    startLongPress(1);
});

decrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    // Task2-3. 「click処理」と「長押し連続処理」を changeCount() に差し替える
    changeCount(-1);
});

decrementBtn.addEventListener("mousedown", () => {
    startLongPress(-1);
});

document.addEventListener("mouseup", () => {

    // Task4. 使わなくなった関数を削除（小修整）
    // const duration = Date.now() - pressStartTime;
    // console.log(duration);

    isPressing = false;
    isLongPress = false;

    clearTimeout(timerId);
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});