// * shortcuts
const selector = (e: string) => document.querySelector<HTMLElement>(e)!;
const selectorBtn = (e: string) => document.querySelectorAll<HTMLButtonElement>(e)!;
const deleteCharacter = (e: HTMLElement) => (e.textContent = e.textContent && e.textContent.slice(0, -1));

// * const para capturar elementos html
const KEY_NUMBERS = selectorBtn(".js-number");
const KEY_OPERATORS = selectorBtn(".js-operator");

const OPERATION = selector(".js-operation");
const RESULT = selector(".js-result");
const DELETE = selector(".js-delete");
const DELETE_ALL = selector(".js-delete-all");
const EQUALS = selector(". js-equals");

// * const
const displayLimiter = 9;

const displayLength = () => {
    const displayLength = RESULT.textContent?.length || 0;

    return displayLength;
};

const limiterOperator = () => {
    const pattern = /[-+×÷]/;
    const limiterOperator = pattern.test(OPERATION.textContent || "");

    return limiterOperator;
};

// * funções
// Deleta todas as informações da tela.
DELETE_ALL.addEventListener("click", () => {
    RESULT.textContent = "";
    OPERATION.textContent = "";
});

// Deleta todas as informações da tela.
DELETE.addEventListener("click", () => {
    if (displayLength() === 0 && limiterOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
    }

    deleteCharacter(RESULT);
});

// --------------------------------------------------
// --------------------------------------------------

KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber(this: HTMLButtonElement): void {
    const value = this.value;

    _limiterLength();

    _limiterZero(value);

    _limiterDot(value);

    RESULT.textContent += value;
}

// * funções auxiliares
//
function _limiterLength() {
    if (displayLength() >= displayLimiter) {
        throw "";
    }
}

//
function _limiterZero(value: string): void {
    const firstCharacter = RESULT.textContent?.charAt(0);

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

//
function _limiterDot(value: string) {
    const DOT = RESULT.textContent?.includes(",");

    if (DOT && value === ",") {
        throw "";
    }
}

// --------------------------------------------------
// --------------------------------------------------

KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));

function typeOperator(this: HTMLButtonElement) {
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

// --------------------------------------------------
// --------------------------------------------------

EQUALS.addEventListener("click", () => {
    // deleteCharacter(RESULT);
});
