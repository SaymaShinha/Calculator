document.querySelectorAll("td").forEach(function (td) {
  td.addEventListener("click", calculation);
});

function calculation() {
  let typedText = event.target.innerHTML;
  let arithmeticOperators = ["+", "-", "×", "÷", "%"];
  let showResult = document.getElementById("result").value;

  if (!["CE", "C", "⌫", "="].includes(typedText)) {
    if (arithmeticOperators.includes(typedText) && showResult != "") {
      if(!arithmeticOperators.includes(showResult.at(-1))){
      if (showResult.match(/[-+×÷%]/)) {
        arithmeticOperation(showResult);

        document.getElementById("result").value += typedText;
        localStorage.setItem("ao", typedText);
      } else {
        localStorage.setItem("ao", typedText);
        localStorage.setItem("firstNumber", showResult);

        document.getElementById("result").value += typedText;
      }
      }
    } else {
      document.getElementById("result").value += typedText;
    }
  } else {
    if (typedText == "=") {
      arithmeticOperation(showResult);
    } else if (typedText == "CE") {
      localStorage.removeItem("ao");
      localStorage.removeItem("firstNumber");

      document.getElementById("result").value = "";
    } else if (typedText == "C") {
      document.getElementById("result").value = "";
    } else if (typedText == "⌫") {
      document.getElementById("result").value = showResult.slice(0, -1);
    }
  }
}



function arithmeticOperation(showResult) {
  let firstNumber = Number(localStorage.getItem("firstNumber"));
  let ao = localStorage.getItem("ao");
  let secondNumber = Number(showResult.split(/[-+×÷%]/)[1]);

  if (ao == "+") {
    document.getElementById("result").value = firstNumber + secondNumber;
  } else if (ao == "-") {
    document.getElementById("result").value = firstNumber - secondNumber;
  } else if (ao == "×") {
    document.getElementById("result").value = firstNumber * secondNumber;
  } else if( ao == "%"){
    document.getElementById("result").value = (firstNumber / secondNumber) * 100;
  } else {
    document.getElementById("result").value = firstNumber / secondNumber;
  }

  localStorage.setItem("firstNumber", document.getElementById("result").value);
}
