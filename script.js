let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";

// Helper function to handle the operator input
const handleOperator = (operator) => {
  if (["+", "-", "*", "/"].includes(operator) && /[+\-*/]$/.test(string))
    return;
  string += operator;
  input.value = string;
};

// Helper function to handle the number input
const handleNumber = (number) => {
  // Remove initial zero if present
  if (string === "0") string = "";
  string += number;
  input.value = string;
};

// Helper function to handle equal (=) input and calculate the result
const handleEqual = () => {
  try {
    string = new Function("return " + string)();
    input.value = string;
  } catch (error) {
    input.value = "Error";
  }
};

// Helper function to handle the AC (clear) button
const handleClear = () => {
  string = "";
  input.value = "0";
};

// Helper function to handle the DEL (delete) button
const handleDelete = () => {
  if (string.length === 1) {
    string = "";
    input.value = "0";
  } else {
    string = string.slice(0, -1);
    input.value = string;
  }
};

// Helper function to handle decimal point input
const handleDecimal = () => {
  if (string.includes(".")) return; // Prevent multiple decimals
  string += ".";
  input.value = string;
};

// Event listener for button clicks
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonText = e.target.innerHTML;

    // Handle different button cases
    if (buttonText === "=") {
      handleEqual();
    } else if (buttonText === "AC") {
      handleClear();
    } else if (buttonText === "DEL") {
      handleDelete();
    } else if (["+", "-", "*", "/", "%"].includes(buttonText)) {
      handleOperator(buttonText);
    } else if (buttonText === ".") {
      handleDecimal();
    } else {
      handleNumber(buttonText);
    }
  });
});
