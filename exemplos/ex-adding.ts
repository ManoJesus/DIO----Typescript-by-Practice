let button = document.getElementById("btn") as HTMLButtonElement;
let input1 = document.getElementsByClassName("input")[0] as HTMLInputElement;
let input2 = document.getElementsByClassName("input")[1] as HTMLInputElement;

function adding(number1: number, number2:number){
    return number1 + number2;
}
if(button){
    button.addEventListener('click', () => {
      if(input1 && input2){
          console.log(adding(Number(input1.value), Number(input2.value)));
      }
    })
}