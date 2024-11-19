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

let totalEmissoes = 0;  // Inicializa a variável totalEmissoes

// Captura a data selecionada na URL
const urlParams = new URLSearchParams(window.location.search);
const dataSelecionada = urlParams.get('Data');
if (dataSelecionada) {
    console.log("Data selecionada:", dataSelecionada);
} else {
    console.log("Nenhuma data foi passada.");
}

// Função para calcular o total de emissões
function calcularTotalEmissoes(uid, dataSelecionada) {
    const emissaoRef = ref(db, 'user/' + uid + '/emissoes');  // Acessa o caminho onde as emissões estão armazenadas no Firebase

    // Faz a leitura dos dados das emissões
    get(emissaoRef).then((snapshot) => {
        if (snapshot.exists()) {
            const emissoes = snapshot.val();  // Pega todos os dados das emissões

            // Organizar os dados para o gráfico
            let emissoesData = {}; // Usar um objeto para acumular os valores por categoria

            // Inicializa o total
            totalEmissoes = 0;

            // Itera por cada emissão
            Object.keys(emissoes).forEach((key) => {
                const emissao = emissoes[key];

                // Verifica se a data da emissão corresponde à data selecionada
                if (emissao.Data && emissao.Data === dataSelecionada) {
                    // Acessando os valores de cada emissão
                    const emissaoKwh = emissao.emissaoKwh || 0;
                    const emissaoRoupas = emissao.emissaoRoupas || 0;
                    const emissaoVeiculo = emissao.emissaoVeiculo || 0;
                    const emissaoTransportePublico = emissao.emissaoTransportePublico || 0;
                    const emissaoCarne = emissao.emissaoCarne || 0;
                    const emissaoVoos = emissao.emissaoVoos || 0;
                    const emissaoAgua = emissao.emissaoAgua || 0;
                    const emissaoAlimentoOrganico = emissao.emissaoAlimentoOrganico || 0;
                    const emissaoRecicla = emissao.emissaoRecicla || 0;

                    // Somando os valores das emissões para aquele dia (só para a data selecionada)
                    totalEmissoes += emissaoKwh + emissaoRoupas + emissaoVeiculo + emissaoTransportePublico + 
                                     emissaoCarne + emissaoVoos + emissaoAgua + emissaoAlimentoOrganico + emissaoRecicla;

                    // Agregar as emissões por categoria (só para a data selecionada)
                    emissoesData['KWh'] = (emissoesData['KWh'] || 0) + emissaoKwh;
                    emissoesData['Roupas'] = (emissoesData['Roupas'] || 0) + emissaoRoupas;
                    emissoesData['Veículo'] = (emissoesData['Veículo'] || 0) + emissaoVeiculo;
                    emissoesData['Transporte Público'] = (emissoesData['Transporte Público'] || 0) + emissaoTransportePublico;
                    emissoesData['Consumo de Carne'] = (emissoesData['Consumo de Carne'] || 0) + emissaoCarne;
                    emissoesData['Voos'] = (emissoesData['Voos'] || 0) + emissaoVoos;
                    emissoesData['Água'] = (emissoesData['Água'] || 0) + emissaoAgua;
                    emissoesData['Alimentos Orgânicos'] = (emissoesData['Alimentos Orgânicos'] || 0) + emissaoAlimentoOrganico;
                    emissoesData['Reciclagem'] = (emissoesData['Reciclagem'] || 0) + emissaoRecicla;
                }
            });

            // Exibe o total calculado
            console.log("Total de Emissões: ", totalEmissoes);

            // Exibe os resultados na página
            let resultadosHTML = `<h2>Total de Emissões de CO₂: ${totalEmissoes.toFixed(2)} kg CO₂/Mês</h2>`;
            document.getElementById("resultados").innerHTML = resultadosHTML;

            // Exibir os 4 maiores valores de emissões
            let topContribuicoesHTML = '';
            let emissoesDataArray = Object.keys(emissoesData).map(key => ({
                name: key,
                value: emissoesData[key]
            }));

            emissoesDataArray.sort((a, b) => b.value - a.value); // Ordena as emissões do maior para o menor
            for (let i = 0; i < 4; i++) {
                topContribuicoesHTML += `
                    <div class="contribuicao-item">
                        <span>${emissoesDataArray[i].name}: </span>${emissoesDataArray[i].value.toFixed(2)} kg CO₂
                    </div>`;
            }
            document.getElementById("top-contribuicoes-list").innerHTML = topContribuicoesHTML;

            // Criar o gráfico com os dados organizados
            let ctx = document.getElementById('emissoesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: emissoesDataArray.map(e => e.name),
                    datasets: [{
                        label: 'Emissões de CO₂ (kg)',
                        data: emissoesDataArray.map(e => e.value),
                        backgroundColor: emissoesDataArray.map(e => {
                            // Aqui você pode definir as cores com base na categoria
                            switch (e.name) {
                                case 'KWh': return '#FF5733'; // Vermelho para KWh
                                case 'Roupas': return '#FF8C00'; // Laranja para Roupas
                                case 'Veículo': return '#28a745'; // Verde para Veículo
                                case 'Transporte Público': return '#007bff'; // Azul para Transporte Público
                                case 'Consumo de Carne': return '#dc3545'; // Vermelho intenso para Carne
                                case 'Voos': return '#4e73df'; // Azul para Voos
                                case 'Água': return '#17a2b8'; // Azul claro para Água
                                case 'Alimentos Orgânicos': return '#28a745'; // Verde para Alimentos Orgânicos
                                case 'Reciclagem': return '#6c757d'; // Cinza para Reciclagem
                                default: return '#6f42c1'; // Roxo para qualquer outro caso não previsto
                            }
                        })
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 5 }
                        }
                    },
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            font: { weight: 'bold', size: 12 },
                            formatter: function(value) {
                                return value.toFixed(2); // Mostrar as emissões com 2 casas decimais
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels] // Certifique-se de que o plugin 'ChartDataLabels' esteja carregado
            });

        } else {
            console.log("Nenhuma emissão encontrada.");
        }
    }).catch((error) => {
        console.error("Erro ao carregar os dados:", error);
    });
}

// Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (dataSelecionada) {
            calcularTotalEmissoes(uid, dataSelecionada); // Chama a função passando o uid do usuário e a data selecionada
        } else {
            console.log("Nenhuma data foi selecionada.");
        }
    } else {
        console.log("Usuário não autenticado.");
    }
});
