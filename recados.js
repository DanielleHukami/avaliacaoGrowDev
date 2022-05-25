const formulario = document.querySelector("#form-cadastro");
const erro = "";
const tabela = document.querySelector("#tbody");
let id = formulario.id.value; 
let idUsuario = Number(sessionStorage.getItem('logado'));
let i = 0
const sessao = localStorage.getItem("sessao");

checagemUsuario();


function checagemUsuario (){
    if(sessao) {
        sessionStorage.setItem("login", sessao);
        idUsuario = sessao;
    }

    if (!idUsuario) {
        window.location.href = "login.html"
        return;
    }
}


const atualizarLocalStorage = (recados) => {
    localStorage.setItem("recados", JSON.stringify(recados));
};


const acessarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem("recados") || "[]");
    return recados;
};

const salvarRecado = (e) => {
    e.preventDefault();
    const descricaoRecado = formulario.descricaoRecado.value;
    const detalhamentoRecado = formulario.detalhamentoRecado.value;
    const erros = [];

    if (erros.length > 0) {
        erro.innerHTML = erros.join(" ");
        return;
    }

    if(id == "confirm"){
        const listaRecados = acessarLocalStorage();
        let id2 = 0
        for(const pro of listaRecados){
            if(pro.idUsuario === idUsuario){
                id2 = Number(pro.idOficial);
            }
        }

        listaRecados.push({ idOficial: id2+=1, descricaoRecado, detalhamentoRecado, idUsuario});
        atualizarLocalStorage(listaRecados);
        preencherTabela();
        formulario.reset();

   
    }else{
        let recados = {
            idOficial: id, descricaoRecado, detalhamentoRecado,idUsuario 
        }
        editar(id, recados);
        preencherTabela();
        formulario.reset();
        id = "confirm";
    }
   
};

const preencherTabela = () => {
    const listaRecados = acessarLocalStorage();
    tabela.innerHTML = "";
    for (const recados of listaRecados) {

        if(recados.idUsuario === idUsuario){
            tabela.innerHTML += `
        <tr>
            <th scope="row">${recados.idOficial}</th>
            <td>${recados.descricaoRecado}</td>
            <td>${recados.detalhamentoRecado}</td>
            <td>
                 <button class="btn-editar" onclick="editarRecado(${recados.idOficial})">Editar</button>
                 <button class="btn-apagar" onclick="apagarRecado(${recados.idOficial})">Apagar</button>
            </td>
        </tr>
    `;
        }
    }
};

const apagarRecado = (idOficial) => {
    const listaRecados = acessarLocalStorage();
    const indexRecados = listaRecados.findIndex((recados) => recados.idOficial === idOficial);
    if (indexRecados < 0)
        return;
    listaRecados.splice(indexRecados, 1);
    atualizarLocalStorage(listaRecados);
    alert("Recado apagado");
    preencherTabela();
};

function editar(id, recados){
    const listaRecados = JSON.parse(localStorage.getItem("recados") || "[]");
    const indexRecados = listaRecados.findIndex((p) => p.idOficial === id);
    listaRecados[indexRecados] = recados;
    localStorage.setItem("recados", JSON.stringify(listaRecados));
}

const editarRecado = (idOficial)=>{
    const listaRecados = acessarLocalStorage();
    const indexRecados = listaRecados.findIndex((recados) => recados.idOficial === idOficial);
    formulario.descricaoRecado.value = listaRecados[indexRecados].descricaoRecado;
    formulario.detalhamentoRecado.value = listaRecados[indexRecados].detalhamentoRecado;
    id = idOficial;
}

formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);

let sair = document.querySelector('#btn-sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("sessao");


    window.location.href = "login.html";
}

