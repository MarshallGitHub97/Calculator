const resultText = document.querySelector(".result");
const button = document.querySelectorAll("button");

let result = "";
let operator = "";
let newNumber = 0;
let savedNumber = 0;
let operatorAlreadyUsed = false;
let resultIsShown = false;

button.forEach((element) => {
  element.addEventListener("click", (e) => {
    const className = e.target.className;
    let clickedValue = e.target.innerHTML;

    if (className == "number") {
      if (resultIsShown) {
        result = "";
        newNumber = 0;
        resultIsShown = false;
      }
      if (clickedValue === "." && newNumber.toString().includes(".")) {
        clickedValue = "";
      }

      newNumber += clickedValue.toString();

      if (result == 0) {
        result = clickedValue.toString();
      } else {
        result += clickedValue.toString();
      }
    }

    if (className == "operator") {
      result += clickedValue;
      console.log(`NewNumber im Operator: ${newNumber}`);
      newNumber = Number(newNumber);

      if (clickedValue === "=") {
        result = operate(operator, savedNumber, newNumber);
        let decimalResult = result;
        result = round(decimalResult, 4);
        newNumber = result;
        operator = "";
        operatorAlreadyUsed = false;
        resultIsShown = true;
      } else if (operatorAlreadyUsed) {
        if (newNumber === undefined || newNumber === "") {
          operator = clickedValue;
          operatorAlreadyUsed = true;
        } else {
          result = operate(operator, savedNumber, newNumber);
          savedNumber = result;
          newNumber = "";
          operator = clickedValue;
          operatorAlreadyUsed = true;
          //resultIsShown = true;
          result += operator;
        }
      } else {
        savedNumber = newNumber;
        newNumber = "";
        operator = clickedValue;
        operatorAlreadyUsed = true;
        resultIsShown = false;
      }
    } else if (className == "system") {
      if (clickedValue === "AC") {
        result = "";
        operatorAlreadyUsed = false;
      }
      console.log(clickedValue);
      if (clickedValue === "D") {
        clickedValue = "";
        result = result.toString();
        console.log(result);
        console.log(typeof result);

        result = result.slice(0, result.length - 1);
        newNumber = result;
      }
    } else {
    }
    updateResult(result);
  });
});

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function updateResult(result) {
  resultText.innerHTML = result;
}

function add(a, b) {
  console.log(`Add: ${a} + ${b}`);
  return a + b;
}

function subtract(a, b) {
  console.log(`Subtract: ${a} - ${b}`);
  return a - b;
}

function multiply(a, b) {
  console.log(`Multiply: ${a} * ${b}`);
  return a * b;
}

function divide(a, b) {
  console.log(`Divide: ${a} / ${b}`);
  return a / b;
}

function operate(operator, a, b) {
  console.log(`operator:${operator} a:${a} b:${b}`);
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "×") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
}
