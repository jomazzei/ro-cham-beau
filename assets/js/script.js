// Buttons
const rock_but = document.getElementById("rock");
const paper_but = document.getElementById("paper");
const scissors_but = document.getElementById("scissors");
const lizard_but = document.getElementById("lizard");
const spock_but = document.getElementById("spock");

let resultMessage = document.getElementById("result-message");

const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Contains the parent div of the game area and the "please select" text
const gameArea = document.getElementById("game-area");
const selectGameText = document.getElementById("select-game");

// Round progress
var userChoice = "";
var computerChoice = "";
var userWin = false;


// Ending game flags
var winCondition = 0;
var maxRounds = 0;
var bestOfRounds = 0;



// -------------------------------------------------------------  Event listeners

// Adds event listener to each "best of" game mode button
const gameToggleButtons = document.getElementsByClassName('game-toggle');
for (let i = 0; i < gameToggleButtons.length; i++) {
    const button = gameToggleButtons[i].getElementsByTagName('button')[0];
    button.addEventListener('click', function () {
        const gameType = button.getAttribute('game-type');
        switch (gameType) {
            case 'of3':
                playBestOf(3);
                console.log("best of 3 chosen");
                break;
            case 'of5':
                playBestOf(5);
                console.log("best of 5 chosen");
                break;
            case 'of10':
                playBestOf(10);
                console.log("best of 10 chosen");
                break;
            default:
                console.error('Invalid game type');
        }
    });
}

// Sets event listener to each choice -- needs rewrite for elegance
rock_but.addEventListener("click", function () {
    getUserChoice("rock");
    getComputerChoice();
    gameLogic();
})

paper_but.addEventListener("click", function () {
    getUserChoice("paper");
    getComputerChoice();
    gameLogic();
})

scissors_but.addEventListener("click", function () {
    getUserChoice("scissors");
    getComputerChoice();
    gameLogic();
})

lizard_but.addEventListener("click", function () {
    getUserChoice("lizard");
    getComputerChoice();
    gameLogic();
})

spock_but.addEventListener("click", function () {
    getUserChoice("spock");
    getComputerChoice();
    gameLogic();
})


// -------------------------------------------------------------  Get choices

function getUserChoice(userClicked) {
    userChoice = userClicked;
    console.log("the user chose " + userChoice);
    document.getElementById("user-choice").innerText = `You chose ${userChoice}`;
}

function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * 5);
    computerChoice = choices[randomNumber];
    console.log("the computer chose " + computerChoice);
    document.getElementById("computer-choice").innerText = `Computer chose ${computerChoice}`;
    return computerChoice;
}


// -------------------------------------------------------------  Game logic

function gameLogic() {

    switch (userChoice + computerChoice) {
        // User wins
        case "rockscissors":
        case "rocklizard":
        case "paperrock":
        case "paperspock":
        case "scissorspaper":
        case "scissorslizard":
        case "lizardpaper":
        case "lizardspock":
        case "spockrock":
        case "spockscissors":
            iWin();
            break;
        // Draw state
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
        case "lizardlizard":
        case "spockspock":
            iDraw();
            break;
        // If not matching either that means PC wins
        default:
            iLose();
    }

    scoreCheck();
}


// -------------------------------------------------------------  Round result

function iWin() {
    userWin = true;
    console.log("I won! ^-^");

    // Adds and removes visual feedback
    document.getElementById(userChoice).classList.add("btn-success");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("btn-success") }, 1000);

    addUserScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>I won! ^-^</strong>";
}

function iLose() {
    userWin = false;
    console.log("I lost! >,<");

    // Adds and removes visual feedback
    document.getElementById(userChoice).classList.add("btn-danger");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("btn-danger") }, 1000);

    addComputerScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>I lost! >,<</strong>";
}

function iDraw() {
    userWin = false;
    console.log("No winners...");

    document.getElementById("result-message").innerText = "Woops!";

    document.getElementById("win-lose-message").innerHTML = "<strong>No winners...</strong>";
}


