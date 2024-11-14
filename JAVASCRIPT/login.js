import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { setUserLoggedIn } from "./authState.js"; // Importa a função para atualizar o estado de login

const firebaseConfig = {
  apiKey: "AIzaSyCEh1zVhU1AG4tcV3yQMXQlGmNG9hWho1E",
  authDomain: "tcc---ecoprint.firebaseapp.com",
  projectId: "tcc---ecoprint",
  storageBucket: "tcc---ecoprint.appspot.com",
  messagingSenderId: "387347125569",
  appId: "1:387347125569:web:a994b4d23b5b1feaeefdc0",
  measurementId: "G-84J579LFKS"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function exibirErro(campo, mensagem) {
  // Remove borda de erro e mensagem se já estiver limpa
  campo.classList.add("erro");

  // Verifica se já existe uma mensagem de erro para evitar duplicatas
  let erroMsg = campo.nextElementSibling;
  if (!erroMsg || !erroMsg.classList.contains("erro-mensagem")) {
      erroMsg = document.createElement("small");
      erroMsg.classList.add("erro-mensagem");
      campo.parentNode.insertBefore(erroMsg, campo.nextSibling);
  }
  erroMsg.textContent = mensagem;
}

// Função para validar o campo quando o usuário digita
function validarCampo(campo) {
  campo.classList.remove("erro");
  let erroMsg = campo.nextElementSibling;

  if (erroMsg && erroMsg.classList.contains("erro-mensagem")) {
      erroMsg.textContent = "";
  }
}
// Exibe mensagem de erro se o campo estiver vazio ao perder o foco
function mostrarErro(campo) {
  if (campo.value.trim() === "") {
      exibirErro(campo, `O campo ${campo.placeholder} é obrigatório.`);
  }
}

window.validarCampo = validarCampo;
window.exibirErro = exibirErro;
window.mostrarErro = mostrarErro;



function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      alert("Login realizado com sucesso!");
      setUserLoggedIn(true); // Define o estado como logado
      window.location.href = "novo.html";
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error.message);
      
    });
}
window.login = login;
/*function validarCampos() {
  const emailValido = isEmailValid();
  document.getElementById("recuperarSenha").disabled = !emailValido;

  const senhaValida = isPasswordValid();
  document.getElementById("entrar").disabled = !emailValido || !senhaValida;
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validarEmail()
}

function isPasswordValid() {
  const senha = document.getElementById("senha").value;
  if (!senha) {
    return false;
  }
  return true
}

function validarEmail(email) {
  return /\S+@\S+\S+/.test(email);
}

window.validarCampos = validarCampos;
*/

/*function logar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  if (email === "teste@exemplo.us" && senha === "123123") {
    window.location.href = "../site/novo.html";
  } else{
    alert("Erro ao tentar fazer login, tente novamente ou procure nosso suporte de atendimento ao cliente (SAC)");
  }
};
window.logar = logar;*/