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

  function carregarEmissoes() {
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const ref = ref(db, 'user/' + uid + '/emissoes' );

        ref.once('value', (snapshot) => {
            const dados = snapshot.val();
            const container = document.getElementById('container');

            // Limpar o container antes de adicionar as novas divs
            container.innerHTML = '';

            // Verifica se há emissões e as cria
            if (dados) {
                Object.keys(dados).forEach((key) => {
                    // Pega a data da emissão, que agora está dentro da chave "data"
                    const dataEmissao = dados[key].data;

                    // Criar uma div para cada emissão
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    itemDiv.textContent = formatarData(dataEmissao); // Exibe a data formatada
                    container.appendChild(itemDiv);
                });
            } else {
                const mensagem = document.createElement('div');
                mensagem.textContent = 'Nenhuma emissão encontrada.';
                container.appendChild(mensagem);
            }
        });
    } else {
        alert("Usuário não autenticado.");
    }
}

// Função para formatar a data no formato "dia-mês-ano"
function formatarData(data) {
    // Verifica se a data está no formato "dia-mês-ano"
    const partesData = data.split('-');
    if (partesData.length === 3) {
        const dia = partesData[0];
        const mes = partesData[1];
        const ano = partesData[2];
        return `${dia}/${mes}/${ano}`; // Formato desejado
    }
    return data; // Caso não esteja no formato esperado, retorna como está
}

// Chama a função de carregar as emissões ao carregar a página
window.onload = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            carregarEmissoes();
        } else {
            alert("Usuário não autenticado.");
        }
    });
}