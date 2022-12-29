import { tiles } from './tiles.js';

const letters = ['J', 'I', 'N', 'G', 'O'];

const possibilities = [];
console.log('possibilities', possibilities);
const history = [];

letters.forEach((letter) => {
  tiles.forEach((tile) => {
    possibilities.push({
      ...tile,
      id: `${tile.id}${letter}`,
      letter: letter,
    });
  });
});

const draw = document.querySelector('#js-draw');
const tileResult = document.querySelector('#js-tile');
const historyElement = document.querySelector('#js-history');
const totalPossibilities = possibilities.length;

draw.addEventListener('click', () => {
  const remaining = possibilities.length;
  if (remaining === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * remaining);
  const tile = possibilities.splice(randomIndex, 1)[0];
  history.push(tile);

  const result = `
    <span class="letter">${tile.letter}</span>
    <img src="${tile.image}" alt="${tile.name}" class="image">
    <div class="details">
      <h2 class="name">${tile.name}</h2>
      <p class="description">${tile.description}</p>
    </div>
  `;

  tileResult.innerHTML = result;

  const historyResult = `
    <header>
      <h2>History</h2>
      <p>${remaining - 1} of ${totalPossibilities}</p>
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
});
