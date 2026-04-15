const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;

// ボタン長押しを検知するためのコード①
let isPressing = false;

// ボタン長押ししている間だけ連続カウントするコード①
let intervalId;

// ボタンを長押しした場合のclickを無効化するコード①
let isLongPress = false;

function updateDisplay() {
    countEl.textContent = count;
}

incrementBtn.addEventListener("click", function() {

    // ボタンを長押しした場合のclickを無効化するコード③
    if (isLongPress) return;

    count++;
    updateDisplay();
});

// ボタン長押ししている間だけ連続カウントするコード②-1
incrementBtn.addEventListener("mousedown", () => {

    // interval の多重起動を防ぐためのコード
    if (isPressing) return;

    // ボタン長押しを検知するためのコード②
    isPressing = true;

    isLongPress = false;

    intervalId = setInterval(() => {

        // ボタンを長押しした場合のclickを無効化するコード②
        isLongPress = true;

        // ボタン長押ししている間だけ連続カウントするコード②-2
        if (isPressing) {
            count++;
            updateDisplay();
        }
    }, 200);
});

// ボタン長押し終了で停止するコード
document.addEventListener("mouseup", () => {
    isPressing = false;
    clearInterval(intervalId);

    // バグ調査をしやすくするため、状態をリセットするコード
    intervalId = null;
});
    // increment ⇒ document にすることで、カーソルがボタン外になっても連続カウントが検知されるコードになる

// ボタン長押し中にカーソルがボタン外に出たときカウントを停止するコード
// incrementBtn.addEventListener("mouseleave", () => {
//     isPressing = false;
//     clearInterval(intervalId);
// });

decrementBtn.addEventListener("click", function() {

    if (count > 0) {
        count--;
    }
    
    updateDisplay();
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});