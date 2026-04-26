const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;
let isPressing = false;
let isLongPress = false;

let pressStartTime = 0;

let timerId;

// ⓶小修整点：意味がないため削除
// clearTimeout(timerId);

function updateDisplay() {
    countEl.textContent = count;
}

function getInterval(duration) {

    // ⓵Task2. getInterval の加速差を分かりやすくする
    if (duration < 1500) return 300;

    if (duration < 3500) return 100;

    return 70;

}

function startCountingIncrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    count++;
    updateDisplay();

    timerId = setTimeout(startCountingIncrement, interval);

    // ⓵Task3. 今どの速度段階か、を console に出す（確認用コード）
    console.log("duration", duration, "interval", interval);
}


function startCountingDecrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    if (count > 0) {
        count--;
        updateDisplay();
    }
    
    timerId = setTimeout(startCountingDecrement, interval);
}

// ⓶コードの重複整理のためのコード
// Task1. startCountingIncrement / Decrement を統一する
function startCounting(step) {

    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    count += step;

    if (count < 0) count = 0;

    updateDisplay();

    timerId = setTimeout(() => startCounting(step), interval);
}

// ⓶コードの重複整理のためのコード
// Task2. mousedown の長押し開始処理を統一する
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

    count++;
    updateDisplay();
});

// ⓶コードの重複整理のためのコード
// Task2. mousedown の長押し開始処理を統一する
// そのため、mousedown のコードは削除・修正する

// incrementBtn.addEventListener("mousedown", () => {

//     // ⓵「0.5秒の待機時間」を加速計算から除外するため
//     // Task1. この部分のコードを timerId = setTimeout 内に移す
//     // pressStartTime = Date.now();

//     clearTimeout(timerId);

//     if (isPressing) return;

//     isPressing = true;
//     isLongPress = false;

//     timerId = setTimeout(() => {
//         isLongPress = true;

//         // Task1. この部分のコードを timerId = setTimeout 内に移す
//         pressStartTime = Date.now();

//         startCountingIncrement();
//     }, 500);
// });

incrementBtn.addEventListener("mousedown", () => {
    startLongPress(1);
});

decrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    if (count > 0) {
        count--;
    }
    
    updateDisplay();
});

// ⓶コードの重複整理のためのコード
// Task2. mousedown の長押し開始処理を統一する
// そのため、mousedown のコードは削除・修正する

// decrementBtn.addEventListener("mousedown", () => {

//     // ⓵「0.5秒の待機時間」を加速計算から除外するため
//     // Task1. この部分のコードを timerId = setTimeout 内に移す
//     // pressStartTime = Date.now();

//     clearTimeout(timerId);

//     if (isPressing) return;

//     isPressing = true;
//     isLongPress = false;

//     timerId = setTimeout(() => {
//         isLongPress = true;

//         // ⓵「0.5秒の待機時間」を加速計算から除外するため
//         // Task1. この部分のコードを timerId = setTimeout 内に移す
//         pressStartTime = Date.now();

//         startCountingDecrement();
//     }, 500);
// });

decrementBtn.addEventListener("mousedown", () => {
    startLongPress(-1);
});

document.addEventListener("mouseup", () => {

    const duration = Date.now() - pressStartTime;
    console.log(duration);

    isPressing = false;
    isLongPress = false;

    clearTimeout(timerId);
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});