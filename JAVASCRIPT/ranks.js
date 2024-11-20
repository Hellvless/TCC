import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
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
const db = getDatabase(app); // Banco de dados


async function getTop3Users() {
  try {
    // Referência para a coleção de usuários
    const usersRef = ref(db, 'user');

    // Obtemos todos os usuários
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.log("Não há dados de usuários");
      return;
    }

    // Criaremos uma array de promessas para processar as emissões de todos os usuários
    const usersWithEmissionsPromises = [];

    // Iterando sobre todos os usuários para contar as emissões e pegar o nome
    usersSnapshot.forEach((userSnapshot) => {
      const userId = userSnapshot.key;  // Aqui pegamos o userId
      console.log("User ID encontrado:", userId);  // Log para verificar o userId

      // Referência para o nome e sobrenome
      const userInfoRef = ref(db, `user/${userId}`);

      // Criamos uma promessa para contar as emissões de cada usuário e pegar o nome
      const emissoesPromise = get(userInfoRef).then((userInfoSnapshot) => {
        if (userInfoSnapshot.exists()) {
          const userInfo = userInfoSnapshot.val();
          const nome = userInfo.nome;  // Nome do usuário
          const sobrenome = userInfo.sobrenome;  // Sobrenome do usuário

          // Agora pegamos as emissões
          const emissoesRef = ref(db, `user/${userId}/emissoes`);
          return get(emissoesRef).then((emissoesSnapshot) => {
            let emissoesCount = 0;
            if (emissoesSnapshot.exists()) {
              emissoesCount = Object.keys(emissoesSnapshot.val()).length; // Contando as emissões
              console.log(`O usuário ${nome} ${sobrenome} tem ${emissoesCount} emissões.`); // Log da contagem de emissões
            }

            // Calculando os pontos corretamente (10 pontos por emissão)
            const pontos = emissoesCount * 10;

            // Retorna os dados do usuário com a contagem de emissões e pontos
            return {
              user_nome_completo: `${nome} ${sobrenome}`,  // Substituindo o UID pelo nome completo
              numEmissoes: emissoesCount,
              pontos: pontos,  // Calculando os pontos corretamente
            };
          });
        } else {
          console.log(`O usuário ${userId} não tem informações de nome ou sobrenome.`);
          return {
            user_nome_completo: `Desconhecido`,  // Caso não tenha nome ou sobrenome
            numEmissoes: 0,
            pontos: 0,  // Sem emissões, sem pontos
          };
        }
      });

      // Adiciona a promessa à lista de promessas
      usersWithEmissionsPromises.push(emissoesPromise);
    });

    // Aguarda que todas as promessas sejam resolvidas antes de continuar
    const usersWithEmissions = await Promise.all(usersWithEmissionsPromises);

    // Ordenando os usuários pela quantidade de emissões (descendente)
    usersWithEmissions.sort((a, b) => b.numEmissoes - a.numEmissoes);

    // Pegando os 3 maiores usuários
    const top3Users = usersWithEmissions.slice(0, 3);
    console.log("Top 3 usuários com mais emissões:", top3Users);

    // Agora que temos os dados prontos, podemos inserir no HTML
    displayTop3Users(top3Users);
    return top3Users;

  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
  }
}

// Função para exibir os 3 maiores usuários no formato de card
function displayTop3Users(top3Users) {
  const top3Container = document.getElementById('top3-container');  // Onde os dados serão exibidos

  // Limpar a área antes de adicionar novos dados
  top3Container.innerHTML = '';

  top3Users.forEach((user, index) => {
    // A cada 1ª, 2ª e 3ª posição, coloca o ranking em ordinal (1º, 2º, 3º)
    const rankOrdinal = getOrdinal(index + 1);

    // Criando o HTML para cada usuário no rank
    const userDiv = document.createElement('div');
    userDiv.classList.add('card');

    // Inserindo o título do card
    userDiv.innerHTML = `

        <ul class="list">
          <li class="list-item">
            <div class="list-item-header">
              <span class="list-item-header-badge">${rankOrdinal}</span>
              <!-- Remover o avatar e deixar apenas o espaço -->
              <i class="bi bi-person-circle icon-large"></i>
            </div>
            <div class="list-item-body">
              <span class="list-item-title">${user.user_nome_completo}</span>
              <span class="list-item-subtitle">Pontos ${user.pontos}/100</span>
              <div class="list-item-progress-bar">
                <span class="progress" style="width: ${user.pontos}%"></span>
              </div>
            </div>
          </li>
        </ul>
    `;

    // Adiciona o div criado ao container
    top3Container.appendChild(userDiv);
  });
}

// Função para transformar o ranking em ordinal (1º, 2º, 3º, etc)
function getOrdinal(num) {
  const suffix = ['º', 'º', 'º'];
  return num + suffix[0];
}

// Chamada para exibir os 3 maiores
getTop3Users();