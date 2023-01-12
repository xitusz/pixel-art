const colorPalette = document.querySelector('#color-palette');
for (let index = 0; index < 4; index += 1) {
  const pixel = document.createElement('div');
  pixel.className = 'color';
  colorPalette.appendChild(pixel);

  if (index === 0) {
    pixel.style.backgroundColor = 'black';
  } else if (index === 1) {
    pixel.style.backgroundColor = 'red';
  } else if (index === 2) {
    pixel.style.backgroundColor = 'green';
  } else {
    pixel.style.backgroundColor = 'blue';
  }
}

const pixelBoard = document.querySelector('#pixel-board');
const createGrid = (size) => {
  for (let index = 0; index < size; index += 1) {
    for (let i = 0; i < size; i += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';

      pixelBoard.style.gridTemplateColumns = `repeat(${size}, 40px)`;
      pixelBoard.style.gridTemplateRows = `repeat(${size}, 40px)`;

      pixelBoard.appendChild(pixel);
    }
  }
};
createGrid(5);

const color = document.querySelectorAll('.color');

const setColor = (event) => {
  for (let index = 0; index < color.length; index += 1) {
    color[index].classList.remove('selected');
    colorPalette.classList.remove('selected');
  }
  event.target.classList.add('selected');
};

colorPalette.addEventListener('click', setColor);

const setPixelColor = (event) => {
  const selected = document.querySelector('.selected');
  const getAllCssProperties = window.getComputedStyle(selected);
  const getColor = getAllCssProperties.getPropertyValue('background-color');
  event.target.style.backgroundColor = getColor;
};

pixelBoard.addEventListener('click', (event) => setPixelColor(event));

const buttonClear = document.querySelector('#clear-board');

const clearPixelBoard = () => {
  const allPixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < allPixels.length; index += 1) {
    allPixels[index].style.backgroundColor = 'white';
    pixelBoard.style.backgroundColor = 'white';
  }
};

buttonClear.addEventListener('click', clearPixelBoard);

const boardSize = document.querySelector('#board-size');
const buttonSize = document.querySelector('#generate-board');

const removePixels = () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].remove();
  }
};

const changeBoardSize = () => {
  const size = boardSize.value;

  if (size >= 5 && size <= 50) {
    removePixels();
    createGrid(size);
  } else if (size > 50) {
    removePixels();
    createGrid(50);
    alert('O máximo de pixels é 50!');
  } else if (size < 5) {
    removePixels();
    createGrid(5);
    alert('O mínimo de pixels é 5!');
  }
};

buttonSize.addEventListener('click', changeBoardSize);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let codeColor = '#';

  for (let i = 0; i < 6; i += 1) {
    codeColor += letters[Math.floor(Math.random() * 16)];
  }

  return codeColor;
};

const paletteColors = [color[1], color[2], color[3]];

for (let index = 0; index < paletteColors.length; index += 1) {
  paletteColors[index].style.backgroundColor = getRandomColor();
}

window.onload = function loaded() {
  colorPalette.firstChild.className = 'color selected';
};
