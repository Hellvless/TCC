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

  // Função para monitorar o estado de autenticação
function monitorAuthState() {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("Usuário autenticado:", user.email);
      } else {
          // Redireciona para a página de login se o usuário não estiver autenticado
          window.location.href = "login.html";
      }
  });
}

  function logOut(){
    signOut(auth).then(auth, (user)=>{
        window.location.href="novo.html";
    }).catch((error)=>{
        alert("Erro ao fazer logout!", error);
    })

  }
  window.logOut = logOut;