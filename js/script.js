const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const resetBtn = document.getElementById("resetBtn");

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


// Task5-3: カウントが +1 → 緑、-1 → 赤になるように条件分岐で関数を分ける
function updateDisplay(step) {

    countEl.textContent = count;

    if (step > 0) {
        animateCount("up");
    }

    if (step < 0) {
        animateCount("down");
    }
}

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

    // Task5-4:  step で+1/-1された数字を画面に表示するコードを追加修正
    // updateDisplay() → updateDisplay(step)
    updateDisplay(step);
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

    pressStartTime = Date.now();

    timerId = setTimeout(() => {
        isLongPress = true;

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

// function animateCount() {
//     countEl.classList.remove("pop");
//     void countEl.offsetWidth;
//     countEl.classList.add("pop");

//     // Task5-2: 現在の状態がわかる視覚フィードバックを追加する
//     countEl.classList.add("count-up");

//     countEl.classList.add("flash-up");

//     setTimeout(() => {
//         countEl.classList.remove("count-up");
    
//         countEl.classList.remove("flash-up");

//     }, 200);
// }

// 上記のコードでは、-1ボタン押下でも+1ボタン押下したように緑色のアニメーションが付くので、以下のように修正。

function animateCount(type) {

    countEl.classList.remove("pop");
    countEl.classList.remove("flash-up");
    countEl.classList.remove("flash-down");

    void countEl.offsetWidth;

    countEl.classList.add("pop");

    if (type === "up") {
        countEl.classList.add("flash-up");
    }

    if (type === "down") {
        countEl.classList.add("flash-down");
    }

    // Task5-5. +1/-1ボタンをそれぞれ押した瞬間の色・アニメーションを追加
    setTimeout(() => {
        countEl.classList.remove("flash-up");
        countEl.classList.remove("flash-down");
    }, 200);
}