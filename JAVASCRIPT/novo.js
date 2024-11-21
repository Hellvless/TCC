import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { isLoggedIn, registerObserver } from "./authState.js";
const firebaseConfig = {
  apiKey: "AIzaSyCEh1zVhU1AG4tcV3yQMXQlGmNG9hWho1E",
  authDomain: "tcc---ecoprint.firebaseapp.com",
  projectId: "tcc---ecoprint",
  storageBucket: "tcc---ecoprint.appspot.com",
  messagingSenderId: "387347125569",
  appId: "1:387347125569:web:a994b4d23b5b1feaeefdc0",
  measurementId: "G-84J579LFKS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const logoutButton = document.getElementById("button");
const loginButton = document.getElementById("login");
const cadastroButton = document.getElementById("cadastro");
const historicButton = document.getElementById("historico");
const avatarButton = document.getElementById("user-icon");

console.log("Auth:", auth); // Verifique se `auth` está inicializado corretamente
console.log("Database:", db); // Verifique se `database` está inicializado corretamente

// Função para monitorar o estado de autenticação
function checkInitialLoginStatus() {
  if (isLoggedIn()) {
      console.log("Usuário está logado (estado inicial)");
      // Lógica para quando o usuário está logado
  } else {
      console.log("Usuário não está logado (estado inicial)");
      // Lógica para quando o usuário não está logado
  }
}

document.addEventListener("DOMContentLoaded", checkInitialLoginStatus);

document.addEventListener('DOMContentLoaded', function monitorAuthState() {
  console.log("Verificando estado de autenticação");
 
    onAuthStateChanged(auth, (user) => {
      // Usuário está logado - exibe o botão de logout
       if (user) {
      logoutButton.style.display = "block";
      loginButton.style.display = "none";
      cadastroButton.style.display = "none";
      historicButton.style.display = "block";
      console.log("Usuário autenticado:", user.email);
    
      } else {
      // Redireciona para a página de login se o usuário não estiver autenticado
      avatarButton.style.display = "none";
      console.log("Usuário não autenticado");
      // window.location.href = "novo.html";
    }
  });
});
monitorAuthState();


function logOut(){
  signOut(auth)
        .then(() => {
            // Redirecionar para a tela inicial após o logout
            window.location.href = "novo.html";
        })
        .catch((error) => {
            console.error("Erro ao sair:", error);
        });


}
window.logOut = logOut;