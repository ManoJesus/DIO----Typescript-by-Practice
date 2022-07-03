// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

let botaoAtualizar = document.getElementById('atualizar-saldo') as HTMLButtonElement;
let botaoLimpar = document.getElementById('limpar-saldo') as HTMLButtonElement;
let inputSoma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo') as HTMLSpanElement;
let warning = document.getElementById('warning') as HTMLSpanElement;

campoSaldo.innerHTML = String(0);

function somarAoSaldo(valor : number) {
    campoSaldo.innerHTML += valor;
}

function limparSaldo() {
    campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', function () {  
    let somaValue = Number(inputSoma.value);
    if(somaValue){
        somarAoSaldo(somaValue);
        warning.innerHTML = "";
    }else{
        warning.innerHTML = "A soma tem que ser um Numero";
    }
});

botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});

