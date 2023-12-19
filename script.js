let target;

let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round')

const generateTarget = () => Math.floor(Math.random() * 50);

const checkUserGuesses = guess => {
  if (guess<0 || guess>50) {
    alert('Input invalid!');
    humanGuessInput.value = 0;
  }
};

const getAbsoluteDistance= (guess, target) => Math.abs(guess-target);

const compareGuesses = (user, cpu, target) => {
  const userDiffer = getAbsoluteDistance(user, target);
  const cpuDiffer = getAbsoluteDistance(cpu, target);
  return userDiffer<=cpuDiffer;
};

const updateScore = winner => {
  if (winner === 'human') {
    humanScore++;
  } else {
    computerScore++;
  }
};

const advanceRound=() => {
  currentRoundNumber++;
};

guessButton.addEventListener('click', () => {

  // Generate the target value
  target = generateTarget();
  // Retrieve the player's guess
  const currentHumanGuess = +humanGuessInput.value;
  // Make a random 'computer guess'
  const computerGuess = Math.floor(Math.random() * 50);

  // Display the computer guess and the target
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;

  // Determine if the human or computer wins:
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
  const winner = humanIsWinner ? 'human' : 'computer'

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (humanIsWinner) {
    guessButton.innerText = 'You Win!!!!!';
    guessButton.classList.toggle('winning-text')
  } else {
    computerWinsDisplay.innerText = 'Computer Wins!!!';
  }

  // winnerDisplay.innerText = humanIsWinner ? 'You win!' : 'Computer wins!';

  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;

  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
  // Increase the round number
  advanceRound();
  // Display the new round number
  roundNumberDisplay.innerText = currentRoundNumber;

  // Set the correct disabled state for the buttons
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Reset the guess input box and the target number display:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = '';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(+humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(+humanGuessInput.value);
});

const handleValueChange = value => {
  if (value > 0 && value <= 49) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 49) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
  checkUserGuesses(e.target.value);
});
