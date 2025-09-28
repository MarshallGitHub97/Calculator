const resultText = document.querySelector(".result");
const button = document.querySelectorAll("button");

let result = "";
let operator = "";
let newNumber = 0;
let savedNumber = 0;
let operatorAlreadyUsed = false;

button.forEach((element) => {
  element.addEventListener("click", (e) => {
    const className = e.target.className;
    let clickedValue = e.target.innerHTML;

    if (className == "number") {
      newNumber += clickedValue.toString();
      console.log(newNumber);

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
        console.log(`Operator: ${operator}`);
        console.log(`New Number: ${newNumber}`);
        console.log(`Saved Number: ${savedNumber}`);

        result = operate(operator, savedNumber, newNumber);
        newNumber = result;
        operator = "";
        operatorAlreadyUsed = false;
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
          result += operator;
        }
      } else {
        savedNumber = newNumber;
        newNumber = "";
        operator = clickedValue;
        operatorAlreadyUsed = true;
      }
    } else if (className == "system") {
      result = "";
      operatorAlreadyUsed = false;
    } else {
    }
    console.log(result);
    updateResult(result);
  });
});

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
