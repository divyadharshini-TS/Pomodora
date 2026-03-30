let timeLeft = 25 * 60;
let timerId = null;
let isWorkMode = true;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop');
const modeText = document.getElementById('mode-text');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startStopBtn.textContent = 'START';
        timerDisplay.classList.remove('timer-running');
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                alert(isWorkMode ? 'Break time!' : 'Back to work!');
                resetTimer();
            }
        }, 1000);
        startStopBtn.textContent = 'PAUSE';
        timerDisplay.classList.add('timer-running');
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkMode = true;
    timeLeft = 25 * 60;
    updateDisplay();
    startStopBtn.textContent = 'START';
}

workBtn.onclick = () => {
    isWorkMode = true;
    timeLeft = 25 * 60;
    modeText.textContent = 'Time to Focus';
    workBtn.classList.add('bg-red-500');
    breakBtn.classList.remove('bg-red-500');
    updateDisplay();
};

breakBtn.onclick = () => {
    isWorkMode = false;
    timeLeft = 5 * 60;
    modeText.textContent = 'Take a Break';
    breakBtn.classList.add('bg-red-500');
    workBtn.classList.remove('bg-red-500');
    updateDisplay();
};

startStopBtn.onclick = toggleTimer;
document.getElementById('reset').onclick = resetTimer;
