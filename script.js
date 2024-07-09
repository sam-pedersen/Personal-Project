const StateList = [
  { name: 'New York', image: 'newyork.png' },
  // Add more States objects here
]

let currentStateIndex = 0
let score = 0

const StateImage = document.getElementById('State-image')
const guessForm = document.getElementById('guess-form')
const stateNameInput = document.getElementById('State-name')
const scoreDisplay = document.getElementById('score')
const skipButton = document.getElementById('skip')
const hintButton = document.getElementById('hint')
const resetButton = document.getElementById('reset')

function loadState() {
  stateImage.src = pokemonList[currentPokemonIndex].image
  pokemonNameInput.value = ''
}
