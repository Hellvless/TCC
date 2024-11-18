import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

  function SalvarRepostas(){
     // Pegue as respostas do formulário
     const emissaoKwh = parseFloat(sessionStorage.getItem('emissaoKwh') || 0);
     const emissaoRoupas = parseFloat(sessionStorage.getItem('emissaoRoupas') || 0);
     const emissaoVeiculo = parseFloat(sessionStorage.getItem('emissaoVeiculo') || 0);
     const emissaoTransportePublico = parseFloat(sessionStorage.getItem('emissaoTransportePublico') || 0);
     const emissaoCarne = parseFloat(sessionStorage.getItem('emissaoCarne') || 0);
     const emissaoVoos = parseFloat(sessionStorage.getItem('emissaoVoos') || 0);
     const emissaoAgua = parseFloat(sessionStorage.getItem('emissaoAgua') || 0);
     const emissaoAlimentoOrganico = parseFloat(sessionStorage.getItem('emissaoAlimentoOrganico') || 0);
     const emissaoRecicla = parseFloat(sessionStorage.getItem('emissaoRecicla') || 0);
     const totalEmissoes = parseFloat(sessionStorage.getItem('totalEmissoes') || 0);


  // Obtenha o usuário logado
  const auth = getAuth();
  const user = auth.currentUser; // Pega o usuário logado no momento

  if (user) {
        const uid = user.uid;
        const respostasRef = ref(db, 'user/' + uid + '/emissoes');
        const novaRespostaRef = push(respostasRef);
        set(novaRespostaRef, {
            emissaoKwh,
            emissaoRoupas,
            emissaoVeiculo,
            emissaoTransportePublico,
            emissaoCarne,
            emissaoVoos,
            emissaoAgua,
            emissaoAlimentoOrganico,
            emissaoRecicla,
            totalEmissoes
        }).then(() => {
            alert("Emissões salvas com sucesso!");
        }).catch((error) => {
            console.error("Erro ao salvar emissões: ", error);
            alert("Erro ao salvar emissões: " + error.message);
        });
    } else {
        alert("Usuário não está autenticado.");
    }
}