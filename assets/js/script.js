const elementValues = [], //Array para armazenar valores aleatórios gerados
  bottomValue = [];

//Função para gerar um número aleatório dentro de um intervalo
function getRandomA(min, max, decimals = 1) {
  return (
    Math.floor(Math.random() * (max - min + 1) + min) +
    "." +
    Array(decimals + 1).join("0")
  );
}

//Função para preencher campos de entrada com valores aleatórios
function populateInputs() {
  for (let i = 1; i <= 32; i++) {
    const value = getRandomA(10, 95);
    elementValues[i] = value;
    document.getElementById(`input-${i}`).value = value;
  }
}

//Função para gerar e exibir o histograma

function generateHistogram() {
  const histogramContainer = document.getElementById("histrograma");
  histogramContainer.style.display = "block";

  for (let i = 1; i <= 32; i++) {
    const value = parseFloat(elementValues[i] || 0); //Garante que o valor seja um número (ou 0)

    const subColumn = document.getElementById(`sub-value${i}`);
    subColumn.style.height = (value + 3) + "%";

    const mainColumn = document.getElementById(`value-${i}`);
    mainColumn.style.height = 97 + "%";
  }
}

//Gera valores iniciais no carregamento da página
document.addEventListener("DOMContentLoaded", populateInputs);

//Gera histograma ao clicar no botão
document
  .getElementById("generation")
  .addEventListener("click", generateHistogram);

document.getElementById("download").addEventListener("click", () => {
  const histrogramaDiv = document.querySelector(".download-img");

  html2canvas(histrogramaDiv).then((canvas) => {
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
