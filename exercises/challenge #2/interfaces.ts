// Como podemos melhorar o esse código usando TS? 


enum Profissao{
    ATRIZ = "Atriz",
    PEDREIRO = "Pedreiro",
    PADEIRO = "Padeiro"
}

interface Pessoa{
    nome:string;
    idade:number;
    profissao: Profissao;
}

let maria:Pessoa = {
    nome: "Maria",
    idade:29,
    profissao: Profissao.ATRIZ
}


let roberto:Pessoa = {
    nome : "roberto",
    idade : 19,
    profissao : Profissao.PEDREIRO,
}


let laura:Pessoa = {
    nome: "laura",
    idade: 32,
    profissao: Profissao.ATRIZ
};

let carlos:Pessoa = {
    nome : "carlos",
    idade : 19,
    profissao : Profissao.PADEIRO
}