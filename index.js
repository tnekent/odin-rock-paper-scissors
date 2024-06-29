const ROCK_C = 0,
    PAPER_C = 1,
    SCISSORS_C = 2;

const COM_ID = 1,
    HUMAN_ID = 2;

function getComputerChoice() {
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

function getHumanChoice() {
    let choice = prompt("What will you choose? Rock, paper, or scissors?");

    if (!/^(?:rock|paper|scissors)$/.test(choice.toLowerCase())) {
        alert("Please input a valid choice. Refresh the page to retry.");
    }

    return choice;
}



function playGame() {
    let humanScore = 0,
    computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice)
            console.log("You tied.");
    
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
                        console.log("You lose. Rock loses to paper.");
                } else {
                    humanScore++;
                    console.log("You win! Paper beats rock.");
                }
            } else if (scissorsPlayer) { // scissors | rock
                if (rockPlayer === COM_ID) {
                    computerScore++;
                    console.log("You lose. Scissors loses to rock.");
                } else {
                    humanScore++;
                    console.log("You win! Rock beats scissors.");
                }
            }
        } else if (paperPlayer) { // can be just "else" but prioritizing readability here
            if (scissorsPlayer) { // scissors | paper
                if (scissorsPlayer === COM_ID) {
                    computerScore++;
                    console.log("You lose. Paper loses to scissors.");
                } else {
                    humanScore++;
                    console.log("You win! Scissors beat paper.");
                }
            }
        }
    }
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);

console.log(`SCORE human: ${humanScore} | computer: ${computerScore}`);
console.log(`CHOICE human: ${humanChoice} | computer: ${computerChoice}`);