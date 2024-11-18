import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";


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


function cadastrar() {
  // Lógica para cadastro do usuário com Firebase Auth
  console.log("Função cadastrar chamada");
  // Exemplo: Verificar se as senhas coincidem e então chamar o Firebase
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const sexo = document.getElementById("sexo").value;
  const idade = document.getElementById("idade").value;

  if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
  }
  

  
  // Firebase authentication (exemplo)
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user; // Pega o user do userCredential

        // Agora, retorne a referência do banco de dados para ser usada no próximo then()
        return set(ref(db, 'user/' + user.uid), {
          email: user.email,
          idade: idade,
          nome: nome,
          sexo: sexo,
          sobrenome: sobrenome,
          telefone: telefone
        });
      })
      .then(()=>{
        console.log("Dados enviados ao banco de dados!");
        alert("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
          console.error("Erro ao cadastrar usuário:", error.message);
      });
  
  
}

// Adiciona a função ao objeto global `window` -------- assim dá pra usar no html normalmente
window.cadastrar = cadastrar;
/*function cadastrar() {
  createUserWithEmailAndPassword.document.getElementById("email").value, document.getElementById("senha").value
  .then(cadastrado => {
    alert("Cadastrado com sucesso");
  }).catch(error => {
    alert("Falha ao cadastrar");
  })
}*/