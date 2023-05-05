"use strict";
var _a;
const KEY_NUMBERS = document.querySelectorAll(".js-number");
const OPERATION = document.querySelector(".js-operation");
const RESULT = document.querySelector(".js-result");
let test = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.length;
OPERATION.textContent = toString(test);
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    let value = this.value;
    RESULT.textContent += value;
}
OPERATION.textContent = "";
