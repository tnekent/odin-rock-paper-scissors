const ROCK_C = 0,
    PAPER_C = 1,
    SCISSORS_C = 2;

const COM_ID = 1,
    HUMAN_ID = 2;
    
let humanScore = 0,
    computerScore = 0;


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
        console.log(`The computer won the game! You: ${humanScore} vs Computer: ${computerScore}`);
    } else if (humanScore > computerScore) {
        console.log(`You won the game! You: ${humanScore} vs Computer: ${computerScore}`);
    } else {
        console.log(`The game is tied! You: ${humanScore} vs Computer: ${computerScore}`);
    }
}

function playGame() {


    announceWinner(computerScore, humanScore);
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice)
        return "You tied.";

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
                return "You lose. Rock loses to paper.";
            } else {
                humanScore++;
                return "You win! Paper beats rock.";
            }
        } else if (scissorsPlayer) { // scissors | rock
            if (rockPlayer === COM_ID) {
                computerScore++;
                return "You lose. Scissors loses to rock.";
            } else {
                humanScore++;
                return "You win! Rock beats scissors.";
            }
        }
    } else if (paperPlayer) { // can be just "else" but prioritizing readability here
        if (scissorsPlayer) { // scissors | paper
            if (scissorsPlayer === COM_ID) {
                computerScore++;
                return "You lose. Paper loses to scissors.";
            } else {
                humanScore++;
                return "You win! Scissors beat paper.";
            }
        }
    }
}

const resultBox = document.querySelector("#result");
const scoresBox = document.querySelector("#scores");
const thingButtons = document.querySelectorAll("button");

thingButtons.forEach(b => 
    b.addEventListener("click", e => {
        const humanChoice = e.target.id;
        const computerChoice = getRandomChoice();
        const result = playRound(humanChoice, computerChoice);
        resultBox.textContent = result;
        scoresBox.textContent = `Your score: ${humanScore} | Computer's score: ${computerScore}`;
    })
)

