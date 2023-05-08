"use strict";
const displayLimiter = 9;
const limitsResult = 10;
const pattern = /[-+×÷]/;
const selector = (e) => document.querySelector(e);
const selectorBtn = (e) => document.querySelectorAll(e);
const KEY_NUMBERS = selectorBtn(".js-number");
const KEY_OPERATORS = selectorBtn(".js-operator");
const OPERATION = selector(".js-operation");
const RESULT = selector(".js-result");
const DELETE = selector(".js-delete");
const DELETE_ALL = selector(".js-delete-all");
const EQUALS = selector(".js-equals");
const displayLengthOf = (e) => { var _a, _b; return (_b = (_a = e.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0; };
const deletesLastCharacterOf = (e) => (e.textContent = e.textContent && e.textContent.slice(0, -1));
const hasOperator = () => pattern.test(OPERATION.textContent || "");
const hasEquals = () => { var _a; return (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes("="); };
function _limiterLength() {
    if (displayLengthOf(RESULT) >= displayLimiter) {
        throw "";
    }
}
function _limiterZero() {
    var _a;
    const is_firstCharacter = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.charAt(0);
    if (is_firstCharacter === "0" && displayLengthOf(RESULT) === 1) {
        RESULT.textContent = "";
        return;
    }
}
function _limiterDot(value) {
    var _a;
    const has_dot = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes(",");
    if (displayLengthOf(RESULT) === 0 && value === ",") {
        RESULT.textContent += "0";
    }
    if (has_dot && value === ",") {
        throw "";
    }
}
function _limiterEquals() {
    if (hasEquals()) {
        deleteAll();
    }
}
function _filterNumber(e) {
    if (e.endsWith(",")) {
        e = e.slice(0, -1);
    }
    return e;
}
DELETE_ALL.addEventListener("click", deleteAll);
function deleteAll() {
    RESULT.textContent = "";
    OPERATION.textContent = "";
}
DELETE.addEventListener("click", () => {
    _limiterEquals();
    if (displayLengthOf(RESULT) <= 1 && hasOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
    }
    deletesLastCharacterOf(RESULT);
});
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    const value = this.value;
    _limiterLength();
    _limiterEquals();
    _limiterZero();
    _limiterDot(value);
    RESULT.textContent += value;
}
KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));
function typeOperator() {
    var _a;
    const value = this.value;
    if (displayLengthOf(RESULT) === 0 && displayLengthOf(OPERATION) === 0) {
        return;
    }
    if (hasEquals()) {
        OPERATION.textContent = ((_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.slice(6)) || "";
        RESULT.textContent = "";
        OPERATION.textContent += value;
        return;
    }
    if (hasOperator() === true && displayLengthOf(RESULT) === 0) {
        deletesLastCharacterOf(OPERATION);
        OPERATION.textContent += value;
        return;
    }
    if (hasOperator() === true) {
        return;
    }
    OPERATION.textContent = _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";
    OPERATION.textContent += value;
}
EQUALS.addEventListener("click", typeEquals);
function typeEquals() {
    if (displayLengthOf(RESULT) === 0 || displayLengthOf(OPERATION) === 0) {
        return;
    }
    if (hasEquals()) {
        return;
    }
    OPERATION.textContent += _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";
    let operation = OPERATION.textContent || "";
    let numbers = operation.replace(/[,]/g, ".").split(pattern);
    let firstNumber = Number(numbers[0]);
    let lastNumber = Number(numbers[1]);
    let result = operations(firstNumber, lastNumber).toString().replace(".", ",");
    if (result.length > limitsResult) {
        result = "Error! Too large";
    }
    RESULT.innerHTML = `<div class="screen__equals"> = &nbsp </div> ${result}`;
}
function operations(firstNumber, lastNumber) {
    var _a;
    const operator = String((_a = OPERATION.textContent) === null || _a === void 0 ? void 0 : _a.match(pattern));
    switch (operator) {
        case "+":
            return (firstNumber * 10 + lastNumber * 10) / 10;
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
