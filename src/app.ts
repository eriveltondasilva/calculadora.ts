// * Const
const displayLimiter: number = 9;
const limitsResult: number = 10;
const pattern = /[-+×÷]/;

// * Const: shortcuts
const selector = (e: string) => document.querySelector<HTMLElement>(e)!;
const selectorBtn = (e: string) => document.querySelectorAll<HTMLButtonElement>(e)!;

// * Const: elementos HTML
const KEY_NUMBERS = selectorBtn(".js-number");
const KEY_OPERATORS = selectorBtn(".js-operator");

const OPERATION = selector(".js-operation");
const RESULT = selector(".js-result");
const DELETE = selector(".js-delete");
const DELETE_ALL = selector(".js-delete-all");
const EQUALS = selector(".js-equals");

// * Const: funções
const displayLengthOf = (e: HTMLElement) => e.textContent?.length ?? 0;
const deletesLastCharacterOf = (e: HTMLElement) => (e.textContent = e.textContent && e.textContent.slice(0, -1));
const hasOperator = () => pattern.test(OPERATION.textContent || "");
const hasEquals = () => RESULT.textContent?.includes("=");

// --------------------------------------------------
// --------------------------------------------------

// * Funções auxiliares
// Limita os caracteres da tela
function _limiterLength() {
    if (displayLengthOf(RESULT) >= displayLimiter) {
        throw "";
    }
}

// Limita os zeros
function _limiterZero() {
    const is_firstCharacter = RESULT.textContent?.charAt(0);

    if (is_firstCharacter === "0" && displayLengthOf(RESULT) === 1) {
        RESULT.textContent = "";
        return;
    }
}

// Limita os pontos
function _limiterDot(value: string) {
    const has_dot = RESULT.textContent?.includes(",");

    if (displayLengthOf(RESULT) === 0 && value === ",") {
        RESULT.textContent += "0";
    }

    if (has_dot && value === ",") {
        throw "";
    }
}

// Limita quando há um sinal de igualdade na tela
function _limiterEquals() {
    if (hasEquals()) {
        deleteAll();
    }
}

// Filtro que impede número com vírgula sem a parte decimal
function _filterNumber(e: string) {
    if (e.endsWith(",")) {
        e = e.slice(0, -1);
    }
    return e;
}

// --------------------------------------------------
// --------------------------------------------------

// * Deleta todas as informações da tela.
DELETE_ALL.addEventListener("click", deleteAll);
function deleteAll() {
    RESULT.textContent = "";
    OPERATION.textContent = "";
}

// * Deleta o último caractere
DELETE.addEventListener("click", () => {
    _limiterEquals();

    // Tira o conteúdo do screen__operation e retorna-o para o screen__result
    if (displayLengthOf(RESULT) <= 1 && hasOperator()) {
        RESULT.textContent = OPERATION.textContent;
        OPERATION.textContent = "";
    }

    // Função para apagar o último caractere do screen__result
    deletesLastCharacterOf(RESULT);
});

// --------------------------------------------------
// --------------------------------------------------

// * Digita os números na tela
KEY_NUMBERS.forEach((number) => number.addEventListener("click", typeNumber));
function typeNumber(this: HTMLButtonElement) {
    const value = this.value;

    // Limitadores
    _limiterLength();
    _limiterEquals();
    _limiterZero();
    _limiterDot(value);

    RESULT.textContent += value;
}

// --------------------------------------------------
// --------------------------------------------------

// * Digita os sinais das operações
KEY_OPERATORS.forEach((operator) => operator.addEventListener("click", typeOperator));
function typeOperator(this: HTMLButtonElement) {
    const value = this.value;

    // Limita inserção de sinais de operação
    if (displayLengthOf(RESULT) === 0 && displayLengthOf(OPERATION) === 0) {
        return;
    }

    if (hasEquals()) {
        // Retira o sinal de igual do screen__result e joga o resultado de volta no screen__operation
        OPERATION.textContent = RESULT.textContent?.slice(6).replace("-", "") || "";
        RESULT.textContent = "";

        OPERATION.textContent += value;
        return;
    }

    // Troca o sinal da operação atual
    if (hasOperator() === true && displayLengthOf(RESULT) === 0) {
        deletesLastCharacterOf(OPERATION);
        OPERATION.textContent += value;
        return;
    }

    // Limita sinais de operação
    if (hasOperator() === true) {
        return;
    }

    OPERATION.textContent = _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";
    OPERATION.textContent += value;
}

// --------------------------------------------------
// --------------------------------------------------

//
EQUALS.addEventListener("click", typeEquals);
function typeEquals() {
    let result: number | string;

    //
    if (displayLengthOf(RESULT) === 0 || displayLengthOf(OPERATION) === 0) {
        return;
    }

    //
    if (hasEquals()) {
        return;
    }

    //
    OPERATION.textContent += _filterNumber(RESULT.textContent || "");
    RESULT.textContent = "";

    //
    let operation = OPERATION.textContent || "";
    let numbers = operation.replace(/[,]/g, ".").split(pattern);

    //
    let firstNumber = Number(numbers[0]);
    let lastNumber = Number(numbers[1]);

    //
    result = operations(firstNumber, lastNumber);

    let hasDot = result.toString().includes(".");

    if (hasDot) {
        result = result.toFixed(5);
        result = Number(result);
    }

    result = result.toString().replace(".", ",");

    if (result.length > limitsResult) {
        result = "Error! Too large";
        // result = result.slice(0, limitsResult) + "e+";
    }

    //
    RESULT.innerHTML = `<div class="screen__equals"> = &nbsp </div> ${result}`;
}

// Executa as operações
function operations(firstNumber: number, lastNumber: number) {
    const operator = String(OPERATION.textContent?.match(pattern));

    switch (operator) {
        case "+":
            // Multiplica ambos os números por 10 e divide por 10 para evitar a imprecisão dos números decimais(0.2+0.1!=0.3).
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
