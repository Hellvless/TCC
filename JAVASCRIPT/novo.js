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

  function logOut(){
    signOut(auth).then(()=>{
        window.location.href="novo.html";
    }).catch((error)=>{
        alert("Erro ao fazer logout!", error);
    })

    onAuthStateChanged(auth, user =>{
        if(!user){
            window.location.href="novo.html"
        }
    })

  }
  window.logOut = logOut;