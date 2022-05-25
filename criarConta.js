
let form = document.querySelector('#form-login')
let nome = document.querySelector('#nome')
let senha = document.querySelector('#password')
let senha2 = document.querySelector('#password2')
let btnCriarConta = document.querySelector('#criarConta')
let listaUsuarios = []

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    validacaoDados()
})

document.addEventListener('DOMContentLoaded', pegarDadosStorage)

function validacaoDados(){
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    validacaoNome = regex.test(nome.value);
    validacaoSenha = senha.value
    validacaoSenha2 = senha2.value


    if( validacaoNome == '' && validacaoSenha == '' && validacaoSenha2 == ''){
        window.alert("Preencha os campos")
    }else if(validacaoSenha !== validacaoSenha2){
        window.alert("Senhas não são iguais")
    }else if(validacaoSenha.length  < 8 || validacaoSenha2.length  < 8){
        window.alert("A senha deve possuir pelo menos 8 caracteres")
    }else if(!validacaoNome){
        window.alert("Username com formato incorreto, ex: 123@abc.com")
    }else{
        salvarUsuario()
    }
   
}

function salvarUsuario(){

    let listaUsuarios = JSON.parse(localStorage.getItem('Usuários')) || [] 

    let nomeConta = nome.value
    let senhaConta = senha.value
    let senhaVerificacao = senha2.value

    let usuario = {
        nomeConta,
        senhaConta,
        senhaVerificacao,
        recados: []
    }

    let resultado = listaUsuarios.find(usuario => usuario.nomeConta  === nome.value)
    console.log(typeof resultado)
    
    if(typeof resultado === "object"){
        window.alert("email já cadastrado")
    }else{
        listaUsuarios.push(usuario)
        limpar()
        salvar(listaUsuarios)
        window.alert("Conta criada com suceso!")
    }
    
}

    
function limpar(){
    nome.value = ''
    senha.value = ''
    senha2.value = ''
}

function salvar(listaUsuarios){  
    localStorage.setItem('Usuários', JSON.stringify(listaUsuarios))
}

function pegarDadosStorage(nomeConta){
   let dadosStorage = JSON.parse(localStorage.getItem('Usuários'))
}

