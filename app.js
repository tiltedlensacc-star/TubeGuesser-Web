// App UI Controller
class AppUI {
    constructor() {
        this.timerInterval = null;
        this.elements = {};
        this.currentHintDisplayed = null; // 'trivia' or 'location'
        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        // Screens
        this.elements.welcomeScreen = document.getElementById('welcome-screen');
        this.elements.gameScreen = document.getElementById('game-screen');
        this.elements.completedScreen = document.getElementById('completed-screen');
        this.elements.welcomeDate = document.getElementById('welcome-date');

        // Game elements
        this.elements.timer = document.getElementById('timer');
        this.elements.linesContainer = document.getElementById('lines-container');
        this.elements.guessesRemaining = document.getElementById('guesses-remaining');
        this.elements.guessInput = document.getElementById('guess-input');
        this.elements.submitGuessBtn = document.getElementById('submit-guess-btn');
        this.elements.guessesList = document.getElementById('guesses-list');
        this.elements.hintBtn = document.getElementById('hint-btn');
        this.elements.locationHintBtn = document.getElementById('location-hint-btn');
        this.elements.hintDisplay = document.getElementById('hint-display');

        // Result elements
        this.elements.resultIcon = document.getElementById('result-icon');
        this.elements.resultTitle = document.getElementById('result-title');
        this.elements.resultStation = document.getElementById('result-station');
        this.elements.resultGuesses = document.getElementById('result-guesses');
        this.elements.resultTime = document.getElementById('result-time');
        this.elements.resultLines = document.getElementById('result-lines');

        // Buttons
        this.elements.startGameBtn = document.getElementById('start-game-btn');
        this.elements.statsBtn = document.getElementById('stats-btn');
        this.elements.howToPlayBtn = document.getElementById('how-to-play-btn');
        this.elements.viewStatsBtn = document.getElementById('view-stats-btn');
        this.elements.resetBtn = document.getElementById('reset-btn');

        // Header buttons
        this.elements.statsBtnHeader = document.getElementById('stats-btn-header');
        this.elements.howToPlayBtnHeader = document.getElementById('how-to-play-btn-header');
        this.elements.resetBtnHeader = document.getElementById('reset-btn-header');
        this.elements.headerButtons = document.querySelector('.header-buttons');

        // Modals
        this.elements.statsModal = document.getElementById('stats-modal');
        this.elements.howToPlayModal = document.getElementById('how-to-play-modal');
        this.elements.closeStatsBtn = document.getElementById('close-stats-btn');
        this.elements.closeHowToPlayBtn = document.getElementById('close-how-to-play-btn');

        // Stats elements
        this.elements.totalGames = document.getElementById('total-games');
        this.elements.winRate = document.getElementById('win-rate');
        this.elements.currentStreak = document.getElementById('current-streak');
        this.elements.maxStreak = document.getElementById('max-streak');
    }

