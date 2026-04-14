const countEl = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let count = 0;

function updateDisplay() {
    countEl.textContent = count;
}

incrementBtn.addEventListener("click", function() {
    count++;
    updateDisplay();
});

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