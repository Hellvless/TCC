import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getDatabase,
  get,
  ref,
  child
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

console.log("Auth:", auth); // Verifique se `auth` está inicializado corretamente
console.log("Database:", db); // Verifique se `database` está inicializado corretamente

function escreverMensagemEmVermelho(mensagem) {
  const mensagemExistente = document.querySelector("#email + p");

  if (mensagemExistente) {
    mensagemExistente.textContent = mensagem;
  } else {
    document
      .getElementById("email")
      .insertAdjacentHTML("afterend", `<p style="color: red;">${mensagem}</p>`);
  }
}

function verificarEmail() {
  const email = document.getElementById("email").value;

  if (!email) {
    escreverMensagemEmVermelho("Por favor, insira um e-mail!");
    return;
  }

  // Referência ao caminho no Realtime Database
  const userRef = ref(db);

  // Consultando o Realtime Database
  get(child(userRef, "user/"))
    .then((snapshot) => {
      if (snapshot.exists() && snapshot.val().email === email.value) {
        // Se o e-mail existe, o usuário foi encontrado
         
        console.log(email);
        escreverMensagemEmVermelho(
          "Usuário encontrado! Você pode prosseguir com a recuperação de senha."
        );
        // Aqui você pode chamar a função para enviar o e-mail de recuperação, se necessário
        EnviarEmail(email);
      } else {
        // Se o e-mail não existe, mostrar erro
        escreverMensagemEmVermelho(
          "Usuário não encontrado. Verifique o e-mail e tente novamente."
        );
        console.log("Deu erro e leu isso aqui:",email)
      }
    })
    .catch((error) => {
      // Em caso de erro na consulta ao banco de dados
      console.error("Erro ao consultar o banco de dados:", error);
      escreverMensagemEmVermelho(
        "Erro ao verificar o e-mail. Tente novamente mais tarde."
      );
    });
}
window.verificarEmail = verificarEmail;

function EnviarEmail(email) {
  // Enviar o link de recuperação de senha usando o Firebase Authentication
  const dbref = ref(db);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário autenticado
      console.log("UID do usuário autenticado:", user.uid);
      get(child(dbref, "user/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Foi isso aqui:",user.uid);
        }
      });
    } else {
      // Nenhum usuário autenticado
      console.log("Nenhum usuário autenticado.");
    }
  });

  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Email de recuperação enviado!");
      escreverMensagemEmVermelho(
        "E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada."
      );
    })
    .catch((error) => {
      console.error("Erro ao enviar e-mail:", error);
      escreverMensagemEmVermelho(
        "Erro ao enviar o e-mail de recuperação. Tente novamente mais tarde."
      );
    });
}

// Expondo a função no escopo global para ser chamada pelo evento do botão
window.verificarEmail = verificarEmail;

// function EnviarEmail () {
//   // Transformar o e-mail em uma chave que pode ser usada no Realtime Database
//   const emailKey = email.replace('.', ',');

//   const userRef = ref(db, 'user/' + emailKey);

//   // Verificar se o e-mail existe no Realtime Database
//   get(userRef).then((snapshot) => {
//       if (snapshot.exists()) {
//           // Se o e-mail existe, o usuário foi encontrado
//           escreverMensagemEmVermelho('Usuário encontrado! Você pode prosseguir com a recuperação de senha.');
//       } else {
//           // Se o e-mail não existe, mostrar erro
//           escreverMensagemEmVermelho('Usuário não encontrado. Verifique o e-mail e tente novamente.');
//       }
//   }).catch((error) => {
//       // Em caso de erro na consulta ao banco de dados
//       console.error('Erro ao consultar o banco de dados:', error);
//       escreverMensagemEmVermelho('Erro ao verificar o e-mail. Tente novamente mais tarde.');
//   });
// }

// get(ref(db, "user")).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log("Função chamada");
//     const userEmail = snapshot.val().email;
//     console.log(userEmail);
//   }
// });

// if (email === userEmail) {
// generatePasswordResetLink(userEmail, actionCodeSettings)
// .then((link) => {
//   // Construct password reset email template, embed the link and send
//   // using custom SMTP server.
//   return sendCustomPasswordResetEmail(userEmail, displayName, link);
// })
// .catch((error) => {
//   // Some error occurred.
// });

//   window.location.href='codidodgmail.html';
// } else if (!document.querySelector('#email + p')) {
//   document.getElementById('email').insertAdjacentHTML('afterend', '<p style="color: red;">Usuário não cadastrado!</p>');
// }

window.EnviarEmail = EnviarEmail;
