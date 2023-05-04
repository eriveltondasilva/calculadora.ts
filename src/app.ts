// # const
const KEY_NUMBERS = document.querySelectorAll(".js-number");
const OPERATION = document.querySelector(".js-operation") as HTMLElement;
const RESULT = document.querySelector(".js-result") as HTMLElement;

//
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));

function typeNumber(this: HTMLButtonElement) {
    let value = this.value;
    OPERATION.innerHTML += value;
}
