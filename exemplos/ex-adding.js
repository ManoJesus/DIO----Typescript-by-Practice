"use strict";
let button = document.getElementById("btn");
let input1 = document.getElementsByClassName("input")[0];
let input2 = document.getElementsByClassName("input")[1];
function adding(number1, number2) {
    return number1 + number2;
}
if (button) {
    button.addEventListener('click', () => {
        if (input1 && input2) {
            console.log(adding(Number(input1.value), Number(input2.value)));
        }
    });
}
