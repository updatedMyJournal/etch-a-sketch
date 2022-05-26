let range = document.querySelector('input[type="range"]');

range.oninput = (e) => {
  let rangeValueElem = document.querySelector('.range-value');

  rangeValueElem.textContent = e.target.value;
};

