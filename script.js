let stateList = []
let currentStateIndex = 0
let score = 0

const stateImage = document.getElementById('state-image')
const guessForm = document.getElementById('guess-form')
const stateNameInput = document.getElementById('state-name')
const scoreDisplay = document.getElementById('score')
const skipButton = document.getElementById('skip')
const hintButton = document.getElementById('hint')
const resetButton = document.getElementById('reset')
const nextButton = document.getElementById('next')
const flagImage = document.getElementById('flag-image')

// Fetch state list from the JSON file
async function fetchStateList() {
  const response = await fetch('stateList.json')
  stateList = await response.json()
  shuffleStateList() // Shuffle the state list initially
  loadState()
}

// Shuffle the state list array
function shuffleStateList() {
  stateList.sort(() => Math.random() - 0.5)
}

// Load the current state image
function loadState() {
  stateImage.src = stateList[currentStateIndex].image
  stateNameInput.value = ''
  flagImage.style.display = 'none' // Hide flag initially
  nextButton.style.display = 'none'
  guessForm.style.display = 'block'
}

// Check the user's guess
function checkGuess(event) {
  event.preventDefault()
  const guess = stateNameInput.value.trim().toLowerCase()
  const correctName = stateList[currentStateIndex].name.toLowerCase()
  if (guess === correctName) {
    score++
    showFlag()
  } else {
    alert('Wrong! The correct answer is ' + stateList[currentStateIndex].name)
    nextState()
  }
  updateScore()
}

// Update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`
}

// Move to the next state
function nextState() {
  currentStateIndex++
  if (currentStateIndex >= stateList.length) {
    displayWinMessage()
  } else {
    loadState()
  }
}

// Skip to the next state
function skipState() {
  nextState()
}

// Show a hint
function hint() {
  alert('Hint: ' + stateList[currentStateIndex].name.substring(0, 1))
}

// Reset the game
function resetGame() {
  currentStateIndex = 0
  score = 0
  shuffleStateList() // Shuffle the state list again
  updateScore()
  loadState()
}

// Display the win message
function displayWinMessage() {
  alert('You won! All states have been guessed.')
  resetGame()
}

// Show the flag of the current state
function showFlag() {
  flagImage.src = stateList[currentStateIndex].flag
  flagImage.style.display = 'block' // Show flag image
  stateImage.style.display = 'none' // Hide map image when the guess is correct
  guessForm.style.display = 'none' // Hide the guess form
  nextButton.style.display = 'block' // Show the next button
}

// Event listeners
guessForm.addEventListener('submit', checkGuess)
skipButton.addEventListener('click', skipState)
hintButton.addEventListener('click', hint)
resetButton.addEventListener('click', resetGame)
nextButton.addEventListener('click', () => {
  flagImage.style.display = 'none' // Hide flag when moving to next state
  nextButton.style.display = 'none' // Hide next button again
  loadState() // Load the next state
})

// Initialize the game by fetching the state list
fetchStateList()
