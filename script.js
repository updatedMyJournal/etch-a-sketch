let grid = document.querySelector('.sketch');
let sidebar = document.querySelector('.sidebar');
let colorInput = document.querySelector('input[type="color"]');
let colorButton = document.querySelector('.color');
let range = document.querySelector('input[type="range"]');
let selectedColor;

generateGrid();
setDrawColor();

document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

sidebar.onclick = (e) => {
  let target = e.target;

  if (
    target.tagName != 'BUTTON'
    || target.classList.contains('clear')
    || target.classList.contains('selected')
  ) return;

  let prevSelectedButton = sidebar.querySelector('.selected');

  prevSelectedButton.classList.remove('selected');
  target.classList.add('selected');
};

colorInput.oninput = setDrawColor;

colorButton.onclick = setDrawColor;

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

function colorize(elem) {
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

function isRandomColorSelected() {
  let randomColorsButton = sidebar.querySelector('.random-colors');

  return randomColorsButton.classList.contains('selected');
}

function isGridItem(elem) {
  return elem.parentElement == grid;
}
