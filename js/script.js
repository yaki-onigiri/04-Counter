const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement")
const resetBtn = document.getElementById("reset")

let count = 0;

function updateDisplay() {
    countEl.textContent = count;
}

incrementBtn.addEventListener("click", function() {
    count++;
        // 値を変更

    updateDisplay();
        // 画面更新
});

decrementBtn.addEventListener("click", function() {
    count--;
    updateDisplay();
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});