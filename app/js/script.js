import { createInputsByIndex } from "./GeneratorInputs.js";
import { createInputsByIndexMultiple } from "./MultipleInputGenerators.js";
import { updateLabel } from "./LabelModifier.js";

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

  updateLabel(value, typeName);
});

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
  const isValidated = validateField();

  if (isValidated) {
    console.log("Campos preenchidos");
  } else {
    console.log("Não estão preenchidos");
  }
});