function scoreCheck() {
    let userCheck = parseInt(document.getElementById("player-win").innerText);
    let computerCheck = parseInt(document.getElementById("computer-win").innerText);
    if (userCheck === winCondition) {
        endGame();
    }
    else if (computerCheck === winCondition) {
        endGame();
    }
}


// -------------------------------------------------------------  Score increase

// Nicked this bit off Love Maths to adjust scores

function addUserScore() {
    let oldScore = parseInt(document.getElementById("player-win").innerText);
    document.getElementById("player-win").innerText = ++oldScore;
}

function addComputerScore() {
    let oldScore = parseInt(document.getElementById("computer-win").innerText);
    document.getElementById("computer-win").innerText = ++oldScore;
}


// -------------------------------------------------------------  Max rounds

function playBestOf(maxRounds) {

    gameArea.classList.remove("hidden");
    selectGameText.innerHTML = `<h5>You have selected best of ${maxRounds}</h5>`;

    // Sets game goal
    bestOfRounds = maxRounds;
    if (maxRounds === 3) {
        winCondition = 2;
    }
    else if (maxRounds === 5) {
        winCondition = 3;
    }
    else if (maxRounds === 10) {
        winCondition = 6;
    }
}

function endGame() {
    const playerScore = parseInt(document.getElementById("player-win").innerText);
    const computerScore = parseInt(document.getElementById("computer-win").innerText);
    if (playerScore > computerScore) {
        alert(`Congratulations! You won the best of ${bestOfRounds}!`);
    } else if (playerScore < computerScore) {
        alert(`The computer won the best of ${bestOfRounds}. Better luck next time!`);
    } else {
        alert("The game ended in a tie.");
    }
}


// -------------------------------------------------------------  Change text based off who won

function beatText(userChoice, computerChoice) {
    let beatContext = "";

    // User wins
    if (userWin) {
        if (userChoice === "rock") {
            beatContext = `Rock crushes ${computerChoice}`;
        }
        else if (userChoice === "paper" && computerChoice === "spock") {
            beatContext = "Paper disproves Spock";
        }
        else if (userChoice === "paper") {
            beatContext = "Paper covers Rock";
        }
        else if (userChoice === "scissors" && computerChoice === "paper") {
            beatContext = "Scissors cut Paper";
        }
        else if (userChoice === "scissors") {
            beatContext = "Scissors chop Lizard";
        }
        else if (userChoice === "lizard" && computerChoice === "paper") {
            beatContext = "Lizard eats Paper";
        }
        else if (userChoice === "lizard") {
            beatContext = "Lizard Poisons Spock";
        }
        else if (userChoice === "spock") {
            beatContext = `Spock vaporizes ${computerChoice}`;
        }
    }

    // Computer wins
    else if (!userWin) {
        if (userChoice === "rock" && computerChoice === "paper") {
            beatContext = "Rock is covered by Paper";
        }
        else if (userChoice === "rock") {
            beatContext = "Rock is vaporized by Spock";
        }
        else if (userChoice === "paper" && computerChoice === "lizard") {
            beatContext = "Paper is eaten by Lizard";
        }
        else if (userChoice === "paper") {
            beatContext = "Paper is cut by Scissors";
        }
        else if (userChoice === "scissors" && computerChoice === "rock") {
            beatContext = "Scissors are crushed by Rock";
        }
        else if (userChoice === "scissors") {
            beatContext = "Scissors are vaporized by Spock";
        }
        else if (userChoice === "lizard" && computerChoice === "rock") {
            beatContext = "Lizard is crushed by Rock";
        }
        else if (userChoice === "lizard") {
            beatContext = "Lizard is chopped by Scissors";
        }
        else if (userChoice === "spock" && computerChoice === "lizard") {
            beatContext = "Spock is poisoned by Lizard";
        }
        else if (userChoice === "spock") {
            beatContext = "Spock is disproved by paper";
        }
    }

    resultMessage.innerText = beatContext;
}