    attachEventListeners() {
        this.elements.startGameBtn.addEventListener('click', () => this.startGame());
        this.elements.submitGuessBtn.addEventListener('click', () => this.submitGuess());
        this.elements.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitGuess();
        });

        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.locationHintBtn.addEventListener('click', () => this.showLocationHint());

        this.elements.statsBtn.addEventListener('click', () => this.showStatsModal());
        this.elements.viewStatsBtn.addEventListener('click', () => this.showStatsModal());
        this.elements.howToPlayBtn.addEventListener('click', () => this.showHowToPlayModal());
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());

        // Header button listeners
        this.elements.statsBtnHeader.addEventListener('click', () => this.showStatsModal());
        this.elements.howToPlayBtnHeader.addEventListener('click', () => this.showHowToPlayModal());
        this.elements.resetBtnHeader.addEventListener('click', () => this.resetGame());

        this.elements.closeStatsBtn.addEventListener('click', () => this.hideStatsModal());
        this.elements.closeHowToPlayBtn.addEventListener('click', () => this.hideHowToPlayModal());

        // Close modals on backdrop click
        this.elements.statsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.statsModal) this.hideStatsModal();
        });
        this.elements.howToPlayModal.addEventListener('click', (e) => {
            if (e.target === this.elements.howToPlayModal) this.hideHowToPlayModal();
        });
    }

    showScreen(screen) {
        this.elements.welcomeScreen.classList.add('hidden');
        this.elements.gameScreen.classList.add('hidden');
        this.elements.completedScreen.classList.add('hidden');

        if (screen === 'welcome') {
            this.elements.welcomeScreen.classList.remove('hidden');
            this.elements.headerButtons.classList.remove('show');
            this.updateWelcomeDate();
        }
        if (screen === 'game') {
            this.elements.gameScreen.classList.remove('hidden');
            this.elements.headerButtons.classList.add('show');
        }
        if (screen === 'completed') {
            this.elements.completedScreen.classList.remove('hidden');
            this.elements.headerButtons.classList.add('show');
        }
    }

    updateWelcomeDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString('en-GB', options);
        this.elements.welcomeDate.textContent = dateString;
    }

    startGame() {
        gameManager.startNewGame();
        this.currentHintDisplayed = null;
        this.showScreen('game');
        this.renderGameScreen();
        this.startTimer();
    }

    renderGameScreen() {
        const game = gameManager.currentGame;
        if (!game) return;

        // Initialize hint display if hints are already used
        if (this.currentHintDisplayed === null) {
            if (game.locationHintUsed) {
                this.currentHintDisplayed = 'location';
                this.elements.hintDisplay.textContent = `Location: ${game.station.location}`;
                this.elements.hintDisplay.classList.remove('hidden');
            } else if (game.hintsUsed) {
                this.currentHintDisplayed = 'trivia';
                this.elements.hintDisplay.textContent = game.station.trivia;
                this.elements.hintDisplay.classList.remove('hidden');
            }
        }

        // Render tube lines
        this.elements.linesContainer.innerHTML = '';

        // Add header
        const header = document.createElement('div');
        header.className = 'lines-header';
        header.textContent = 'Served by these lines';
        this.elements.linesContainer.appendChild(header);

        // Create wrapper for lines
        const wrapper = document.createElement('div');
        wrapper.className = 'lines-wrapper';

        game.station.lines.forEach(lineName => {
            const lineElement = document.createElement('div');
            lineElement.className = 'tube-line';
            lineElement.textContent = lineName;
            lineElement.style.backgroundColor = gameManager.getLineColor(lineName);

            wrapper.appendChild(lineElement);
        });

        this.elements.linesContainer.appendChild(wrapper);

        // Update guesses remaining
        this.updateGuessesRemaining();

        // Update hint buttons
        this.updateHintButtons();

        // Render previous guesses
        this.renderGuesses();

        // Focus input
        this.elements.guessInput.focus();
    }

    updateGuessesRemaining() {
        this.elements.guessesRemaining.textContent = gameManager.getRemainingGuesses();
    }

    updateHintButtons() {
        const game = gameManager.currentGame;
        if (!game) return;

        const guessCount = game.guesses.length;
        const bothUsed = game.hintsUsed && game.locationHintUsed;

        // Trivia hint - unlocks after 3 guesses
        if (game.hintsUsed && bothUsed) {
            // Both hints used - allow toggling
            this.elements.hintBtn.disabled = false;
            this.elements.hintBtn.classList.remove('used');
            this.elements.hintBtn.classList.add('unlocked');
            if (this.currentHintDisplayed === 'trivia') {
                this.elements.hintBtn.innerHTML = '✓ Showing Hint';
            } else {
                this.elements.hintBtn.innerHTML = '💡 Show Hint';
            }
        } else if (game.hintsUsed) {
            this.elements.hintBtn.disabled = true;
            this.elements.hintBtn.classList.add('used');
            this.elements.hintBtn.innerHTML = '✓ Hint Used';
        } else if (guessCount >= 3) {
            this.elements.hintBtn.disabled = false;
            this.elements.hintBtn.classList.add('unlocked');
            this.elements.hintBtn.innerHTML = '💡 Show Hint';
        } else {
            this.elements.hintBtn.disabled = true;
            this.elements.hintBtn.classList.remove('unlocked');
            this.elements.hintBtn.innerHTML = '<span class="hint-lock">🔒</span> Show Hint (3 guesses)';
        }

        // Location hint - unlocks after 1 guess
        if (game.locationHintUsed && bothUsed) {
            // Both hints used - allow toggling
            this.elements.locationHintBtn.disabled = false;
            this.elements.locationHintBtn.classList.remove('used');
            this.elements.locationHintBtn.classList.add('unlocked');
            if (this.currentHintDisplayed === 'location') {
                this.elements.locationHintBtn.innerHTML = '✓ Showing Location';
            } else {
                this.elements.locationHintBtn.innerHTML = '📍 Show Location';
            }
        } else if (game.locationHintUsed) {
            this.elements.locationHintBtn.disabled = true;
            this.elements.locationHintBtn.classList.add('used');
            this.elements.locationHintBtn.innerHTML = '✓ Location Used';
        } else if (guessCount >= 1) {
            this.elements.locationHintBtn.disabled = false;
            this.elements.locationHintBtn.classList.add('unlocked');
            this.elements.locationHintBtn.innerHTML = '📍 Show Location';
        } else {
            this.elements.locationHintBtn.disabled = true;
            this.elements.locationHintBtn.classList.remove('unlocked');
            this.elements.locationHintBtn.innerHTML = '<span class="hint-lock">🔒</span> Show Location (1 guess)';
        }
    }

    renderGuesses() {
        const game = gameManager.currentGame;
        if (!game) return;

        this.elements.guessesList.innerHTML = '';
        game.guesses.forEach((guess, index) => {
            const guessElement = document.createElement('div');
            guessElement.className = 'guess-item incorrect';

            const guessNumber = document.createElement('span');
            guessNumber.className = 'guess-number';
            guessNumber.textContent = `${index + 1}.`;

            const guessText = document.createElement('span');
            guessText.className = 'guess-text';
            guessText.textContent = guess;

            guessElement.appendChild(guessNumber);
            guessElement.appendChild(guessText);

            this.elements.guessesList.appendChild(guessElement);
        });
    }

    submitGuess() {
        const guess = this.elements.guessInput.value.trim();
        if (!guess) return;

        const result = gameManager.makeGuess(guess);
        if (!result.success) return;

        this.elements.guessInput.value = '';
        this.updateGuessesRemaining();
        this.updateHintButtons();
        this.renderGuesses();

        if (gameManager.gameState === 'completed') {
            this.stopTimer();
            this.showCompletedScreen();
        }
    }

    showHint() {
        const game = gameManager.currentGame;
        const bothUsed = game.hintsUsed && game.locationHintUsed;

        if (bothUsed) {
            // Toggle to show trivia hint
            this.currentHintDisplayed = 'trivia';
            this.elements.hintDisplay.textContent = game.station.trivia;
            this.elements.hintDisplay.classList.remove('hidden');
            this.updateHintButtons();
        } else if (gameManager.useHint()) {
            this.currentHintDisplayed = 'trivia';
            this.elements.hintDisplay.textContent = gameManager.currentGame.station.trivia;
            this.elements.hintDisplay.classList.remove('hidden');
            this.updateHintButtons();
        }
    }

    showLocationHint() {
        const game = gameManager.currentGame;
        const bothUsed = game.hintsUsed && game.locationHintUsed;

        if (bothUsed) {
            // Toggle to show location hint
            this.currentHintDisplayed = 'location';
            this.elements.hintDisplay.textContent = `Location: ${game.station.location}`;
            this.elements.hintDisplay.classList.remove('hidden');
            this.updateHintButtons();
        } else if (gameManager.useLocationHint()) {
            this.currentHintDisplayed = 'location';
            this.elements.hintDisplay.textContent = `Location: ${gameManager.currentGame.station.location}`;
            this.elements.hintDisplay.classList.remove('hidden');
            this.updateHintButtons();
        }
    }

    showCompletedScreen() {
        const game = gameManager.currentGame;
        this.currentHintDisplayed = null;
        this.showScreen('completed');

        // Set result icon and title
        if (game.isWin) {
            this.elements.resultIcon.textContent = '🎉';
            this.elements.resultTitle.textContent = 'Well done!';
        } else {
            this.elements.resultIcon.textContent = '😔';
            this.elements.resultTitle.textContent = 'Better luck tomorrow!';
        }

        // Show station name
        this.elements.resultStation.textContent = game.station.name;

        // Show stats
        this.elements.resultGuesses.textContent = game.isWin ? game.guesses.length : '-';
        this.elements.resultTime.textContent = this.formatTime(game.completionTime || 0);

        // Show lines
        this.elements.resultLines.innerHTML = '';

        // Add header
        const header = document.createElement('div');
        header.className = 'lines-header';
        header.textContent = 'Served by these lines';
        this.elements.resultLines.appendChild(header);

        // Create wrapper for lines
        const wrapper = document.createElement('div');
        wrapper.className = 'lines-wrapper';

        game.station.lines.forEach(lineName => {
            const lineElement = document.createElement('div');
            lineElement.className = 'tube-line';
            lineElement.textContent = lineName;
            lineElement.style.backgroundColor = gameManager.getLineColor(lineName);

            wrapper.appendChild(lineElement);
        });

        this.elements.resultLines.appendChild(wrapper);
    }

    startTimer() {
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const elapsed = gameManager.getCurrentElapsedTime();
        this.elements.timer.textContent = this.formatTime(elapsed);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    showStatsModal() {
        const stats = gameManager.getStats();

        this.elements.totalGames.textContent = stats.totalGames;
        this.elements.winRate.textContent = stats.totalGames > 0
            ? Math.round((stats.totalWins / stats.totalGames) * 100)
            : 0;
        this.elements.currentStreak.textContent = stats.currentStreak;
        this.elements.maxStreak.textContent = stats.maxStreak;

        this.elements.statsModal.classList.remove('hidden');
    }

    hideStatsModal() {
        this.elements.statsModal.classList.add('hidden');
    }

    showHowToPlayModal() {
        this.elements.howToPlayModal.classList.remove('hidden');
    }

    hideHowToPlayModal() {
        this.elements.howToPlayModal.classList.add('hidden');
    }

    resetGame() {
        if (confirm('Reset game and clear all data? This will start fresh.')) {
            localStorage.clear();
            location.reload();
        }
    }

    async init() {
        await gameManager.init();

        // Check game state and show appropriate screen
        if (gameManager.gameState === 'playing') {
            this.showScreen('game');
            this.renderGameScreen();
            this.startTimer();
        } else if (gameManager.gameState === 'completed') {
            this.showScreen('completed');
            this.showCompletedScreen();
        } else {
            this.showScreen('welcome');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const app = new AppUI();
    await app.init();
});
