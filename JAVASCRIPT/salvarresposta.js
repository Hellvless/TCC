import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import {emissoes} from "formulario.js";

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
  const db = getDatabase();
  console.log("Auth:", auth); // Verifique se `auth` está inicializado corretamente

  function SalvarRepostas(){
     // Pegue as respostas do formulário
  const corFavorita = document.getElementById("corFavorita").value;
  const comidaFavorita = document.getElementById("comidaFavorita").value;
  const hobbyFavorito = document.getElementById("hobbyFavorito").value;
  const destino = document.getElementById("destino").value;

  // Obtenha o usuário logado
  const auth = getAuth();
  const user = auth.currentUser; // Pega o usuário logado no momento

  if (user) {
    const uid = user.uid; // Pega o UID do usuário logado

    // Agora, criamos uma subpasta "respostas" dentro do usuário e usamos o push() para criar uma chave única para cada conjunto de respostas
    const respostasRef = ref(db, 'users/' + uid + '/respostas');
    
    // Usamos push() para gerar uma chave única automaticamente para a resposta
    const novaRespostaRef = push(respostasRef);

    // Salve as respostas no Firebase
    set(novaRespostaRef, {
      corFavorita: corFavorita,
      comidaFavorita: comidaFavorita,
      hobbyFavorito: hobbyFavorito,
      destino: destino
    }).then(() => {
      alert("Respostas salvas com sucesso!");
    }).catch((error) => {
      console.error("Erro ao salvar respostas: ", error);
      alert("Erro ao salvar respostas: " + error.message);
    });
  } else {
    alert("Usuário não está autenticado.");
  }
  }