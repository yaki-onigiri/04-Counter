const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;
let isPressing = false;
let intervalId;
let isLongPress = false;

// +1/-1ボタンの長押し時にカウント速度を段階的に加速させる⓵-1
let pressStartTime = 0;

let timerId;

function updateDisplay() {
    countEl.textContent = count;
}

// +1/-1ボタンの長押し時にカウント速度を段階的に加速させる⓶
function getInterval(duration) {

    if (duration < 1000) return 300;
        // 1秒未満長押し：最初はゆっくり

    if (duration < 3000) return 100;
        // 3秒未満長押し：少し早く

    return 50;
        // 3秒以上：かなり早く
}

function startCountingIncrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    count++;
    updateDisplay();

    timerId = setTimeout(startCounting, interval);
}

function startCountingDecrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    if (count > 0) {
        count--;
        updateDisplay();
    }
    intervalId = setTimeout(startCountingDecrement, interval);
}

incrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    count++;
    updateDisplay();
});

incrementBtn.addEventListener("mousedown", () => {

    // // +1/-1ボタンの長押し時にカウント速度を段階的に加速させる⓵-2
    pressStartTime = Date.now();

    // どんな状態でも一旦リセットしてから始めるためのコード
    clearInterval(intervalId);

    // interval の多重起動を防ぐためのコード
    if (isPressing) return;

    // ボタン長押しを検知するためのコード②
    isPressing = true;

    isLongPress = false;

    startCountingIncrement();
});

decrementBtn.addEventListener("click", function() {

    // 「長押し＋クリック」が重複してカウントがズレるのを防ぐ.4
    if (isLongPress) return;

    if (count > 0) {
        count--;
    }
    
    updateDisplay();
});

// 減算用の長押しイベント1⃣
decrementBtn.addEventListener("mousedown", () => {

    // +1/-1ボタンの長押し時にカウント速度を段階的に加速させる⓵-3
    pressStartTime = Date.now();

    // どんな状態でも一旦リセットしてから始めるためのコード
    clearInterval(intervalId);

    if (isPressing) return;
    isPressing = true;

    // 「長押し＋クリック」が重複してカウントがズレるのを防ぐ.2
    isLongPress = false;
});

// 減算用の長押しイベント2⃣-2
document.addEventListener("mouseup", () => {

    // // +1/-1ボタンの長押し時にカウント速度を段階的に加速させる⓵-4
    const duration = Date.now() - pressStartTime;
    console.log(duration);

    isPressing = false;
    isLongPress = false;

    clearInterval(intervalId);
    // clearInterval(decrementInterval);

    intervalId = null;
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});