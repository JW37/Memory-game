const shapes = ["⭐", "🔺", "⬛", "⬜", "❤️", "🔵"];
let cards = [];
let openedCards = [];
let moves = 0;
let canPlay = false;

const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const statusText = document.getElementById("status");

function startGame() {
  board.innerHTML = "";
  openedCards = [];
  moves = 0;
  canPlay = false;
  movesText.textContent = moves;
  statusText.textContent = "👀 Watch carefully...";

  cards = [...shapes, ...shapes].sort(() => Math.random() - 0.5);

  cards.forEach(shape => {
    const card = document.createElement("div");
    card.className = "card show";
    card.textContent = shape;
    card.dataset.shape = shape;
    card.onclick = () => flipCard(card);
    board.appendChild(card);
  });

  // Hide cards after 3 seconds
  setTimeout(hideAllCards, 3000);
}

function hideAllCards() {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("show");
    card.textContent = "";
  });

  statusText.textContent = "🧠 Now match the shapes!";
  canPlay = true;
}

function flipCard(card) {
  if (
    !canPlay ||
    card.classList.contains("open") ||
    card.classList.contains("matched") ||
    openedCards.length === 2
  ) return;

  card.classList.add("open");
  card.textContent = card.dataset.shape;
  openedCards.push(card);

  if (openedCards.length === 2) {
    moves++;
    movesText.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = openedCards;

  if (first.dataset.shape === second.dataset.shape) {
    first.classList.add("matched");
    second.classList.add("matched");
    openedCards = [];

    if (document.querySelectorAll(".matched").length === cards.length) {
      statusText.textContent = "🎉 Brain Test Passed!";
    }
  } else {
    setTimeout(() => {
      first.classList.remove("open");
      second.classList.remove("open");
      first.textContent = "";
      second.textContent = "";
      openedCards = [];
    }, 700);
  }
}