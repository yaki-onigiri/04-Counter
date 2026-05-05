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

function updateDisplay() {
    countEl.textContent = count;

    animateCount();
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

function animateCount() {
    countEl.classList.remove("pop");
    void countEl.offsetWidth;
    countEl.classList.add("pop");
}