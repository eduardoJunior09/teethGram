import { createInputsByIndex } from "./GeneratorInputs.js";
import { createInputsByIndexMultiple } from "./MultipleInputGenerators.js";
import { updateLabel } from "./LabelModifier.js";
import { CPO_D, CEO_D } from "./data_structures/IndexesData.js";

// Instâncias de CPO_D e CEO_D
const cpo_d = new CPO_D();
const ceo_d = new CEO_D();

// Variáveis de manipulação do DOM na tela inicial
const cpoBtn = document.getElementById("permanent-teeth");
const ceoBtn = document.getElementById("deciduous-teeth");
const toothSection = document.getElementById("data-section");
const titleSection = document.getElementById("section-title");

// Variáveis de manipulação do DOM na seção de formulário e entrada
const geberateInputBtn = document.getElementById("generate-input");
const selectElement = document.getElementById("index-entry");
const boxInputSection = document.getElementById("input-container");
const errorMessage = document.getElementById("error-message");

//Variáveis referente aos botões
const btnGenerateHistogram = document.getElementById("generate-histogram");

//Variáveis Globais
var typeName = null;
var isButtonClicked = false;
let radioEscolhido = null;

const histogramSection = document.getElementById("box-histogram-render");

// Variável global para armazenar o valor escolhido
let modoEscolhido = null;

// Pega os radios
const radios = document.querySelectorAll('input[name="modo_distribuicao"]');

// Verifica se algum já está marcado ao carregar a página
const selecionadoInicial = document.querySelector(
  'input[name="modo_distribuicao"]:checked'
);
if (selecionadoInicial) {
  radioEscolhido = selecionadoInicial.value;
  console.log("Valor inicial:", radioEscolhido);
}

// Escuta as mudanças nos radios
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      radioEscolhido = radio.value;
      console.log("Usuário escolheu:", radioEscolhido);
    }
  });
});

// Função para adicionar ou remover opções do select
function manipulateSelectOptions(optionText, optionValue) {
  selectElement.innerHTML = ""; // Limpa todas as opções

  const newOption = new Option(optionText, optionValue);
  const defaultOption = new Option("TOTAL", "total"); // Opção padrão do sistema
  selectElement.add(defaultOption); // Adiciona opção padrão
  selectElement.add(newOption); // Adiciona a nova opção
}

function updateSection(title, sectionValue, optionText, optionValue) {
  boxInputSection.style.display = "none";
  titleSection.innerHTML = title;
  manipulateSelectOptions(optionText, optionValue);
  toothSection.style.display = "block";
  typeName = sectionValue;
}

// Eventos na tela inicial
cpoBtn.addEventListener("click", () =>
  updateSection(
    "Dentes Permanentes",
    "cpo",
    "TOTAL POR COMPENENTES (CPO)",
    "cpo"
  )
);
ceoBtn.addEventListener("click", () =>
  updateSection("Dentes Decíduos", "ceo", "TOTAL POR COMPENENTES (ceo)", "ceo")
);

// Eventos na seção de formulário e entrada
geberateInputBtn.addEventListener("click", () => {
  const optionValue = selectElement.value;

  boxInputSection.style.display = "block";
  histogramSection.style.display = "none";

  console.log(radioEscolhido);

  if (optionValue === "total") {
    console.log(typeName);
    createInputsByIndex(typeName);
  } else {
    console.log(typeName);
    createInputsByIndexMultiple(typeName);
  }

  // Só reseta a classificação dos dentes para "FDI" a partir do segundo clique
  if (isButtonClicked) {
    const toothClassificationElement = document.getElementById(
      "tooth-classification"
    );
    toothClassificationElement.value = "fdi";
  }

  // Marca que o botão foi clicado
  isButtonClicked = true;
});

// Seleciona o elemento <select> pelo ID
const selectElementTooth = document.getElementById("tooth-classification");

// Adiciona um ouvinte de evento para o evento 'change'
selectElementTooth.addEventListener("change", (event) => {
  // Obtém o valor da opção selecionada
  const value = event.target.value;
  console.log(value);
  updateLabel(value, typeName);
  histogramSection.style.display = "none";
});

