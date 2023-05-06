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
const EQUALS = selector(".js-equals");
// const SCREEN_EQUALS = selector(".js-screenEquals");

// * const
const displayLimiter = 9;

const displayLength = (e: HTMLElement): number => {
    const displayLength = e.textContent?.length ?? 0;
    return displayLength;
};

const limiterOperator = () => {
    const pattern = /[-+×÷]/;
    const limiterOperator = pattern.test(OPERATION.textContent || "");
    return limiterOperator;
};

// * funções
// Deleta todas as informações da tela.
DELETE_ALL.addEventListener("click", deleteAll);

function deleteAll() {
    RESULT.textContent = "";
    OPERATION.textContent = "";
}

// Deleta todas as informações da tela.
DELETE.addEventListener("click", () => {
    _limiterEquals();
    
    if (displayLength(RESULT) === 0 && limiterOperator()) {
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

    _limiterEquals();

    _limiterZero(value);

    _limiterDot(value);

    RESULT.textContent += value;
}

// * funções auxiliares
//
function _limiterLength() {
    if (displayLength(RESULT) >= displayLimiter) {
        throw "";
    }
}

//
function _limiterZero(value: string): void {
    const is_firstCharacter = RESULT.textContent?.charAt(0);

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

//
function _limiterDot(value: string) {
    const has_dot = RESULT.textContent?.includes(",");

    if (displayLength(RESULT) === 0 && value === ",") {
        RESULT.textContent += "0";
    }

    if (has_dot && value === ",") {
        throw "";
    }
}

//
function _limiterEquals() {
    const equals = RESULT.textContent?.includes("=");

    if (equals) {
        deleteAll();
    }
}

// --------------------------------------------------
// --------------------------------------------------

KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));

function typeOperator(this: HTMLButtonElement) {
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

// --------------------------------------------------
// --------------------------------------------------

EQUALS.addEventListener("click", typeEquals);

function typeEquals() {
    let operation = "";
    let results: string[] = [];
    let result = "";
    const pattern = /[-+×÷]/;
    const equals = RESULT.textContent?.includes("=");
    // const screenEquals = SCREEN_EQUALS.textContent?.length ?? 0;

    //
    if (displayLength(RESULT) === 0 || displayLength(OPERATION) === 0) {
        return;
    }

    //
    if (equals) {
        return;
    }

    //
    OPERATION.textContent += RESULT.textContent ?? "";
    RESULT.textContent = "";

    //
    operation = OPERATION.textContent ?? "";
    operation = operation.replace(/[,]/g, ".");
    results = operation.split(pattern);

    //
    let firstNumber = Number(results[0]);
    let lastNumber = Number(results[1]);

    // switch (key) {
    //     case value:
    //         break;

    //     default:
    //         break;
    // }

    result = String(firstNumber + lastNumber).replace(/[.]/g, ",");
    RESULT.textContent = "= " + result;
    // SCREEN_EQUALS.textContent = "= ";
    // RESULT.textContent = "= " + result[1] + "----" + result[0];
}
