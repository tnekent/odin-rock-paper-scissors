const ROCK_C = 0,
    PAPER_C = 1,
    SCISSORS_C = 2;

function getComputerChoice() {
    let choiceN = Math.floor(Math.random() * 3),
        choiceText;
    
    switch (choiceN) {
        case ROCK_C:
            choiceText = "Rock";
            break;
        case PAPER_C:
            choiceText = "Paper";
            break;
        case SCISSORS_C:
            choiceText = "Scissors";
            break;
    }

    return choiceText;
}