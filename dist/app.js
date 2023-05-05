"use strict";
const SELECTOR = (selector) => document.querySelector(selector);
const SELECTOR_BTN = (selector) => document.querySelectorAll(selector);
const KEY_NUMBERS = SELECTOR_BTN(".js-number");
const KEY_OPERATORS = SELECTOR_BTN(".js-operator");
const OPERATION = SELECTOR(".js-operation");
const RESULT = SELECTOR(".js-result");
const DELETE = SELECTOR(".js-delete");
const DELETE_ALL = SELECTOR(".js-delete-all");
const displayLimiter = 8;
DELETE_ALL.addEventListener("click", () => {
    RESULT.textContent = "";
    OPERATION.textContent = "";
});
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    var _a, _b;
    const value = this.value;
    const displayLength = (_b = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    _displayLength(displayLength);
    _limiterZero(value, displayLength);
    _limiterDot(value);
    RESULT.textContent += value;
}
function _displayLength(displayLength) {
    if (displayLength >= displayLimiter) {
        throw "";
    }
}
function _limiterZero(value, displayLength) {
    var _a;
    const firstCharacter = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.charAt(0);
    if (firstCharacter === "0" && value === ",") {
        return;
    }
    if (firstCharacter === "0" && displayLength === 1) {
        RESULT.textContent = "";
        return;
    }
    if (firstCharacter === "0" && value === "0") {
        throw "";
    }
}
function _limiterDot(value) {
    var _a;
    const DOT = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes(",");
    if (DOT && value === ",") {
        throw "";
    }
}
KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));
function typeOperator() {
    const value = this.value;
    RESULT.textContent += value;
}
