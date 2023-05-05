// *const
const KEY_NUMBERS = document.querySelectorAll<HTMLButtonElement>(".js-number");
const OPERATION = document.querySelector(".js-operation") as HTMLElement;
const RESULT = document.querySelector(".js-result") as HTMLElement;

// *let
let test = RESULT.textContent?.length;

OPERATION.textContent = toString(test);


//
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));

function typeNumber(this: HTMLButtonElement) {
    let value = this.value;

    // if (condition) {

    // }

    RESULT.textContent += value;
}

OPERATION.textContent = "";
