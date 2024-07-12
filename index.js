const ROCK_C = 0,
    PAPER_C = 1,
    SCISSORS_C = 2;

const COM_ID = 1,
    HUMAN_ID = 2;
    
let humanScore = 0,
    computerScore = 0;

const WIN_CODE = 0,
    LOSE_CODE = 1,
    TIE_CODE = 2;

const LOSE_COLOR = "red",
    WIN_COLOR = "green",
    TIE_COLOR = "blue";

function makeResultsText(resultCode, extraText) {
    const resultsPara = document.createElement("p");
    let resultText, resultColor;

    if (resultCode === WIN_CODE) {
        resultText = "You win!  ";
        resultColor = WIN_COLOR;
    } else if (resultCode === LOSE_CODE) {
        resultText = "You lose.  ";
        resultColor = LOSE_COLOR;
    } else {
        // Both players tied
        resultText = "You tied.  ";
        resultColor = TIE_COLOR;
    }

    const resultSpan = document.createElement("span");
    resultSpan.textContent = resultText;
    resultSpan.style.color = resultColor;

    resultsPara.appendChild(resultSpan);

    const extraTextNode = document.createTextNode(extraText);
    resultsPara.appendChild(extraTextNode)

    return resultsPara;
}

function getRandomChoice() {
    let choiceN = Math.floor(Math.random() * 3),
        choiceText;

    switch (choiceN) {
        case ROCK_C:
            choiceText = "rock";
            break;
        case PAPER_C:
            choiceText = "paper";
            break;
        case SCISSORS_C:
            choiceText = "scissors";
            break;
    }

    return choiceText;
}

function announceWinner(computerScore, humanScore) {
    if (computerScore > humanScore) {
        return `The computer won the game! You: ${humanScore} vs Computer: ${computerScore}`;
    } else if (humanScore > computerScore) {
        return `You won the game! You: ${humanScore} vs Computer: ${computerScore}`;
    } else {
        return `The game is tied! You: ${humanScore} vs Computer: ${computerScore}`;
    }
}

function playGame() {


    announceWinner(computerScore, humanScore);
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        const extraText = `You both chose ${humanChoice}.`;
        return makeResultsText(TIE_CODE, extraText);
    };

    const rockPlayer = humanChoice === "rock" ? HUMAN_ID
        : computerChoice === "rock" ? COM_ID : 0;
    const paperPlayer = humanChoice === "paper" ? HUMAN_ID
        : computerChoice === "paper" ? COM_ID : 0;
    const scissorsPlayer = humanChoice === "scissors" ? HUMAN_ID
        : computerChoice === "scissors" ? COM_ID : 0;

    if (rockPlayer) { // Only need 3C2 conditions = 3
        if (paperPlayer) { // rock | paper
            if (paperPlayer === COM_ID) {
                computerScore++;
                return makeResultsText(LOSE_CODE,"Rock loses to paper.");
            } else {
                humanScore++;
                return makeResultsText(WIN_CODE,"Paper beats rock.");
            }
        } else if (scissorsPlayer) { // scissors | rock
            if (rockPlayer === COM_ID) {
                computerScore++;
                return makeResultsText(LOSE_CODE,"Scissors loses to rock.");
            } else {
                humanScore++;
                return makeResultsText(WIN_CODE,"Rock beats scissors.");
            }
        }
    } else if (paperPlayer) { // can be just "else" but prioritizing readability here
        if (scissorsPlayer) { // scissors | paper
            if (scissorsPlayer === COM_ID) {
                computerScore++;
                return makeResultsText(LOSE_CODE,"Paper loses to scissors.");
            } else {
                humanScore++;
                return makeResultsText(WIN_CODE,"Scissors beat paper.");
            }
        }
    }
}

const resultBox = document.querySelector("#result");
const humanScoreCounter = document.querySelector("#human-score .counter");
const comScoreCounter = document.querySelector("#com-score .counter");
const winnerBox = document.querySelector("#winner");
const thingButtons = document.querySelectorAll("button");

thingButtons.forEach(b => 
    b.addEventListener("click", e => {
        const humanChoice = e.target.id;
        const computerChoice = getRandomChoice();
        const resultPara = playRound(humanChoice, computerChoice);
        console.log(resultPara);
        resultBox.replaceChild(resultPara, resultBox.firstChild);
        humanScoreCounter.textContent = humanScore;
        comScoreCounter.textContent = computerScore;
        if (humanScore === 5 || computerScore === 5) {
            const winnerAnnouncement = announceWinner(computerScore, humanScore);
            winnerBox.textContent = winnerAnnouncement;

            // One game is played until one scores upto 5 then another game is played
            computerScore = 0;
            humanScore = 0;
        } else {
            winnerBox.textContent = "";
        }
    })
)