// // Função para salvar os valores dos inputs nos objetos das classes
// function saveInputValues() {
//   // Seleciona todos os inputs com a classe "input-field"
//   const allInputs = document.querySelectorAll(".input-field");

//   // Verifica o tipo (permanente ou decíduo) e seleciona o objeto correspondente
//   const indexObject = typeName === "cpo" ? cpo_d : ceo_d;

//   // Itera sobre os inputs e armazena o valor no objeto adequado
//   allInputs.forEach((input, idx) => {
//     const valor = input.value;

//     if (valor !== "") {
//       // Define o valor em dataList ou triDataList conforme necessário
//       indexObject.setData(valor, idx);
//     }
//   });
// }

function saveInputValues() {
  const allInputs = document.querySelectorAll(".input-field");

  const indexObject = typeName === "cpo" ? cpo_d : ceo_d;

  // Caso o indexObject tenha triDataList, usamos ela
  const isTriData = !!indexObject.triDataList;

  if (selectElement.value != "total") {
    for (let i = 0; i < allInputs.length; i += 3) {
      const idx = i / 3;
      const triData = indexObject.triDataList[idx];

      triData.fildC = parseInt(allInputs[i].value) || 0;
      triData.fildP = parseInt(allInputs[i + 1].value) || 0;
      triData.fildO = parseInt(allInputs[i + 2].value) || 0;

      // Se quiser, pode calcular um total e jogar no dataList também:
      indexObject.setData(triData.fildA + triData.fildB + triData.fildC, idx);
    }
  } else {
    // Caso com apenas um input por item
    allInputs.forEach((input, idx) => {
      const valor = input.value;
      if (valor !== "") {
        indexObject.setData(valor, idx);
      }
    });
  }
}

//Validação dos campos de input
function validateField() {
  // Selecionar todos os inputs, pertecente a uma class generica "input-field"
  const allInputs = document.querySelectorAll(".input-field");
  let allFilled = true; //flag de retorno

  // Verifica se todos os inputs estão preenchidos
  allInputs.forEach((input) => {
    if (input.value === "") {
      allFilled = false;
    }
  });

  return allFilled;
}

btnGenerateHistogram.addEventListener("click", () => {
  const optionValue = selectElement.value;

  if (optionValue === "total") {
    histogramTotal();
  } else {
    histogramMulti();
  }
});

function histogramTotal() {
  const isValidated = validateField();
  const value = selectElementTooth.value;
  let dadosDentes, labelDentes, espaco_superior, espaco_inferior;

  espaco_superior = document.getElementById(
    "section-histogram-render-superior"
  );
  espaco_inferior = document.getElementById(
    "section-histogram-render-inferior"
  );

  if (isValidated) {
    histogramSection.style.display = "flex";

    espaco_superior.style.width = "100%";
    espaco_superior.style.maxWidth = "500px";
    espaco_superior.style.minWidth = "300px";
    espaco_superior.style.height = "500px";
    espaco_superior.textContent = " ";

    espaco_inferior.style.width = "100%";
    espaco_inferior.style.maxWidth = "500px";
    espaco_inferior.style.minWidth = "300px";
    espaco_inferior.style.height = "500px";
    espaco_inferior.textContent = " ";

    console.log("Campos preenchidos");
    errorMessage.style.display = "none";
    // Salva os valores preenchidos
    saveInputValues();

    if (typeName == "cpo") {
      dadosDentes = cpo_d.dataList;
      if (value === "fdi") {
        labelDentes = cpo_d.indexFdiList;
      } else if (value === "ada") {
        labelDentes = cpo_d.indexAdaList;
      }
    } else {
      dadosDentes = ceo_d.dataList;
      if (value === "fdi") {
        labelDentes = ceo_d.indexFdiList;
      } else if (value === "ada") {
        labelDentes = ceo_d.indexAdaList;
      }
    }

    // separar o array de dados em dois
    let meio = Math.ceil(dadosDentes.length / 2); // Arredonda para cima para lidar com arrays ímpares
    const dadosDentesSuperior = dadosDentes.slice(0, meio); // Primeira metade
    const dadosDentesInferior = dadosDentes.slice(meio); // Segunda metade

    // separar o array de dados em dois
    meio = Math.ceil(labelDentes.length / 2); // Arredonda para cima para lidar com arrays ímpares
    const labelDentesSuperior = labelDentes.slice(0, meio); // Primeira metade
    const labelDentesInferior = labelDentes.slice(meio); // Segunda metade

    let distribuicao = radioEscolhido;

    let histogram_superior = new HistogramTotal(
      espaco_superior,
      dadosDentesSuperior,
      labelDentesSuperior,
      "top",
      distribuicao
    );

    console.log(dadosDentes);

    histogram_superior.generateHistogramTotal(); // para renderizar na tela

    let histogram_inferior = new HistogramTotal(
      espaco_inferior,
      dadosDentesInferior,
      labelDentesInferior,
      "bottom",
      distribuicao
    );
    console.log(dadosDentes);
    histogram_inferior.generateHistogramTotal(); // para renderizar na tela
    document.getElementById("histogram-legend-section").style.display = "flex";
    document.getElementById("histogram-legend-section-cpo").style.display =
      "none";
  } else {
    console.log("Não estão preenchidos");
    errorMessage.style.display = "block";
  }
}

