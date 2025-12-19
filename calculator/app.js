const display = document.querySelector("#display");
console.log(display);

const allButton = document.querySelectorAll(".key");
console.log(allButton);

allButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText + " button clicked");
    if (button.innerText === "C") {
      display.innerText = "0";
    } else if (button.innerText === "=")
      try {
        display.innerText = eval(display.innerText);
      } catch {
        display.innerText = "ERROR";
      }
    else if (display.innerText === "0" || display.innerText === "ERROR") {
      display.innerText = button.innerText;
    } else {
      display.innerText = display.innerText + button.innerText;
    }
  });
});
