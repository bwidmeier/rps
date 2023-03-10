let gameState = {
    humanScore: 0,
    computerScore: 0,
    lastHumanChoice: null,
    lastComputerChoice: null,
    winner: null
};

const Choice = {
    Rock: 'rock',
    Paper: 'paper',
    Scissors: 'scissors'
}

const Player = {
    Human: Symbol('human'),
    Computer: Symbol('computer')
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    const randomInt = getRandomInt(3);
    if (randomInt === 0)
        return Choice.Rock;
    if (randomInt === 1)
        return Choice.Paper;
    if (randomInt === 2)
        return Choice.Scissors;
}

function determineWinner(humanChoice, cpuChoice) {
    if (humanChoice === cpuChoice)
        return null;

    if (humanChoice === Choice.Rock) {
        if (cpuChoice === Choice.Paper)
            return Player.Computer;
        return Player.Human;
    }

    if (humanChoice === Choice.Paper) {
        if (cpuChoice === Choice.Scissors)
            return Player.Computer;
        return Player.Human;
    }

    if (humanChoice === Choice.Scissors) {
        if (cpuChoice === Choice.Rock)
            return Player.Computer;
        return Player.Human;
    }
}

function updateGameState(humanChoice, computerChoice) {
    gameState.lastHumanChoice = humanChoice;
    gameState.lastComputerChoice = computerChoice;
    
    const winner = determineWinner(humanChoice, computerChoice);
    
    if (winner === Player.Human) {
        gameState.humanScore++;
        if (gameState.humanScore >= 3)
            gameState.winner = Player.Human;
    } else if (winner === Player.Computer) {
        gameState.computerScore++;
        if (gameState.computerScore >= 3)
            gameState.winner = Player.Computer;
    }
}

function draw() {
    const humanScore = document.querySelector('#human-score')
    const computerScore = document.querySelector('#computer-score')
    const choiceButtons = document.querySelectorAll('#buttons button');
    const humanChoiceImg = document.querySelector('#human-choice');
    const computerChoiceImg = document.querySelector('#computer-choice');

    humanScore.textContent = gameState.humanScore
    computerScore.textContent = gameState.computerScore

    const shouldButtonsBeDisabled = (gameState.winner !== null);
    choiceButtons.forEach((b) => {
        b.disabled = shouldButtonsBeDisabled;
    });

    humanChoiceImg.src = `images/${gameState.lastHumanChoice}.png`;
    computerChoiceImg.src = `images/${gameState.lastComputerChoice}.png`;
}

function makeChoice(humanChoice) {
    const computerChoice = getComputerChoice();
    updateGameState(humanChoice, computerChoice);
}

const choiceButtons = document.querySelectorAll('#buttons button');

choiceButtons.forEach((b) => {
    b.addEventListener('click', () => {
        makeChoice(b.dataset.choice);
        draw();
    });
});