function histogramMulti() {
  const isValidated = validateField();
  const value = selectElementTooth.value;
  let dadosDentes = [],
    labelDentes,
    espaco_superior,
    espaco_inferior;

  espaco_superior = document.getElementById(
    "section-histogram-render-superior"
  );
  espaco_inferior = document.getElementById(
    "section-histogram-render-inferior"
  );

  if (isValidated) {
    histogramSection.style.display = "flex";
    espaco_superior.style.width = "100%";
    espaco_superior.style.maxWidth = "500px";
    espaco_superior.style.minWidth = "300px";
    espaco_superior.style.height = "500px";
    espaco_superior.textContent = " ";

    espaco_inferior.style.width = "100%";
    espaco_inferior.style.maxWidth = "500px";
    espaco_inferior.style.minWidth = "300px";
    espaco_inferior.style.height = "500px";
    espaco_inferior.textContent = " ";

    console.log("Campos preenchidos");
    errorMessage.style.display = "none";
    // Salva os valores preenchidos
    saveInputValues();

    if (typeName == "cpo") {
      dadosDentes = cpo_d.triDataList;
      if (value === "fdi") {
        labelDentes = cpo_d.indexFdiList;
      } else if (value === "ada") {
        labelDentes = cpo_d.indexAdaList;
      }
    } else {
      dadosDentes = ceo_d.triDataList;
      if (value === "fdi") {
        labelDentes = ceo_d.indexFdiList;
      } else if (value === "ada") {
        labelDentes = ceo_d.indexAdaList;
      }
    }

    // separar o array de dados em dois
    let meio = Math.ceil(dadosDentes.length / 2); // Arredonda para cima para lidar com arrays ímpares
    const dadosDentesSuperior = dadosDentes.slice(0, meio); // Primeira metade
    const dadosDentesInferior = dadosDentes.slice(meio); // Segunda metade

    // separar o array de dados em dois
    meio = Math.ceil(labelDentes.length / 2); // Arredonda para cima para lidar com arrays ímpares
    const labelDentesSuperior = labelDentes.slice(0, meio); // Primeira metade
    const labelDentesInferior = labelDentes.slice(meio); // Segunda metade

    let distribuicao = radioEscolhido;

    let histogram_superior = new HistogramMulti(
      espaco_superior,
      dadosDentesSuperior,
      labelDentesSuperior,
      "top",
      distribuicao
    );

    console.log(dadosDentes);

    histogram_superior.generateHistogram(); // para renderizar na tela

    let histogram_inferior = new HistogramMulti(
      espaco_inferior,
      dadosDentesInferior,
      labelDentesInferior,
      "bottom",
      distribuicao
    );
    console.log(dadosDentes);
    histogram_inferior.generateHistogram(); // para renderizar na tela

    document.getElementById("histogram-legend-section-cpo").style.display =
      "flex";
    document.getElementById("histogram-legend-section").style.display = "none";
  } else {
    console.log("Não estão preenchidos");
    errorMessage.style.display = "block";
  }
}
