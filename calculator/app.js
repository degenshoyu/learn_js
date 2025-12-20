const display = document.querySelector("#display");
console.log(display);
console.log(display.innerText);

const allButton = document.querySelectorAll(".key");
console.log(allButton);

allButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText + " button clicked");

    if (button.innerText === "C") {
      display.innerText = "0";
    } else if (button.innerText === "⌫") {
      display.innerText = display.innerText.slice(0, -1);
    } else if (button.innerText === "=")
      try {
        display.innerText = display.innerText.replaceAll("×", "*");
        display.innerText = display.innerText.replaceAll("÷", "/");
        let result = eval(display.innerText);
        display.innerText = parseFloat(result.toFixed(10));
      } catch {
        display.innerText = "ERROR!";
      }
    else if (display.innerText === "0" || display.innerText === "ERROR!") {
      display.innerText = button.innerText;
    } else {
      display.innerText = display.innerText + button.innerText;
    }
  });
});

document.addEventListener("keydown", (e) => {
  let key = e.key;
  console.log(key + " key pressed");

  if (key === "Enter") {
    key = "=";
  } else if (key === "Escape") {
    key = "C";
  } else if (key === "*") {
    key = "×";
  } else if (key === "/") {
    key = "÷";
  } else if (key === "Backspace") {
    key = "⌫";
  }

  console.log(key + " key pressed (translated)");

  allButton.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
});
