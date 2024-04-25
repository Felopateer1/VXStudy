let time = 25 * 60; // 25 minutes
let isRunning = false;
let timerSound = new Audio('../bicycle-bell-155622.mp3'); // Add the path to your notification sound file

function startTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        document.getElementById("startBtn").textContent = "Pause";
    } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startBtn").textContent = "Resume";
    }
}

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById("timer").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (time === 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("timer").textContent = "Time's up!";
        document.getElementById("startBtn").disabled = true;

        // Play sound notification
        timerSound.play();

        // Switch between 25-minute and 5-minute intervals
        if (document.getElementById("startBtn").textContent === "Pause") {
            time = 5 * 60; // 5 minutes
        } else {
            time = 25 * 60; // 25 minutes
        }

        setTimeout(startTimer, 1000);
    }
    time--;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = 25 * 60;
    document.getElementById("timer").textContent = "25:00";
    document.getElementById("startBtn").textContent = "Start";
    document.getElementById("startBtn").disabled = false;
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
