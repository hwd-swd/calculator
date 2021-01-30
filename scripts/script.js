// all the math functions

function add(a,b){
    ans = a+b;
    return +ans.toFixed(7).toString()
}

function subtract(a,b){
    ans = a-b;
    return +ans.toFixed(7).toString()
}
function multiply(a,b){
    ans = a*b;
    return +ans.toFixed(7).toString()
}

function divide(a,b){
    ans = a/b;
    return +ans.toFixed(7).toString()
}

function exp(a,b){
    ans = a**b;
    return +ans.toFixed(7).toString()
}


function operate(op,a,b){//function that calculates and updates the result based on the operator
    let array = [parseFloat(a),parseFloat(b)];
    prevNumber = '';
    operator = '';
    displayValue = '';
    switch (op){
        case 'add':
            // prevNumber = add(array[0],array[1]);
            return add(array[0],array[1]);
        case 'subtract':
            // prevNumber = subtract(array[0],array[1])
            return subtract(array[0],array[1])
        case 'multiply':
            // prevNumber = multiply(array[0],array[1])
            return multiply(array[0],array[1])
        case 'divide':
            // prevNumber = divide(array[0],array[1])
            return divide(array[0],array[1])
        case 'exp':
            // prevNumber = exp(array[0],array[1])
            return exp(array[0],array[1])
    }
}

function inputClick(e) { //function that inputs numbers when selected
    
    if (operator==''&&prevNumber!=''){ //if there is no operator and a previous number
        prevNumber = '';  //clears the input for a new number
        displayValue = e.target.textContent;
    }
    else if (displayValue == '0' || displayValue == ''){  //if there is no display
        displayValue = e.target.textContent; //replaces the input for a new number
    }
    else if (displayValue.length<10){ //adds digits when pressed
        displayValue = displayValue + e.target.textContent;
    }
    
    updateDisplay();
}

function operatorClick(e){ //function that triggers when an operator is clicked
    
    if (prevNumber==''&& displayValue!=''){  //if there is no previous number
        // and there is a display value
        operator = e.target.getAttribute('id');  //stores the operator
        prevNumber=displayValue.toString().slice(0);  //stores the display value 
        displayValue = '';
    }

    //if there is a prev number, operator, and current number
    //calculates the answer
    else if(prevNumber!='' && operator!='' && displayValue!=''){
        prevNumber = operate(operator, prevNumber,displayValue);
        operator = e.target.getAttribute('id');
    }
    else { //replaces the operator
        operator = e.target.getAttribute('id');
    }
    updateDisplay();
}

function equalsClick(e){  //function that calculates when the equals is pressed
    if(prevNumber!='' && operator!='' && displayValue!=''){//if there is a previous number stored with an opeartor stored, operators those two numbers
        displayValue = operate(operator, prevNumber,displayValue);
    }

    updateDisplay();
}

function clearDisplay(e){  //function that clears the display 
    prevNumber = '';
    operator = '';
    displayValue = '0';
    updateDisplay();
}

function clearCurrentDisplay(e){  //clears current displayValue
    if (prevNumber==''){
        displayValue ='0';
    }
    else{
        displayValue = '';
    }
    updateDisplay();
}

function updateDisplay(e){  //function that updates the display
    switch (operator){
        case 'add':
            sign = '+';
            break;
        case 'subtract':
            sign = '-';
            break;
        case 'multiply':
            sign = '×';
            break;
        case 'divide':
            sign = '/';
            break;
        case 'exp':
            sign = '^';
            break;
        default:
            sign = '';
    }
    display.textContent = `${prevNumber} ${sign} ${displayValue}`;
}

function manipulate(e){  //function for the decimal point and the negative/positive toggle
    if (prevNumber != '' && operator == '' && displayValue == ''){
        displayValue = prevNumber.toString().slice(0);
        prevNumber = '';
    }
    switch (e.target.getAttribute('id')){
        case 'toggle':
            if (!displayValue.toString().includes('-')&&displayValue!=''){
                displayValue = '-' + displayValue.toString().slice(0);
            }
            else if (displayValue.toString().includes('-')&&displayValue!=''){
                displayValue = displayValue.toString().slice(1);
            }    
            break;
        case 'dot':
            if (!displayValue.toString().includes('.')&&displayValue!=''){
                displayValue = displayValue.toString().slice(0)+'.';
            }
    }
    updateDisplay();
    
}

//DOM
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const manipulators = document.querySelectorAll(".manipulator");
const clear = document.querySelector("#clear");
const clearCurrent = document.querySelector("#clearCurrent");
const equals = document.querySelector("#equals");

numbers.forEach(number=>number.addEventListener('click', inputClick));
operators.forEach(operator=>operator.addEventListener('click', operatorClick));
manipulators.forEach(manipulator=>manipulator.addEventListener('click',manipulate))
clear.addEventListener('click',clearDisplay);
clearCurrent.addEventListener('click',clearCurrentDisplay);
equals.addEventListener('click',equalsClick);

let prevNumber = "";
let operator = "";
let displayValue = '0';

