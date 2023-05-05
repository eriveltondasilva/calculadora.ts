// * shortcuts
const SELECTOR = (selector: string) => document.querySelector<HTMLElement>(selector)!;
const SELECTOR_BTN = (selector: string) => document.querySelectorAll<HTMLButtonElement>(selector)!;

// * const para capturar elementos html
const KEY_NUMBERS = SELECTOR_BTN(".js-number");
const KEY_OPERATORS = SELECTOR_BTN(".js-operator");

const OPERATION = SELECTOR(".js-operation");
const RESULT = SELECTOR(".js-result");
const DELETE = SELECTOR(".js-delete");
const DELETE_ALL = SELECTOR(".js-delete-all");

// * const
const displayLimiter = 8;

// * funções

// Deleta todas as informações da tela.
DELETE_ALL.addEventListener("click", () => {
    RESULT.textContent = "";
    OPERATION.textContent = "";
});

KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));

function typeNumber(this: HTMLButtonElement): void {
    const value = this.value;
    const displayLength = RESULT.textContent?.length ?? 0;

    _displayLength(displayLength);

    _limiterZero(value, displayLength);

    _limiterDot(value);

    RESULT.textContent += value;
}

// funções auxiliares
function _displayLength(displayLength: number): void {
    if (displayLength >= displayLimiter) {
        throw "";
    }
}

//
function _limiterZero(value: string, displayLength: number): void {
    const firstCharacter = RESULT.textContent?.charAt(0);

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

//
function _limiterDot(value: string) {
    const DOT = RESULT.textContent?.includes(",");

    if (DOT && value === ",") {
        throw "";
    }
}

//

KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));

function typeOperator(this: HTMLButtonElement): void {
    const value = this.value;

    RESULT.textContent += value;
}
