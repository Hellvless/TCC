import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
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
const logoutButton = document.getElementById("button");
const loginButton = document.getElementById("login");
const cadastroButton = document.getElementById("cadastro");

// Função para monitorar o estado de autenticação
function monitorAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário está logado - exibe o botão de logout
      logoutButton.hidden = true;
      loginButton.hidden = false;
      cadastroButton.hidden = false;
      console.log("Usuário autenticado:", user.email);
      } else {
      // Redireciona para a página de login se o usuário não estiver autenticado
      logoutButton.hidden = false;
      loginButton.hidden = true;
      cadastroButton.hidden = true;
      console.log("Usuário não autenticado");
      window.location.href = "login.html";
    }
  });
}
window.monitorAuthState = monitorAuthState;
monitorAuthState();

function logOut() {
  signOut(auth)
    .then(() => {
      console.log("Usuário deslogado");
      window.location.href = "login.html";  // Redireciona para a tela inicial
    })
    .catch((error) => {
      console.error("Erro ao sair:", error);
    });
}
window.logOut = logOut;