import * as typesUtil from "./types";

let apiKey: string = '4e2b70568100cff45264c69c94334219';

let requestToken: string | undefined;
let username: string;
let password: string;
let sessionId: string | undefined;
let listId: string = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLInputElement;

let loginInput = document.getElementById('login') as HTMLInputElement;
let passwordInput = document.getElementById('senha') as HTMLInputElement;
let apiKeyInput = document.getElementById('api-key') as HTMLInputElement;

loginInput.addEventListener('change', preencherLogin);
passwordInput.addEventListener('change', preencherSenha);
apiKeyInput.addEventListener('change', preencherApi);

loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
});

searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = (document.getElementById('search') as HTMLInputElement).value;
    let listaDeFilmes = await procurarFilme(query) as typesUtil.SearchResults;
    let ul: HTMLUListElement = document.createElement('ul');
    ul.id = "lista";

    if (listaDeFilmes.results) {
        for (const item of listaDeFilmes.results) {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(item.original_title));
            ul.appendChild(li);
        }
    }

    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
});

function preencherSenha(): void {
    password = (document.getElementById('senha') as HTMLInputElement).value;
    validateLoginButton();
    console.log("alou");
}

function preencherLogin(): void {
    username = (document.getElementById('login') as HTMLInputElement).value;
    validateLoginButton();
}

function preencherApi(): void {
    apiKey = (document.getElementById('api-key') as HTMLInputElement).value;
    validateLoginButton();
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

class HttpClient {


    static async get({ url, method, body }: { url: string, method: string, body?: typesUtil.MovieDBRequest }): Promise<typesUtil.MovieDBResponse> {
        return new Promise((resolve, reject) => {
            let bodyString: string | null = null;
            let request: XMLHttpRequest = new XMLHttpRequest();
            request.open(method, url, true);

            let err: typesUtil.SearchError;

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    err.status = request.status;
                    err.message = request.statusText;
                    reject(err);
                }
            }
            request.onerror = () => {
                err.status = request.status;
                err.message = request.statusText;
                reject(err);
            }

            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                bodyString = JSON.stringify(body);
            }
            request.send(bodyString);
        })
    }
}

async function procurarFilme(query: string) {
    query = encodeURI(query)
    console.log(query)
    return HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
}

async function adicionarFilme(filmeId: string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}

async function criarRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    }) as typesUtil.Token;
    requestToken = result.request_token;
}

async function logar() {
    let body: typesUtil.LoginRequestBody = {
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`
    }
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: body
    })
}

async function criarSessao() {
    let body: typesUtil.CreateSessionRequestBody = {
        requestToken: `${requestToken}`
    }
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
        method: "POST",
        body: body
    }) as typesUtil.Session;
    sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
    let body: typesUtil.CreateListRequestBody = {
        name: nomeDaLista,
        description: descricao,
        language: "pt-br"
    }
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: body
    })
    console.log(result);
}

async function adicionarFilmeNaLista(filmeId: number, listaId: string) {
    let body: typesUtil.AddMovieToListRequestBody = {
        media_id: filmeId
    }
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: body
    })
    console.log(result);
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
}
