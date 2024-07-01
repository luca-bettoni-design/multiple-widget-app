const display = document.getElementById('id-calculator-output');

function appendCalcChar(character) {
    if (display.value === '0') {
        display.value = character;
    } else {
        display.value += character;
    }
}

function clearDisplay() {
    document.getElementById('id-calculator-output').value = '0';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

function calculateResult() {
    const display = document.getElementById('id-calculator-output');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}