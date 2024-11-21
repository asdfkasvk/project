class Timer {
    constructor() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.timeInput = document.getElementById('time-input');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('short-break');
        this.longBreakButton = document.getElementById('long-break');

        this.timeLeft = 25 * 60; // 25분을 초로 변환
        this.timerId = null;
        this.isRunning = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.startTimer());
        this.pauseButton.addEventListener('click', () => this.pauseTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.timeInput.addEventListener('change', () => this.updateTime());
        
        this.pomodoroButton.addEventListener('click', () => this.setTime(25));
        this.shortBreakButton.addEventListener('click', () => this.setTime(5));
        this.longBreakButton.addEventListener('click', () => this.setTime(15));
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                    this.updateDisplay();
                } else {
                    this.playAlarm();
                    this.resetTimer();
                }
            }, 1000);
        }
    }

    pauseTimer() {
        clearInterval(this.timerId);
        this.isRunning = false;
    }

    resetTimer() {
        this.pauseTimer();
        this.timeLeft = parseInt(this.timeInput.value) * 60;
        this.updateDisplay();
    }

    updateTime() {
        if (!this.isRunning) {
            this.timeLeft = parseInt(this.timeInput.value) * 60;
            this.updateDisplay();
        }
    }

    setTime(minutes) {
        this.timeInput.value = minutes;
        this.resetTimer();
        
        // 버튼 활성화 상태 업데이트
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (minutes === 25) this.pomodoroButton.classList.add('active');
        else if (minutes === 5) this.shortBreakButton.classList.add('active');
        else if (minutes === 15) this.longBreakButton.classList.add('active');
    }

    playAlarm() {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play();
    }
}

// 타이머 인스턴스 생성
const timer = new Timer();
