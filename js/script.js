const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");



// Task3-1. コードの意味を見やすくする整理（マジックナンバー）
const STAGE1_DURATION = 1000;
const STAGE2_DURATION = 2500;

const STAGE1_INTERVAL = 250;
const STAGE2_INTERVAL = 130;
const STAGE3_INTERVAL = 80;



let count = 0;
let isPressing = false;
let isLongPress = false;
let pressStartTime = 0;
let timerId;

function updateDisplay() {
    countEl.textContent = count;
}

// Task2. ボタン長押しによるカウント増算・減算の速度の段差を滑らかにする
// function getInterval(duration) {
//     if (duration < 1500) return 300;
//     if (duration < 3500) return 100;
//     return 70;
// }

// function getInterval(duration) {
//     if (duration < 1000) return 250;
//     if (duration < 2500) return 130;
//     return 80;
// }

// Task3-2. コードの意味を見やすくする整理（マジックナンバー）
function getInterval(duration) {
    if (duration < STAGE1_DURATION) return STAGE1_INTERVAL;
    if (duration < STAGE2_DURATION) return STAGE2_INTERVAL;
    return STAGE3_INTERVAL;
}

function changeCount(step) {

    count += step;

    if (count < 0) {
        count = 0;
    }
    updateDisplay();
}

function startCounting(step) {

    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    changeCount(step);

    timerId = setTimeout(() => {
        startCounting(step);
    }, interval);
}

function startLongPress(step) {

    clearTimeout(timerId);

    if (isPressing) return;

    isPressing = true;
    isLongPress = false;

    // ユーザー視点での長押し判定のズレをなくすために、この位置にコードを入力。
    pressStartTime = Date.now();

    timerId = setTimeout(() => {
        isLongPress = true;

        // ここから「長押し継続時間」を測定開始
        // pressStartTime = Date.now();
            // ここにこのコードを入力すると、ユーザー視点での長押し判定に0.5秒のズレが生じる。

        startCounting(step);
    }, 500);
}

incrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    changeCount(1);
});

incrementBtn.addEventListener("mousedown", () => {
    startLongPress(1);
});

decrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    changeCount(-1);
});

decrementBtn.addEventListener("mousedown", () => {
    startLongPress(-1);
});

document.addEventListener("mouseup", () => {

    isPressing = false;
    isLongPress = false;

    clearTimeout(timerId);
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});