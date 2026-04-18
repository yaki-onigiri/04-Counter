const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;
let isPressing = false;
let intervalId;

// 「長押し＋クリック」が重複してカウントがズレるのを防ぐ.1
let isLongPress = false;

function updateDisplay() {
    countEl.textContent = count;
}

incrementBtn.addEventListener("click", function() {

    if (isLongPress) return;

    count++;
    updateDisplay();
});

incrementBtn.addEventListener("mousedown", () => {

    // どんな状態でも一旦リセットしてから始めるためのコード
    clearInterval(intervalId);

    // interval の多重起動を防ぐためのコード
    if (isPressing) return;

    // ボタン長押しを検知するためのコード②
    isPressing = true;

    isLongPress = false;

    intervalId = setInterval(() => {

        isLongPress = true;

        if (isPressing) {
            count++;
            updateDisplay();
        }
    }, 200);
});

// ボタン長押し中にカーソルがボタン外に出たときカウントを停止するコード
// incrementBtn.addEventListener("mouseleave", () => {
//     isPressing = false;
//     clearInterval(intervalId);
// });

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

    // どんな状態でも一旦リセットしてから始めるためのコード
    clearInterval(intervalId);

    if (isPressing) return;
    isPressing = true;

    // 「長押し＋クリック」が重複してカウントがズレるのを防ぐ.2
    isLongPress = false;

    intervalId = setInterval (() => {

        isLongPress = true;

        if (isPressing && count > 0) {
            count--;
            updateDisplay();
        }
    }, 200);
});

// ボタンからカーソルが外れてもカウントが止まらないバグを防ぐ
// decrementBtn.addEventListener("mouseleave", function () {
//     clearInterval(decrementInterval);
// });

// 減算用の長押しイベント2⃣-2
document.addEventListener("mouseup", () => {
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