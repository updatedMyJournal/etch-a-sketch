let grid = document.querySelector('.sketch');
let sidebar = document.querySelector('.sidebar');

let colorInput = document.querySelector('input[type="color"]');
let colorButton = document.querySelector('.color');
let clearButton = document.querySelector('.clear');
let range = document.querySelector('input[type="range"]');

let selectedColor;
let sketchBgColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--sketch-bg-color');

generateGrid();
setDrawColor();

document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

sidebar.onpointerdown = (e) => {
  let currSelectedButton = e.target;

  if (currSelectedButton.tagName != 'BUTTON'
    && currSelectedButton != colorInput) return;

  currSelectedButton.setPointerCapture(e.pointerId);
  animate(currSelectedButton);

  if (currSelectedButton == clearButton
    || currSelectedButton == colorInput) return;

  let prevSelectedButton = sidebar.querySelector('.selected');

  prevSelectedButton.classList.remove('selected');
  currSelectedButton.classList.add('selected');
};

sidebar.onpointerup = (e) => {
  if (e.target.tagName != 'BUTTON'
    && e.target != colorInput) return;

  removeAnimate(e.target);
};

colorInput.oninput = setDrawColor;

colorButton.onclick = setDrawColor;

clearButton.onclick = () => {
  let gridItems = grid.querySelectorAll('div');

  for (let item of gridItems) {
    item.style.backgroundColor = sketchBgColor;
  }
};

range.oninput = (e) => {
  let rangeValueElem = document.querySelector('.range-value');

  rangeValueElem.textContent = e.target.value;
};

range.onchange = generateGrid;

grid.onpointerdown = (e) => {
  let target = e.target;

  if (!isGridItem(target)) return;

  colorize(target);

  grid.onpointerover = (e) => {
    let target = e.target;

    if (!isGridItem(target)) return;

    colorize(target);
  };
};

document.addEventListener('pointerup', () => {
  grid.onpointerover = null;
});

function generateGrid() {
  let gridSize = document.querySelector('.range-value').textContent;

  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  let divs = createDivs();

  grid.innerHTML = '';
  grid.append(divs);

  function createDivs() {
    let amount = gridSize ** 2;
    let documentFragment = document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
      let div = document.createElement('div');

      documentFragment.append(div);
    }

    return documentFragment;
  }
}

function animate(elem) {
  elem.style.transform = 'scale(0.9)';
}

function removeAnimate(elem) {
  elem.style.transform = '';
}

function colorize(elem) {
  if (isShadingSelected()) {
    shade(elem);

    return;
  }

  if (isLightingSelected()) {
    light(elem);

    return;
  }

  if (isEraserSelected()) {
    erase(elem);

    return;
  }

  if (isRandomColorSelected()) selectedColor = getRandomColor();

  elem.style.backgroundColor = selectedColor;
}

function setDrawColor() {
  selectedColor = colorInput.value;
}

function getRandomColor() {
  let rand = () => Math.floor(Math.random() * 256); 
  
  return `rgb(${rand()}, ${rand()}, ${rand()})`;
}

function shade(elem) {
  let [r, g, b] = getRGB(elem);

  elem.style.backgroundColor = `rgb(${r - 25.5}, ${g - 25.5}, ${b - 25.5})`;
}

function light(elem) {
  let [r, g, b] = getRGB(elem);

  elem.style.backgroundColor = `rgb(${+r + 25.5}, ${+g + 25.5}, ${+b + 25.5})`;
}

function erase(elem) {
  elem.style.backgroundColor = sketchBgColor;
}

function getRGB(elem) {
  return getComputedStyle(elem)
    .backgroundColor
    .replace(/[\(\),%]|rgba?/g, '')
    .split(' ');
}

function isRandomColorSelected() {
  return sidebar.querySelector('.random-colors').classList.contains('selected');
}

function isShadingSelected() {
  return sidebar.querySelector('.shading').classList.contains('selected');
}

function isLightingSelected() {
  return sidebar.querySelector('.lighting').classList.contains('selected');
}

function isEraserSelected() {
  return sidebar.querySelector('.eraser').classList.contains('selected');
}

function isGridItem(elem) {
  return elem.parentElement == grid;
}
