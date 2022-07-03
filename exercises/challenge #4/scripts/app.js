var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let apiKey = '4e2b70568100cff45264c69c94334219';
let requestToken;
let username;
let password;
let sessionId;
let listId = '7101979';
let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');
let loginInput = document.getElementById('login');
let passwordInput = document.getElementById('senha');
let apiKeyInput = document.getElementById('api-key');
loginInput.addEventListener('change', preencherLogin);
passwordInput.addEventListener('change', preencherSenha);
apiKeyInput.addEventListener('change', preencherApi);
loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
    yield criarSessao();
}));
searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = document.getElementById('search').value;
    let listaDeFilmes = yield procurarFilme(query);
    let ul = document.createElement('ul');
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
}));
function preencherSenha() {
    password = document.getElementById('senha').value;
    validateLoginButton();
    console.log("alou");
}
function preencherLogin() {
    username = document.getElementById('login').value;
    validateLoginButton();
}
function preencherApi() {
    apiKey = document.getElementById('api-key').value;
    validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
class HttpClient {
    static get({ url, method, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let bodyString = null;
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                let err;
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        err.status = request.status;
                        err.message = request.statusText;
                        reject(err);
                    }
                };
                request.onerror = () => {
                    err.status = request.status;
                    err.message = request.statusText;
                    reject(err);
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    bodyString = JSON.stringify(body);
                }
                request.send(bodyString);
            });
        });
    }
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        return HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: "GET"
        });
        console.log(result);
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
            method: "GET"
        });
        requestToken = result.request_token;
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        let body = {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        };
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: body
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let body = {
            requestToken: `${requestToken}`
        };
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
            method: "POST",
            body: body
        });
        sessionId = result.session_id;
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        };
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: body
        });
        console.log(result);
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = {
            media_id: filmeId
        };
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: body
        });
        console.log(result);
    });
}
function pegarLista() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
            method: "GET"
        });
        console.log(result);
    });
}
export {};
