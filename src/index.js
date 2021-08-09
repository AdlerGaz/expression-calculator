function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arrInputStr = expr.split('');
    let x = 0,
        temp = '';
    let arrTemp = [];


    arrInputStr.forEach(item => {
        if (/[0-9]/.test(item)) {
            temp += item;
        }
        if (/[/\*\-\+()]/.test(item)) {
            if (temp != '') {
                arrTemp.push(+temp);
                temp = '';
            }
            arrTemp.push(item)
        }
    });

    if (temp != '') {
        arrTemp.push(+temp);
    }

    let leftBracket = 0,
        rightBracket = 0;

    arrTemp.filter(item => {
        if (item == '(') {
            leftBracket++
        } else if (item == ')') {
            rightBracket++;
        }
    });

    if (leftBracket != rightBracket) {
        throw Error('ExpressionError: Brackets must be paired');
    }

    if (leftBracket != 0) {
        let brackets = [];
        let tempExpression = [];
        for (let i = 0; i < arrTemp.length; i++) {
            if (arrTemp[i] == '(') {
                brackets.push(i);
            }

            if (arrTemp[i] == ')') {
                tempExpression = arrTemp.splice(brackets[brackets.length - 1] + 1, i - brackets[brackets.length - 1] - 1);
                arrTemp.splice(brackets[brackets.length - 1], 2, expressionNotBracket(tempExpression));
                brackets.pop();
                i = brackets[brackets.length - 1] || 0;
                tempExpression = [];
            }
        }
    }

    return expressionNotBracket(arrTemp);
}

function calculator(a, b, operator) {
    switch (operator) {
        case '*':
            return a * b;
        case '/':
            if (b != 0) {
                return a / b;
            } else {
                throw Error("TypeError: Division by zero.");
            }
            case '+':
                return a + b;
            case '-':
                return a - b;
    }
}

function expressionNotBracket(arrTemp) {
    for (let i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i] === '*' || arrTemp[i] === '/') {
            arrTemp.splice(i - 1, 3, calculator(arrTemp[i - 1], arrTemp[i + 1], arrTemp[i]));
            i--;
        }
    }

    for (let i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i] == '+' || arrTemp[i] == '-') {
            arrTemp.splice(i - 1, 3, calculator(arrTemp[i - 1], arrTemp[i + 1], arrTemp[i]));
            i--;
        }
    }

    return arrTemp[0];
};

module.exports = {
    expressionCalculator
}