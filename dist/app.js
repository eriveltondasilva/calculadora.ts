"use strict";
const selector = (e) => document.querySelector(e);
const selectorBtn = (e) => document.querySelectorAll(e);
const KEY_NUMBERS = selectorBtn(".js-number");
const KEY_OPERATORS = selectorBtn(".js-operator");
const OPERATION = selector(".js-operation");
const RESULT = selector(".js-result");
const DELETE = selector(".js-delete");
const DELETE_ALL = selector(".js-delete-all");
const EQUALS = selector(".js-equals");
const displayLimiter = 9;
const pattern = /[-+×÷]/;
const displayLength = (e) => {
    var _a, _b;
    const displayLength = (_b = (_a = e.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    return displayLength;
};
const limiterOperator = () => {
    const limiterOperator = pattern.test(OPERATION.textContent || "");
    return limiterOperator;
};
DELETE_ALL.addEventListener("click", deleteAll);
function deleteAll() {
    RESULT.textContent = "";
    OPERATION.textContent = "";
}
DELETE.addEventListener("click", deleteCharacter);
function deleteCharacter(e) {
    _limiterEquals();
    if (displayLength(RESULT) === 0 && limiterOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
        return;
    }
}
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    const value = this.value;
    _limiterLength();
    _limiterEquals();
    _limiterZero();
    _limiterDot(value);
    RESULT.textContent += value;
}
function _limiterLength() {
    if (displayLength(RESULT) >= displayLimiter) {
        throw "";
    }
}
function _limiterZero() {
    var _a;
    const is_firstCharacter = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.charAt(0);
    if (is_firstCharacter === "0" && displayLength(RESULT) === 1) {
        RESULT.textContent = "";
        return;
    }
}
function _limiterDot(value) {
    var _a;
    const has_dot = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes(",");
    if (displayLength(RESULT) === 0 && value === ",") {
        RESULT.textContent += "0";
    }
    if (has_dot && value === ",") {
        throw "";
    }
}
function _limiterEquals() {
    var _a;
    const equals = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes("=");
    if (equals) {
        deleteAll();
    }
}
KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));
function typeOperator() {
    const value = this.value;
    if (displayLength(RESULT) === 0 && displayLength(OPERATION) === 0) {
        return;
    }
    if (limiterOperator() === true && displayLength(RESULT) === 0) {
        deleteCharacter(OPERATION);
        OPERATION.textContent += value;
        return;
    }
    if (limiterOperator() === true) {
        return;
    }
    OPERATION.textContent = _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";
    OPERATION.textContent += value;
}
function _filterNumber(e) {
    let string = e;
    if (string.endsWith(",")) {
        string = string.slice(0, -1);
    }
    return string;
}
EQUALS.addEventListener("click", typeEquals);
function typeEquals() {
    var _a;
    const equals = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes("=");
    if (displayLength(RESULT) === 0 || displayLength(OPERATION) === 0) {
        return;
    }
    if (equals) {
        return;
    }
    OPERATION.textContent += _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";
    let operation = OPERATION.textContent || "";
    let numbers = operation.replace(/[,]/g, ".").split(pattern);
    let firstNumber = Number(numbers[0]);
    let lastNumber = Number(numbers[1]);
    let result = _operations(firstNumber, lastNumber).toString().replace(".", ",");
    RESULT.innerHTML = `<div class="screen__equals"> = &nbsp </div> ${result}`;
}
function _operations(firstNumber, lastNumber) {
    var _a;
    const operator = String((_a = OPERATION.textContent) === null || _a === void 0 ? void 0 : _a.match(pattern));
    switch (operator) {
        case "+":
            return firstNumber + lastNumber;
        case "-":
            return firstNumber - lastNumber;
        case "×":
            return firstNumber * lastNumber;
        case "÷":
            return firstNumber / lastNumber;
        default:
            return 0;
    }
}
