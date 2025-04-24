// Bar Moshe 211704580 , Ofek ben david 206514382 
let fromBase = 10;
let toBase = 2;
const fromButtons = document.querySelectorAll("#from-buttons button");
const toButtons = document.querySelectorAll("#to-buttons button");
const inputNumber = document.getElementById("numberbefor");
const convertBtn = document.querySelector(".result");
const output = document.getElementById("output");

function updateSelectedButton(buttons, selectedBase) {
  buttons.forEach((btn) => {
    if (Number(btn.dataset.base) === selectedBase) {
      btn.style.transform = "scale(1.25)";
    } else {
      btn.style.transform = "scale(1)";
    }
  });
}

fromButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    fromBase = Number(btn.dataset.base);
    updateSelectedButton(fromButtons, fromBase);
  });
});

toButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    toBase = Number(btn.dataset.base);
    updateSelectedButton(toButtons, toBase);
  });
});

function isValidInput(input, base) {
  const regex = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^\d+$/,
    16: /^[0-9A-Fa-f]+$/,
  };
  return regex[base].test(input);
}

function convertBase(num, fromBase, toBase) {
  return parseInt(num, fromBase).toString(toBase).toUpperCase();
}

convertBtn.addEventListener("click", function () {
  const input = inputNumber.value.trim();
  if (!isValidInput(input, fromBase)) {
    alert("Invalid input for the selected base!");
    inputNumber.value = "";
    output.textContent = "";
    return;
  }

  const converted = convertBase(input, fromBase, toBase);
  output.innerHTML = `Result: ${input}<sub>${fromBase}</sub> = ${converted}<sub>${toBase}</sub>`;
  inputNumber.value = "";
});

updateSelectedButton(fromButtons, fromBase);
updateSelectedButton(toButtons, toBase);
