import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEh1zVhU1AG4tcV3yQMXQlGmNG9hWho1E",
    authDomain: "tcc---ecoprint.firebaseapp.com",
    projectId: "tcc---ecoprint",
    storageBucket: "tcc---ecoprint.appspot.com",
    messagingSenderId: "387347125569",
    appId: "1:387347125569:web:a994b4d23b5b1feaeefdc0",
    measurementId: "G-84J579LFKS"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Autenticação
const db = getDatabase(app); // Banco de dados

console.log("Auth:", auth); // Verifique se `auth` está inicializado corretamente

// Função para carregar as emissões do Firebase
function carregarEmissoes() {
    const user = auth.currentUser; // Obtém o usuário autenticado
    if (user) {
        const uid = user.uid;
        const emissaoRef = ref(db, 'user/' + uid + '/emissoes');

        // Recupera os dados do Firebase
        get(emissaoRef).then((snapshot) => {
            const dados = snapshot.val();
            const container = document.getElementById('container');

            // Limpa o container antes de adicionar as novas divs
            container.innerHTML = '';

            // Verifica se há emissões e cria as divs
            if (dados) {
                Object.keys(dados).forEach((key) => {
                 const dataEmissao = dados[key].Data;  // A data da emissão

                    // Adiciona um console.log para verificar o valor de `data`
                    console.log("Data de emissão:", dataEmissao);
                    

                    // Verifica se a data existe
                    if (dataEmissao) {
                        const divEmissao = document.createElement('div');
                        divEmissao.classList.add('emissao');

                        // Cria um botão/link para cada data
                        const botao = document.createElement('button');
                        botao.classList.add('data-button');
                        botao.textContent = dataEmissao; // Texto do botão é a data

                        botao.onclick = () => {
                            console.log(`Link gerado para a Data: ${dataEmissao})`);
                            window.location.href = `resultadohistorico.html?Data=${dataEmissao}`;
                
                        };

                        const textoAcessar = document.createElement('p');
                        textoAcessar.classList.add('acessar-texto');
                        textoAcessar.textContent = "Acessar";

                        const botaoRemover = document.createElement('button');
                        botaoRemover.classList.add('remover-button');
                        botaoRemover.textContent = "Remover";

                        botaoRemover.onclick = () => {
                            divEmissao.remove();  // Remove a div do DOM
                        };
                    

                        divEmissao.appendChild(botao);
                        divEmissao.appendChild(textoAcessar);
                        divEmissao.appendChild(botaoRemover);  // Adiciona o botão de remover à div

                        // Adiciona a div de emissão ao container
                        container.appendChild(divEmissao);
                      

                        // Cria a div que exibirá o texto "Acessar"
                    } else {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
                        itemDiv.textContent = 'Data inválida'; // Exibe uma mensagem de erro
                        container.appendChild(itemDiv);
                    }
                });
            } else {
                const mensagem = document.createElement('div');
                mensagem.textContent = 'Nenhuma emissão encontrada.';
                container.appendChild(mensagem);
            }
        }).catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });
    } else {
        alert("Usuário não autenticado.");
    }
}

// Certifique-se de que a função só é chamada após a autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        carregarEmissoes(); // Chama a função apenas quando o usuário estiver autenticado
    } else {
        alert("Usuário não autenticado.");
    }
});