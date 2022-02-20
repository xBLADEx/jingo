import { tiles } from './tiles.js';

const letters = ['J', 'I', 'N', 'G', 'O'];

const possibilities = [];
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

draw.addEventListener('click', () => {
  if (possibilities.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * possibilities.length);
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
    <h2>History</h2>
    <ul class="history-list">${history
      .map((tile) => {
        return `<li>
          <span class="letter">${tile.letter}</span>
          <img src="${tile.image}" alt="${tile.name}" class="image">
        </li>`;
      })
      .reverse()
      .join('')}</ul>
  `;

  historyElement.innerHTML = historyResult;
});
