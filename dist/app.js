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
const EQUALS = selector(". js-equals");
const displayLimiter = 9;
const displayLength = () => {
    var _a;
    const displayLength = ((_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.length) || 0;
    return displayLength;
};
const limiterOperator = () => {
    const pattern = /[-+×÷]/;
    const limiterOperator = pattern.test(OPERATION.textContent || "");
    return limiterOperator;
};
DELETE_ALL.addEventListener("click", () => {
    RESULT.textContent = "";
    OPERATION.textContent = "";
});
DELETE.addEventListener("click", () => {
    if (displayLength() === 0 && limiterOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
    }
    deleteCharacter(RESULT);
});
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber() {
    const value = this.value;
    _limiterLength();
    _limiterZero(value);
    _limiterDot(value);
    RESULT.textContent += value;
}
function _limiterLength() {
    if (displayLength() >= displayLimiter) {
        throw "";
    }
}
function _limiterZero(value) {
    var _a;
    const firstCharacter = (_a = RESULT.textContent) === null || _a === void 0 ? void 0 : _a.charAt(0);
    if (firstCharacter === "0" && value === ",") {
        return;
    }
    if (firstCharacter === "0" && displayLength() === 1) {
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
    if (limiterOperator() && displayLength()) {
        return;
    }
    if (limiterOperator()) {
        deleteCharacter(OPERATION);
        OPERATION.textContent += value;
        return;
    }
    OPERATION.textContent = RESULT.textContent;
    RESULT.textContent = "";
    OPERATION.textContent += value;
}
EQUALS.addEventListener("click", () => {
});
