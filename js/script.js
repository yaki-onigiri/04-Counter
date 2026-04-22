const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;
let isPressing = false;
let isLongPress = false;

let pressStartTime = 0;

// 長押し時のカウント速度を段階的に加速させる
// タスク1：setTimeout の管理を統一する
let timerId;
clearTimeout(timerId);

function updateDisplay() {
    countEl.textContent = count;
}

function getInterval(duration) {

    if (duration < 1000) return 300;

    if (duration < 3000) return 100;

    return 50;

}

function startCountingIncrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    count++;
    updateDisplay();

    // 長押し時のカウント速度を段階的に加速させる
    // タスク2：再帰処理を修正
    // intervalId ⇒ timerId に修正
    timerId = setTimeout(startCountingIncrement, interval);
}


function startCountingDecrement() {
    const duration = Date.now() - pressStartTime;
    const interval = getInterval(duration);

    if (count > 0) {
        count--;
        updateDisplay();
    }
    
    // 長押し時のカウント速度を段階的に加速させる
    // タスク3：再帰処理を修正
    // intervalId ⇒ timerId に修正
    timerId = setTimeout(startCountingDecrement, interval);
}

incrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    count++;
    updateDisplay();
});

incrementBtn.addEventListener("mousedown", () => {

    pressStartTime = Date.now();

    clearTimeout(timerId);

    if (isPressing) return;

    isPressing = true;
    isLongPress = false;

    // 長押し時のカウント速度を段階的に加速させる
    // タスク1：setTimeout の管理を統一する
    // +1ボタン0.5秒長押しで連続カウント機能が発動
    timerId = setTimeout(() => {
        isLongPress = true;
        startCountingIncrement();
    }, 500);
});

decrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    if (count > 0) {
        count--;
    }
    
    updateDisplay();
});

decrementBtn.addEventListener("mousedown", () => {

    pressStartTime = Date.now();

    clearTimeout(timerId);

    if (isPressing) return;

    isPressing = true;
    isLongPress = false;

    // 長押し時のカウント速度を段階的に加速させる
    // タスク1：setTimeout の管理を統一する
    // -1ボタン0.5秒長押しで連続カウント機能が発動
    timerId = setTimeout(() => {
        isLongPress = true;
        startCountingDecrement();
    }, 500);
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