const gameContainer = document.getElementById("game");
const startGame = document.querySelector('button');
let gameStart = false;
startGame.addEventListener('click', inGame);
let oScore = JSON.parse(localStorage.getItem("newScore"));
let oldScore = document.querySelector('h4');
oldScore.innerText = `The last score was: ${oScore}`;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
function inGame (){
startGame.innerText = 'Click Here for a New Game'

startGame.addEventListener('click', endGame)
function endGame (){
  window.location.reload();
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);




function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add("image");
    newDiv.classList.add("cards");
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// let cards = document.getElementById('game').childNodes;


let inGuess = false;
let card1 = null;
let card2 = null;
let cardsTried = 0;
let score = 100;
const scoreBoard = document.querySelector('h3')


function handleCardClick(event) {

if(inGuess){
  return;
}
if (event.target.classList.contains('attempt')){
  return;
}
let currentCard = event.target;
// currentCard.classList.add(`${currentCard.classList[1]}`)
// currentCard.style.backgroundColor = currentCard.classList[0];

if(card1 || card2 === null) {
  currentCard.classList.remove("image")
  currentCard.classList.add("attempt");
  card1 = card1 || currentCard;
  // Had to take their example apart, now it makes sense
  if(currentCard === card1){
    card2 = null;
  }else{
  card2 = currentCard;}
}

if(card1 && card2) {
  inGuess = true;

if (card1.classList[1] == card2.classList[1]){
cardsTried += 2;
card1.removeEventListener('click', handleCardClick);
card2.removeEventListener('click', handleCardClick);
card1 = null;
card2 = null;
inGuess = false;
} else {
  setTimeout(function() {
    card1.classList.remove("attempt");
    card2.classList.remove("attempt");
    card1.classList.add("image");
    card2.classList.add("image");
    score -= 10;
    card1 = null;
    card2 = null;
    inGuess = false;
  }, 1000);
}

}
 if (cardsTried === COLORS.length){
alert(`game over, your score is ${score} points`);
}

let bestScore = score;


localStorage.setItem("newScore", bestScore);





scoreBoard.innerText = `Score: ${score}`
 }
createDivsForColors(shuffledColors);}
