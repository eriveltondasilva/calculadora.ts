"use strict";
// # const
const KEY_NUMBERS = document.querySelectorAll(".js-number");
const OPERATION = document.querySelector(".js-operation");
const RESULT = document.querySelector(".js-result");
//
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    let value = this.value;
    OPERATION.innerHTML += value;
}
