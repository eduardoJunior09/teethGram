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
const nameForm = document.getElementById("research-title");
const numberInterviewees = document.getElementById("sample-size");
const selectElement = document.getElementById("index-entry");
const boxInputSection = document.getElementById("input-container");

//Variáveis Globais
var typeName = null;

// Função para adicionar ou remover opções do select
function manipulateSelectOptions(optionText, optionValue) {
  selectElement.innerHTML = ""; // Limpa todas as opções

  const newOption = new Option(optionValue, optionValue);
  const defaultOption = new Option("Amostral", "amostral"); // Opção padrão do sistema
  selectElement.add(defaultOption); // Adiciona opção padrão
  selectElement.add(newOption); // Adiciona a nova opção
}

function updateSection(title, sectionValue, optionText, optionValue) {
  titleSection.innerHTML = title;
  manipulateSelectOptions(optionText, optionValue);
  toothSection.style.display = "block";
  typeName = sectionValue;
}

// Eventos na tela inicial
cpoBtn.addEventListener("click", () =>
  updateSection("Dentes Permanentes", "cpo", "CPO", "cpo")
);
ceoBtn.addEventListener("click", () =>
  updateSection("Dentes Decíduos", "ceo", "CEO", "ceo")
);

// Eventos na seção de formulário e entrada
geberateInputBtn.addEventListener("click", () => {
  const tituloValue = nameForm.value;
  const interviewees = numberInterviewees.value;
  const optionValue = selectElement.value;

  if (!tituloValue || !interviewees) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  boxInputSection.style.display = "block";

  if (optionValue === "amostral") {
    console.log(typeName);
    createInputsByIndex(typeName);
  } else {
    console.log(typeName);
    createInputsByIndexMultiple(typeName);
  }
});

// Seleciona o elemento <select> pelo ID
const selectElementTooth = document.getElementById("tooth-classification");

// Adiciona um ouvinte de evento para o evento 'change'
selectElementTooth.addEventListener("change", (event) => {
  // Obtém o valor da opção selecionada
  const value = event.target.value;

  updateLabel(value, typeName);

});
