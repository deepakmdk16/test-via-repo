let display = document.getElementById('result');
let currentValue = '0';
let hasCalculated = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendToDisplay(value) {
    if (hasCalculated) {
        if (['+', '-', '*', '/'].includes(value)) {
            hasCalculated = false;
        } else {
            currentValue = '0';
            hasCalculated = false;
        }
    }

    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else if (value === '.' && currentValue.includes('.')) {
        return;
    } else if (value === '.' && ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
        currentValue += '0.';
    } else {
        currentValue += value;
    }

    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    hasCalculated = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    hasCalculated = false;
    updateDisplay();
}

function applyFunction(func) {
    try {
        let value = parseFloat(currentValue);
        let result;

        if (func === 'sin') {
            result = Math.sin(value * Math.PI / 180);
        } else if (func === 'cos') {
            result = Math.cos(value * Math.PI / 180);
        }

        currentValue = result.toString();
        hasCalculated = true;
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        hasCalculated = true;
        updateDisplay();
    }
}

function calculate() {
    try {
        let expression = currentValue;

        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');

        const sanitizedExpression = expression.replace(/[^0-9+\-*/.()Mathsinco]/g, '');

        if (['+', '-', '*', '/'].includes(sanitizedExpression.slice(-1))) {
            return;
        }

        const result = eval(sanitizedExpression);

        if (!isFinite(result)) {
            currentValue = 'Error';
        } else {
            currentValue = result.toString();
        }

        hasCalculated = true;
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        hasCalculated = true;
        updateDisplay();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});
