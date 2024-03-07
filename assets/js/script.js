
const elementValue = [],
  bottomValue = [];

/*Função responsável por gerar valores aleatórios*/
function getRandomA(min, max) {
  return Math.random() * (max - min) + min;
}

/*Função responsável por adicionar valores aos campos de input*/
function valeuForm() {
  for (let i = 1; i <= 32; i++) {
    elementValue[i] = getRandomA(10, 100).toFixed(1);
    if (elementValue[i]) {
      console.log(elementValue[i]);
      document.getElementById(`input-${i}`).value = elementValue[i];
    }
  }
}

function generationHistograma() {
  const histrograma = document.getElementById("histrograma");
  histrograma.style.display = "block";

  for (let i = 1; i <= 32; i++) {
    columnHistograma = document.getElementById(`value-${i}`);
    columnHistograma.style.height = elementValue[i] + "%";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  valeuForm();
});

document.getElementById("generation").addEventListener("click", generationHistograma);


document.getElementById("baixar").addEventListener("click", () => {
  const histrogramaDiv = document.querySelector(".histrograma");

  html2canvas(histrogramaDiv).then(canvas => {
    // Cria um link para download
    const downloadLink = document.createElement("a");
    
    // Converte o canvas para uma URL de dados
    const imageDataURL = canvas.toDataURL("image/png");
    
    // Define a URL do link para a imagem gerada
    downloadLink.href = imageDataURL;
    
    // Define o atributo de download com um nome para o arquivo
    downloadLink.download = "histograma.png";
    
    // Adiciona o link ao corpo do documento
    document.body.appendChild(downloadLink);
    
    // Simula um clique no link para iniciar o download
    downloadLink.click();
    
    // Remove o link do corpo do documento
    document.body.removeChild(downloadLink);
  });
});

