// Game Manager - Core game logic
class GameManager {
    constructor() {
        this.stationsData = null;
        this.currentGame = null;
        this.gameState = 'waiting'; // waiting, playing, completed, alreadyPlayed
        this.sessionStartTime = null;
        this.MAX_GUESSES = 5;
        this.RECENT_STATIONS_LIMIT = 15;
    }

    async init() {
        await this.loadStations();
        this.loadGameState();
        this.checkGameState();
    }

    async loadStations() {
        const response = await fetch('stations.json');
        this.stationsData = await response.json();
    }

    // Normalize station name for comparison
    normalizeStationName(name) {
        let normalized = name.toLowerCase();

        // Remove apostrophes and quotes
        const apostrophes = ["'", "\u2018", "\u2019"];
        apostrophes.forEach(char => {
            normalized = normalized.replaceAll(char, '');
        });

        const quotes = ['"', "\u201C", "\u201D"];
        quotes.forEach(char => {
            normalized = normalized.replaceAll(char, '');
        });

        // Remove punctuation and spaces
        normalized = normalized
            .replaceAll(' ', '')
            .replaceAll('.', '')
            .replaceAll(',', '')
            .replaceAll('-', '')
            .replaceAll('_', '')
            .replaceAll('&', 'and');

        return normalized;
    }

    // Check if guess is within 1 character of correct answer
    isOneCharacterDifferent(guess, correct) {
        const guessArray = Array.from(guess);
        const correctArray = Array.from(correct);

        if (Math.abs(guessArray.length - correctArray.length) > 1) {
            return false;
        }

        // Same length: check for substitution
        if (guessArray.length === correctArray.length) {
            let differences = 0;
            for (let i = 0; i < guessArray.length; i++) {
                if (guessArray[i] !== correctArray[i]) {
                    differences++;
                    if (differences > 1) return false;
                }
            }
            return differences === 1;
        }

        // Different length by 1: check for insertion/deletion
        const [shorter, longer] = guessArray.length < correctArray.length
            ? [guessArray, correctArray]
            : [correctArray, guessArray];

        let shorterIndex = 0;
        let longerIndex = 0;
        let foundDifference = false;

        while (shorterIndex < shorter.length && longerIndex < longer.length) {
            if (shorter[shorterIndex] !== longer[longerIndex]) {
                if (foundDifference) return false;
                foundDifference = true;
                longerIndex++;
            } else {
                shorterIndex++;
                longerIndex++;
            }
        }

        return true;
    }

    // Check if guess is correct
    isGuessCorrect(guess, station) {
        const normalizedGuess = this.normalizeStationName(guess);
        const normalizedStation = this.normalizeStationName(station.name);

        // Exact match
        if (normalizedGuess === normalizedStation) {
            return true;
        }

        // Fuzzy match (1 character difference)
        if (this.isOneCharacterDifferent(normalizedGuess, normalizedStation)) {
            return true;
        }

        // Check if the guessed station has the same line combination
        const guessedStation = this.findStationByNormalizedName(normalizedGuess);
        if (guessedStation && this.hasSameLines(guessedStation, station)) {
            return true;
        }

        return false;
    }

    // Find station by normalized name
    findStationByNormalizedName(normalizedName) {
        return this.stationsData.stations.find(station =>
            this.normalizeStationName(station.name) === normalizedName
        );
    }

    // Check if two stations have the same line combination
    hasSameLines(station1, station2) {
        // Create sorted arrays of line names for comparison
        const lines1 = [...station1.lines].sort();
        const lines2 = [...station2.lines].sort();

        // Check if arrays have same length and same elements
        if (lines1.length !== lines2.length) {
            return false;
        }

        return lines1.every((line, index) => line === lines2[index]);
    }

    // Seeded random number generator for consistent daily stations
    seededRandom(seed) {
        let state = seed;
        return function() {
            state = (state * 1103515245 + 12345) & 0xFFFFFFFF;
            return (state >>> 0); // Convert to unsigned 32-bit integer
        };
    }

    // Get day of year
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    // Select daily station
    selectDailyStation() {
        const multiLineStations = this.stationsData.stations.filter(s => s.lines.length >= 2);
        const stats = this.getStats();
        const recentStationIds = new Set(stats.recentStationIds);

        const dayOfYear = this.getDayOfYear(new Date());

        // Filter out recently used stations
        let availableStations = multiLineStations.filter(station =>
            !recentStationIds.has(this.normalizeStationName(station.name))
        );

        // If no available stations, use all
        if (availableStations.length === 0) {
            availableStations = multiLineStations;
        }

        // Use seeded random for consistent daily station
        const rng = this.seededRandom(dayOfYear * 1000);
        const randomValue = rng();
        const randomIndex = Math.floor(randomValue % availableStations.length);

        return availableStations[randomIndex];
    }

