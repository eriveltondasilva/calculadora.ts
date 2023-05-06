"use strict";
const selector = (e) => document.querySelector(e);
const selectorBtn = (e) => document.querySelectorAll(e);
const deleteCharacter = (e) => (e.textContent = e.textContent && e.textContent.slice(0, -1));
const KEY_NUMBERS = selectorBtn(".js-number");
const KEY_OPERATORS = selectorBtn(".js-operator");
const OPERATION = selector(".js-operation");
const RESULT = selector(".js-result");
const DELETE = selector(".js-delete");
const DELETE_ALL = selector(".js-delete-all");
const EQUALS = selector(".js-equals");
const displayLimiter = 9;
const displayLength = (e) => {
    var _a, _b;
    const displayLength = (_b = (_a = e.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    return displayLength;
};
const limiterOperator = () => {
    const pattern = /[-+×÷]/;
    const limiterOperator = pattern.test(OPERATION.textContent || "");
    return limiterOperator;
};
DELETE_ALL.addEventListener("click", deleteAll);
function deleteAll() {
    RESULT.textContent = "";
    OPERATION.textContent = "";
}
DELETE.addEventListener("click", () => {
    _limiterEquals();
    if (displayLength(RESULT) === 0 && limiterOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
    }
    deleteCharacter(RESULT);
});
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    const value = this.value;
    _limiterLength();
    _limiterEquals();
    _limiterZero(value);
    _limiterDot(value);
    RESULT.textContent += value;
}
function _limiterLength() {
    if (displayLength(RESULT) >= displayLimiter) {
        throw "";
    }
}
function _limiterZero(value) {
    var _a;
    const is_firstCharacter = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.charAt(0);
    if (is_firstCharacter === "0" && value === ",") {
        return;
    }
    if (is_firstCharacter === "0" && displayLength(RESULT) === 1) {
        RESULT.textContent = "";
        return;
    }
    if (is_firstCharacter === "0" && value === "0") {
        throw "";
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
    OPERATION.textContent = RESULT.textContent;
    RESULT.textContent = "";
    OPERATION.textContent += value;
}
EQUALS.addEventListener("click", typeEquals);
function typeEquals() {
    var _a, _b, _c;
    let operation = "";
    let results = [];
    let result = "";
    const pattern = /[-+×÷]/;
    const equals = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.includes("=");
    if (displayLength(RESULT) === 0 || displayLength(OPERATION) === 0) {
        return;
    }
    if (equals) {
        return;
    }
    OPERATION.textContent += (_b = RESULT.textContent) !== null && _b !== void 0 ? _b : "";
    RESULT.textContent = "";
    operation = (_c = OPERATION.textContent) !== null && _c !== void 0 ? _c : "";
    operation = operation.replace(/[,]/g, ".");
    results = operation.split(pattern);
    let firstNumber = Number(results[0]);
    let lastNumber = Number(results[1]);
    result = String(firstNumber + lastNumber).replace(/[.]/g, ",");
    RESULT.textContent = "= " + result;
}
