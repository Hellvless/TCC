import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, set, get, update, remove, push, ref, child} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

  function SalvarRespostas(){
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
        const hoje = new Date();
        const dia = hoje.getDate().toString().padStart(2, '0');  // Garantir que o dia tenha 2 dígitos
        const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');  // Meses começam do 0, então adicionamos 1
        const ano = hoje.getFullYear();  // Ano completo
        const hora = hoje.getHours().toString().padStart(2, '0');  // Hora com 2 dígitos
    const minuto = hoje.getMinutes().toString().padStart(2, '0');  // Minuto com 2 dígitos

    // Criando a string da data com hora e minuto
    const Data = `${dia}-${mes}-${ano} ${hora}:${minuto}`;
        const novaRespostaRef = push(respostasRef);
        set(novaRespostaRef, {
            Data,
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
    console.log(emissaoKwh );
    console.log(emissaoRoupas);
    console.log(emissaoVeiculo);
    console.log(emissaoTransportePublico);
    console.log(emissaoCarne);
    console.log(emissaoVoos);
    console.log(emissaoAgua);
    console.log(emissaoAlimentoOrganico);
    console.log(emissaoRecicla);
    console.log(totalEmissoes);
};

window.SalvarRespostas = SalvarRespostas;