    // Check if date is today
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return checkDate.getDate() === today.getDate() &&
               checkDate.getMonth() === today.getMonth() &&
               checkDate.getFullYear() === today.getFullYear();
    }

    // Load game state from localStorage
    loadGameState() {
        const savedGame = localStorage.getItem('currentGame');
        if (savedGame) {
            this.currentGame = JSON.parse(savedGame);
        }
    }

    // Save game state to localStorage
    saveGameState() {
        if (this.currentGame) {
            localStorage.setItem('currentGame', JSON.stringify(this.currentGame));
        }
    }

    // Check current game state
    checkGameState() {
        // Check if there's a current game
        if (this.currentGame) {
            // If game is from previous day, clear it
            if (!this.isToday(this.currentGame.date)) {
                this.clearCurrentGame();
            } else {
                if (this.currentGame.isCompleted) {
                    this.gameState = 'completed';
                    return;
                } else {
                    this.gameState = 'playing';
                    if (!this.sessionStartTime) {
                        this.sessionStartTime = Date.now();
                    }
                    return;
                }
            }
        }

        // Check if already played today
        const stats = this.getStats();
        if (stats.history.length > 0) {
            const lastGame = stats.history[stats.history.length - 1];
            if (this.isToday(lastGame.date)) {
                this.currentGame = lastGame;
                this.gameState = 'completed';
                return;
            }
        }

        this.gameState = 'waiting';
    }

    // Start new game
    startNewGame() {
        const station = this.selectDailyStation();
        const gameStartTime = new Date().toISOString();

        this.currentGame = {
            station: station,
            date: gameStartTime,
            hintsUsed: false,
            locationHintUsed: false,
            guesses: [],
            isCompleted: false,
            isWin: false,
            completionTime: null,
            accumulatedElapsedTime: 0
        };

        this.saveGameState();
        this.gameState = 'playing';
        this.sessionStartTime = Date.now();
    }

    // Make a guess
    makeGuess(guess) {
        if (!this.currentGame || this.currentGame.isCompleted) {
            return { success: false, correct: false };
        }

        const remainingGuesses = this.MAX_GUESSES - this.currentGame.guesses.length;
        if (remainingGuesses <= 0) {
            return { success: false, correct: false };
        }

        this.currentGame.guesses.push(guess);
        const isCorrect = this.isGuessCorrect(guess, this.currentGame.station);

        if (isCorrect) {
            this.currentGame.isCompleted = true;
            this.currentGame.isWin = true;
            this.currentGame.completionTime = this.getCurrentElapsedTime();
            this.completeGame(true);
            this.gameState = 'completed';
        } else if (this.currentGame.guesses.length >= this.MAX_GUESSES) {
            this.currentGame.isCompleted = true;
            this.currentGame.isWin = false;
            this.currentGame.completionTime = this.getCurrentElapsedTime();
            this.completeGame(false);
            this.gameState = 'completed';
        } else {
            this.saveGameState();
        }

        return { success: true, correct: isCorrect };
    }

    // Use hint
    useHint() {
        if (this.currentGame && !this.currentGame.hintsUsed) {
            this.currentGame.hintsUsed = true;
            this.saveGameState();
            return true;
        }
        return false;
    }

    // Use location hint
    useLocationHint() {
        if (this.currentGame && !this.currentGame.locationHintUsed) {
            this.currentGame.locationHintUsed = true;
            this.saveGameState();
            return true;
        }
        return false;
    }

    // Get current elapsed time
    getCurrentElapsedTime() {
        if (!this.currentGame) return 0;

        if (this.currentGame.isCompleted && this.currentGame.completionTime) {
            return this.currentGame.completionTime;
        }

        const currentSessionTime = this.sessionStartTime
            ? (Date.now() - this.sessionStartTime) / 1000
            : 0;

        return Math.max(0, this.currentGame.accumulatedElapsedTime + currentSessionTime);
    }

    // Complete game
    completeGame(won) {
        const stats = this.getStats();

        stats.totalGames++;
        if (won) {
            stats.totalWins++;
        }

        if (this.currentGame.hintsUsed || this.currentGame.locationHintUsed) {
            stats.totalHintsUsed++;
        }

        // Update streak
        if (won) {
            stats.currentStreak++;
            stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        } else {
            stats.currentStreak = 0;
        }

        // Add to history
        stats.history.push({ ...this.currentGame });

        // Update recent stations
        const stationId = this.normalizeStationName(this.currentGame.station.name);
        stats.recentStationIds.push(stationId);
        if (stats.recentStationIds.length > this.RECENT_STATIONS_LIMIT) {
            stats.recentStationIds.shift();
        }

        this.saveStats(stats);
        this.saveGameState();
    }

    // Get stats
    getStats() {
        const savedStats = localStorage.getItem('gameStats');
        if (savedStats) {
            return JSON.parse(savedStats);
        }
        return {
            totalGames: 0,
            totalWins: 0,
            currentStreak: 0,
            maxStreak: 0,
            totalHintsUsed: 0,
            history: [],
            recentStationIds: []
        };
    }

    // Save stats
    saveStats(stats) {
        localStorage.setItem('gameStats', JSON.stringify(stats));
    }

    // Clear current game
    clearCurrentGame() {
        this.currentGame = null;
        localStorage.removeItem('currentGame');
    }

    // Get line color
    getLineColor(lineName) {
        const line = this.stationsData.tubeLines.find(l => l.name === lineName);
        return line ? line.colorCode : '#000000';
    }

    // Get remaining guesses
    getRemainingGuesses() {
        if (!this.currentGame) return this.MAX_GUESSES;
        return Math.max(0, this.MAX_GUESSES - this.currentGame.guesses.length);
    }
}

// Export for use in other files
const gameManager = new GameManager();
