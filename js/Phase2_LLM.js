const wordLimit = 500;
const timeLimit = 60 * 2; // 15 minutes in seconds

let remainingWords = wordLimit;
let remainingTime = timeLimit;
let timerInterval;

const articleInput = document.getElementById('input-textarea');
const wordCountSpan = document.getElementById('word-count');
const timerSpan = document.getElementById('timer');

// Update the word count and remaining time
function updateStats() {
    let txt = articleInput.value.trim();
    let wordCount = txt.split(/\s+/).filter((item) => item).length;
    wordCountSpan.textContent = wordCount  + "/" + wordLimit;

    if(wordCount > wordLimit){
        articleInput.value = articleInput.value
        .trim().split(/\s+/).slice(0, wordLimit).join(' ');

        wordCountSpan.style.color = "#de4848";
    } else {
        wordCountSpan.style.color = "#007AC0";
    }
}

// Update the timer countdown
function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  timerSpan.textContent = `${pad(minutes)}:${pad(seconds)}`;

  if (remainingTime <= 60*1) {
    timerSpan.style.color = "#de4848";
  }

  if (remainingTime === 0) {
    articleInput.disabled = true;
    window.location.href = "Task_Finish.html";
    clearInterval(timerInterval);
  }

  --remainingTime;
}

// Start the countdown timer
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Pad single-digit numbers with leading zeros
function pad(number) {
  return number.toString().padStart(2, '0');
}



// Attach event listener to the article input
articleInput.addEventListener('input', updateStats);

// Start the timer when the page loads
window.addEventListener('load', startTimer);
