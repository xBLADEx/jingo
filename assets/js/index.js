import { tiles } from './tiles.js';

const letters = ['J', 'I', 'N', 'G', 'O'];
const possibilities = JSON.parse(window.localStorage.getItem('possibilities')) || [];
const history = JSON.parse(window.localStorage.getItem('history')) || [];
let totalPossibilities = possibilities.length + history.length;
const draw = document.querySelector('#js-draw');
const tileResult = document.querySelector('#js-tile');
const historyElement = document.querySelector('#js-history');
const hiddenReset = document.querySelector('#js-reset');
let tapCounter = 0;

hiddenReset.addEventListener('click', () => {
  tapCounter += 1;

  if (tapCounter >= 5) {
    window.localStorage.removeItem('possibilities');
    window.localStorage.removeItem('history');
    historyElement.innerHTML = '';
    tileResult.innerHTML = '';
    tapCounter = 0;
  }
});

function generateTiles() {
  letters.forEach((letter) => {
    tiles.forEach((tile) => {
      possibilities.push({
        ...tile,
        id: `${tile.id}${letter}`,
        letter,
      });
    });
  });

  window.localStorage.removeItem('possibilities');
  window.localStorage.removeItem('history');
  window.localStorage.setItem('possibilities', JSON.stringify(possibilities));
  totalPossibilities = possibilities.length;
}

if (possibilities.length === 0 || history.length === 0) {
  generateTiles();
}


function renderHistory() {
  if (history.length === 0) {
    return;
  }

  const remaining = possibilities.length;

  const historyResult = `
    <header>
      <h2>History</h2>
      <p>${remaining} of ${totalPossibilities}</p>
    </header>
    <ul class="history-list">${history
      .map((tile) => {
        return `<li>
          <span class="letter">${tile.letter}</span>
          <img src="${tile.image}" alt="${tile.name}" class="image" width="125" height="125">
        </li>`;
      })
      .reverse()
      .join('')}</ul>
  `;

  historyElement.innerHTML = historyResult;
}

renderHistory();

draw.addEventListener('click', () => {
  const remaining = possibilities.length;
  if (remaining === 0) {
    window.localStorage.removeItem('history');
    window.localStorage.removeItem('possibilities');
    const startText = draw.textContent;
    draw.textContent = 'New Game';
    historyElement.innerHTML = '';
    tileResult.innerHTML = '';
    generateTiles();
    draw.textContent = startText;
    return;
  }

  const randomIndex = Math.floor(Math.random() * remaining);
  const tile = possibilities.splice(randomIndex, 1)[0];
  history.push(tile);
  window.localStorage.setItem('possibilities', JSON.stringify(possibilities));
  window.localStorage.setItem('history', JSON.stringify(history));

  const result = `
    <span class="letter">${tile.letter}</span>
    <img src="${tile.image}" alt="${tile.name}" class="image">
    <div class="details">
      <h2 class="name">${tile.name}</h2>
      <p class="description">${tile.description}</p>
    </div>
  `;

  tileResult.innerHTML = result;

  renderHistory();
});
