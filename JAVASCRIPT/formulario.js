function mostrarInputOutro() {
    var select = document.getElementById("veiculo-usado");
    var campoOutro = document.getElementById("campoOutro");
    
    if (select.value === "outro-veiculo") {
        campoOutro.style.display = "block";
    } else {
        campoOutro.style.display = "none";
    }
}

     function nextPage() {
           // Obter os valores do formulário
    const kwh = document.getElementById('kwh').value;
    const roupasAno = document.getElementById('roupas-ano').value;
      const pecasMedia = document.getElementById('pecas-media').value;
      const veiculoUsado = document.getElementById('veiculo-usado').value;
  
      // Validação simples para garantir que todos os campos sejam preenchidos
      if (!kwh || !roupasAno || !pecasMedia || !veiculoUsado) {
          alert("Por favor, preencha todos os campos.");
          return;
      }
      
        // Armazenar os dados na sessionStorage
        sessionStorage.setItem('kwh', kwh);
        sessionStorage.setItem('roupasAno', roupasAno);
        sessionStorage.setItem('pecasMedia', pecasMedia);
        sessionStorage.setItem('veiculoUsado', veiculoUsado);
      
        // Redireciona para a segunda página
        window.location.href = 'formulario1.html';
      }

      function nextPage1() {
        const transportePublicoResposta = document.getElementById("transporte-publico").value;
  const carneResposta = document.getElementById("consumo-carne").value;
  const voosResposta = document.getElementById("voo-por-ano").value;
  const aguaResposta = document.getElementById("consumo-agua").value;

  if (!transportePublicoResposta || !carneResposta || !voosResposta || !aguaResposta) {
    alert("Por favor, preencha todas as respostas.");
    return;
  }
  

  

  sessionStorage.setItem("transportePublico", transportePublicoResposta);
  sessionStorage.setItem("consumoCarne", carneResposta);
  sessionStorage.setItem("voos", voosResposta);
  sessionStorage.setItem("agua", aguaResposta);
  
  // Redireciona para a segunda página
  window.location.href = 'formulario2.html';

}
window.nextPage1 = nextPage1;
function nextPage2() {
  const AlimentoResposta = document.getElementById("alimento-organico").value;
  const ReciclaResposta = document.getElementById("recicla").value;

  if (!AlimentoResposta || !ReciclaResposta) {
    alert("Por favor, preencha todas as respostas.");
    return;
  }
  

  

  sessionStorage.setItem("AlimentoEmissao", AlimentoResposta);
  sessionStorage.setItem("ReciclaEmissao", ReciclaResposta);
  
  // Redireciona para a página de resultado
  window.location.href = 'formularioresultado.html'; 
}
window.nextPage2 = nextPage2;


      function calcularEmissoes() {

        
        sessionStorage.getItem('kwh');
        sessionStorage.getItem('roupasAno');
        sessionStorage.getItem('pecasMedia');
        sessionStorage.getItem('veiculoUsado');
        sessionStorage.getItem("transportePublico");
        sessionStorage.getItem("consumoCarne");
        sessionStorage.getItem("voos");
        sessionStorage.getItem("agua");
        sessionStorage.getItem("AlimentoEmissao");
        sessionStorage.getItem("ReciclaEmissao");

    let kwh = sessionStorage.getItem('kwh') || 0; 
    let roupasAno = sessionStorage.getItem('roupasAno') || 0;
    let pecasMedia = sessionStorage.getItem('pecasMedia') || 0;
    let veiculoUsado = sessionStorage.getItem('veiculoUsado') || 'outro-veiculo';
    let transportePublicoResposta = sessionStorage.getItem("transportePublico") || 'default';
    let carneResposta = sessionStorage.getItem("consumoCarne") || 'default';
    let voosResposta = sessionStorage.getItem("voos") || 0; 
    let aguaResposta = sessionStorage.getItem("agua") || 0;
    let alimentoOrganicoResposta = sessionStorage.getItem("AlimentoEmissao") || 'default';
    let reciclaResposta = sessionStorage.getItem("ReciclaEmissao") || 'default';





        // Constantes para emissões médias
        const EMISSAO_KWH = 0.27; // kg CO₂ por KWh (emissão média de eletricidade)
        const EMISSAO_ROUPAS = 4.5; // kg CO₂ por peça de roupa
        const EMISSAO_CARRO_GASOLINA = 0.23; // kg CO₂ por km (Carro Gasolina/Etanol)
        const EMISSAO_CARRO_DIESEL = 0.27; // kg CO₂ por km (Carro Diesel)
        const EMISSAO_CARRO_ELETRICO = 0.06; // kg CO₂ por km (Carro Elétrico)
        const EMISSAO_MOTO = 0.16; // kg CO₂ por km (Moto)

        const EMISSAO_TRANSPORTE_PUBLICO = {
          'varias-vezes-ao-dia': 0.1,
          'uma-ou-duas-vezes': 0.3,
          'tres-a-cinco': 0.5,
          'mensalmente': 1.0,
          'raramente': 1.5,
          'nunca': 2.0,
          'default': 0
        };
        
        // Emissões de consumo de carne (kg CO₂ por quantidade de consumo)
        const EMISSAO_CARNE = {
          'varias-vezes-ao-dia': 10.0,
          'uma-ou-duas-vezes': 5.0,
          'tres-a-cinco': 3.0,
          'mensalmente': 1.5,
          'raramente': 0.1,
          'default': 0
        };
        
        // Emissões de voos (kg CO₂ por número de voos por ano)
        const EMISSAO_VOOS = {
          '1': 0.5,
          '2-5': 2.0,
          '6-10': 3.5,
          '11-20': 5.0,
          '20+': 8.0,
          'default': 0
        };
        
        // Emissões de consumo de água (kg CO₂ por quantidade de água consumida)
        const EMISSAO_AGUA = {
          '<10': 3.0,
          '10-20': 6.0,
          '21-50': 10.0,
          '>50': 15.0,
          'default': 0
        };

         // Novas constantes para as questões adicionais
        const EMISSAO_ALIMENTO_ORGANICO = {
          'varias-vezes-ao-dia': 0.5, // Consumo diário de alimentos orgânicos
          'uma-ou-duas-vezes': 0.3, // Consumo regular de alimentos orgânicos
          'tres-a-cinco': 0.2, // Consumo ocasional
          'mensalmente': 0.1, // Consumo mensal
          'raramente': 0.05, // Consumo raro
          'nunca': 0, // Não consome alimentos orgânicos
          'default': 0
      };

      const EMISSAO_RECICLA = {
          'varias-vezes-ao-dia': 0.05, // Recicla sempre
          'uma-ou-duas-vezes': 0.03, // Recicla algumas vezes
          'tres-a-cinco': 0.02, // Recicla raramente
          'default': 0
      };


    
        // Emissões para o consumo de KWh
        let emissaoKwh = kwh * EMISSAO_KWH;
    
        // Emissões por compras de roupas (considerando o número de compras por ano e peças compradas)
        let emissaoRoupas = roupasAno * pecasMedia * EMISSAO_ROUPAS;
    
        // Emissões do veículo utilizado (apenas se for carro ou moto)
        let emissaoVeiculo = 0;
        switch (veiculoUsado) {
            case 'gasolina':
            case 'outro-veiculo':
                emissaoVeiculo = 0.1 * 30 * EMISSAO_CARRO_GASOLINA; // Média de 30 dias/mês, considerando 10 km/dia
                break;
            case 'diesel':
                emissaoVeiculo = 0.1 * 30 * EMISSAO_CARRO_DIESEL;
                break;
            case 'eletrico':
                emissaoVeiculo = 0.1 * 30 * EMISSAO_CARRO_ELETRICO;
                break;
            case 'moto':
                emissaoVeiculo = 0.1 * 30 * EMISSAO_MOTO;
                break;
        }

        let emissaoTransportePublico = 0;
        let emissaoCarne = 0;
        let emissaoVoos = 0;
        let emissaoAgua = 0;
        let emissaoAlimentoOrganico = 0;
        let emissaoRecicla = 0;
      
        // Calcular as emissões para transporte público
        switch (transportePublicoResposta) {
          case "varias-vezes-ao-dia":
            emissaoTransportePublico = 0.1;
            break;
          case "uma-ou-duas-vezes":
            emissaoTransportePublico = 0.3;
            break;
          case "tres-a-cinco":
            emissaoTransportePublico = 0.5;
            break;
          case "mensalmente":
            emissaoTransportePublico = 1.0;
            break;
          case "raramente":
            emissaoTransportePublico = 1.5;
            break;
          case "nunca":
            emissaoTransportePublico = 2.0;
            break;
          default:
            emissaoTransportePublico = 0;
            break;
        }
      
        // Calcular as emissões para consumo de carne
        switch (carneResposta) {
          case "varias-vezes-ao-dia":
            emissaoCarne = 10.0;
            break;
          case "uma-ou-duas-vezes":
            emissaoCarne = 5.0;
            break;
          case "tres-a-cinco":
            emissaoCarne = 3.0;
            break;
          case "mensalmente":
            emissaoCarne = 1.5;
            break;
          case "raramente":
            emissaoCarne = 0.1;
            break;
          default:
            emissaoCarne = 0;
            break;
        }
      
        // Calcular as emissões para voos
        switch (true) {
          case (voosResposta >= 1 && voosResposta <= 1):
            emissaoVoos = 0.5;
            break;
          case (voosResposta >= 2 && voosResposta <= 5):
            emissaoVoos = 2.0;
            break;
          case (voosResposta >= 6 && voosResposta <= 10):
            emissaoVoos = 3.5;
            break;
          case (voosResposta >= 11 && voosResposta <= 20):
            emissaoVoos = 5.0;
            break;
          case (voosResposta > 20):
            emissaoVoos = 8.0;
            break;
          default:
            emissaoVoos = 0;
            break;
        }
      
        // Calcular as emissões para consumo de água
        switch (true) {
          case (aguaResposta < 10):
            emissaoAgua = 3.0;
            break;
          case (aguaResposta >= 10 && aguaResposta <= 20):
            emissaoAgua = 6.0;
            break;
          case (aguaResposta >= 21 && aguaResposta <= 50):
            emissaoAgua = 10.0;
            break;
          case (aguaResposta > 50):
            emissaoAgua = 15.0;
            break;
          default:
            emissaoAgua = 0;
            break;
        }

        switch (alimentoOrganicoResposta) {
          case "varias-vezes-ao-dia":
            emissaoAlimentoOrganico = 0.5;
            break;
          case "uma-ou-duas-vezes":
            emissaoAlimentoOrganico = 0.3;
            break;
          case "tres-a-cinco":
            emissaoAlimentoOrganico = 0.2;
            break;
          case "mensalmente":
            emissaoAlimentoOrganico = 0.1;
            break;
          case "raramente":
            emissaoAlimentoOrganico = 0.05;
            break;
          case "nunca":
            emissaoAlimentoOrganico = 0;
            break;
          default:
            emissaoAlimentoOrganico = 0;
            break;
        }

        switch (reciclaResposta) {
          case "varias-vezes-ao-dia":
          emissaoRecicla = 0.05;
            break;
          case "uma-ou-duas-vezes":
          emissaoRecicla = 0.03;
            break;
          case "tres-a-cinco":
            emissaoRecicla = 0.02;
            break;
          default:
            emissaoRecicla = 0;
            break
        }
      
      
        let emissoes = [
          { name: 'KWh', value: emissaoKwh },
          { name: 'Roupas', value: emissaoRoupas },
          { name: 'Veículo', value: emissaoVeiculo },
          { name: 'Transporte Público', value: emissaoTransportePublico },
          { name: 'Consumo de Carne', value: emissaoCarne },
          { name: 'Voos', value: emissaoVoos },
          { name: 'Água', value: emissaoAgua },
          { name: 'Alimentos Orgânicos', value: emissaoAlimentoOrganico },
          { name: 'Reciclagem', value: emissaoRecicla }
      ];

      emissoes.sort((a, b) => b.value - a.value); // Ordenar em ordem decrescente

        // Cálculo total das emissões mensais;

        let totalEmissoes = emissaoKwh + emissaoRoupas + emissaoVeiculo + emissaoTransportePublico + emissaoCarne + emissaoVoos + emissaoAgua + emissaoAlimentoOrganico + emissaoRecicla;

    // Exibir o resultado
    let resultadosHTML = `<h2>Total de Emissões de CO₂: ${totalEmissoes.toFixed(2)} kg CO₂/Mês</h2>`;
            document.getElementById("resultados").innerHTML = resultadosHTML;
             // Exibir os 4 maiores valores
             let topContribuicoesHTML = '';
             for (let i = 0; i < 4; i++) {
                 topContribuicoesHTML += `
                     <div class="contribuicao-item">
                         <span>${emissoes[i].name}: </span>${emissoes[i].value.toFixed(2)} kg CO₂
                     </div>`;
             }
             document.getElementById("top-contribuicoes-list").innerHTML = topContribuicoesHTML;


           let ctx = document.getElementById('emissoesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: emissoes.map(e => e.name),
                    datasets: [{
                        label: 'Emissões de CO₂ (kg)',
                        data: emissoes.map(e => e.value),
                       backgroundColor: emissoes.map(e => {
                          // Aqui você pode definir as cores com base na categoria
                          switch (e.name) {
                            case 'KWh':
                                return '#FF5733'; // Vermelho para KWh
                            case 'Roupas':
                                return '#FF8C00'; // Laranja para Roupas
                            case 'Veículo':
                                return '#28a745'; // Verde para Veículo
                            case 'Transporte Público':
                                return '#007bff'; // Azul para Transporte Público
                            case 'Consumo de Carne':
                                return '#dc3545'; // Vermelho intenso para Carne
                            case 'Voos':
                                return '#4e73df'; // Azul para Voos
                            case 'Água':
                                return '#17a2b8'; // Azul claro para Água
                            case 'Alimentos Orgânicos':
                                return '#28a745'; // Verde para Alimentos Orgânicos
                            case 'Reciclagem':
                                return '#6c757d'; // Cinza para Reciclagem
                            default:
                                return '#6f42c1'; // Roxo para qualquer outro caso não previsto
                        }
                    })
          
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            font: {
                                weight: 'bold',
                                size: 12
                            },
                            formatter: function(value) {
                                return value.toFixed(2); // Mostrar as emissões com 2 casas decimais
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels] // Certifique-se de que o plugin 'ChartDataLabels' esteja carregado
            });
             // Opcional: Exibir no console ou em algum lugar na página
    console.log("Emissões totais mensais de CO₂:", totalEmissoes.toFixed(2) + " kg CO₂/mes");
        }

   
    

      function funcaoEspecifica() {
        console.log('Função chamada no HTML 1');
    }
    
    // Verificando o caminho da URL
    if (window.location.pathname.includes('formularioresultado.html')) {
        calcularEmissoes(); // Chama a função somente se estiver em "index.html"
    }

      window.calcularEmissoes = calcularEmissoes;
  