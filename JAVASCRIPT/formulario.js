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

      function calcularEmissoes() {

        const AlimentoResposta = document.getElementById("alimento-organico").value;
        const ReciclaResposta = document.getElementById("recicla").value;

        if (!AlimentoResposta || !ReciclaResposta) {
          alert("Por favor, preencha todas as respostas.");
          return;
        }
        
        sessionStorage.getItem('kwh');
        sessionStorage.getItem('roupasAno');
        sessionStorage.getItem('pecasMedia');
        sessionStorage.getItem('veiculoUsado');


        sessionStorage.getItem("transportePublico");
        sessionStorage.getItem("consumoCarne");
        sessionStorage.getItem("voos");
        sessionStorage.getItem("agua");

        let kwh = sessionStorage.getItem('kwh') || 0; 
    let roupasAno = sessionStorage.getItem('roupasAno') || 0;
    let pecasMedia = sessionStorage.getItem('pecasMedia') || 0;
    let veiculoUsado = sessionStorage.getItem('veiculoUsado') || 'outro-veiculo';
    let transportePublicoResposta = sessionStorage.getItem("transportePublico") || 'default';
    let carneResposta = sessionStorage.getItem("consumoCarne") || 'default';
    let voosResposta = sessionStorage.getItem("voos") || 0; 
    let aguaResposta = sessionStorage.getItem("agua") || 0;





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
      

        // Cálculo total das emissões mensais
        let emissaoTotal = emissaoKwh + emissaoRoupas + emissaoVeiculo;

        let totalEmissoes = emissaoKwh + emissaoRoupas + emissaoVeiculo + emissaoTransportePublico + emissaoCarne + emissaoVoos + emissaoAgua;

    // Exibir o resultado
    alert("Emissões totais mensais de CO₂: " + totalEmissoes.toFixed(2) + " kg CO₂/mes");

    // Opcional: Exibir no console ou em algum lugar na página
    console.log("Emissões totais mensais de CO₂:", totalEmissoes.toFixed(2) + " kg CO₂/mes");
    
      }
      window.calcularEmissoes = calcularEmissoes
