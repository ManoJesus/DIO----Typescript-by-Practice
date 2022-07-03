let button = document.getElementById("btn");
let input1 = document.getElementsByClassName("input")[0];
let input2 = document.getElementsByClassName("input")[1];

button.addEventListener('click', ()=>{
    console.log(soma(input1.value, input2.value));
});

function soma(number1, number2){
    if(typeof number1 === "number" && typeof number2 === "number"){
        return number1 + number2;
    }else{
        return Number(number1) + Number(number2);
    }
}