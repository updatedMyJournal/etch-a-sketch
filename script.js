let grid = document.querySelector('.sketch');
let sidebar = document.querySelector('.sidebar');
let range = document.querySelector('input[type="range"]');

generateGrid();

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

range.oninput = (e) => {
  let rangeValueElem = document.querySelector('.range-value');

  rangeValueElem.textContent = e.target.value;
};

range.onchange = () => generateGrid();

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
