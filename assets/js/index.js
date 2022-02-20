import { tiles } from './tiles.js';

const letters = ['J', 'I', 'N', 'G', 'O'];

let possibilities = [];

letters.forEach((letter) => {
  tiles.forEach((tile) => {
    possibilities.push({
      ...tile,
      id: `${tile.id}${letter}`,
      letter: letter,
    });
  });
});

console.log(possibilities);
