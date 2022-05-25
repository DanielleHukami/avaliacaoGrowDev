let formLogin = document.querySelector('#form-login')
let email = document.querySelector('#inputUsername')
let senha = document.querySelector('#inputPassword')
let btnEntrar = document.querySelector('#Inputentrar')
let usuarios = ''

formLogin.addEventListener('submit', (e) =>{
    e.preventDefault()
    loginUsuario()
})

function loginUsuario(usuarios){

    usuarios = JSON.parse(localStorage.getItem('Usuários'))

    if(usuarios === null){
        window.alert("Necessário criar uma conta")
    }else{
    for (const usuario of usuarios) {
        let resultado = usuarios.find(usuario => usuario.nomeConta  === email.value && usuario.senhaConta === senha.value)

        if(email.value == '' || senha.value == ''){
            window.alert("É necessário o preenchimento dos campos")
            return
        }else if(resultado == undefined){
            window.alert("Conta não existente, crie uma conta")
            return
        }else{
            window.alert("Login realizado com sucesso")
            saveSession(usuarios)
            window.location.href = 'recados.html';
            return
        }

        function saveSession(){
            if(saveSession){
                localStorage.setItem("sessao", email.value);
            }
        
            sessionStorage.setItem("logado", JSON.stringify(email.value));
        
        }
    
    }
}
}
   


