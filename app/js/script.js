import { gerarInputHtml } from "./inputAmostral.js";

import { gerarInputHtmlMult } from "./inputMultivalorado.js"

// Variáveis de manipulação do DOM na tela inicial
const permanenteBtn = document.getElementById("dentes-permanentes");
const deciduoBtn = document.getElementById("dentes-deciduos");
const secaoDente = document.getElementById("box-data");
const tituloSecao = document.getElementById("titulo-secao");
const resetBtn = document.getElementById("resetar-secao");

// Variáveis de manipulação do DOM na seção de formulário e entrada
const gerarInputBtn = document.getElementById("button-form");
const nomeDenteInput = document.getElementById("nome-dente");
const valorAmostralInput = document.getElementById("valor-amostral");
const selectElement = document.getElementById("indice-entrada");
const boxInputSection = document.getElementById("box-input-section");

//Variáveis Globais
var secao = null;

// Função para adicionar ou remover opções do select
function manipularOpcoesSelect(texto, valor) {
  const novaOpcao = new Option(texto, valor);
  const opcaoPadrao = new Option("Amostral", "amostral"); // Opção padrão do sistema

  selectElement.innerHTML = ""; // Limpa todas as opções
  selectElement.add(opcaoPadrao); // Adiciona opção padrão
  selectElement.add(novaOpcao); // Adiciona a nova opção
}

// Eventos na tela inicial
permanenteBtn.addEventListener("click", () => {
  tituloSecao.innerHTML = "Dentes Permanentes";
  manipularOpcoesSelect("CPO", "cpo");
  secaoDente.style.display = "block";
  secao = "cpo";
});

deciduoBtn.addEventListener("click", () => {
  tituloSecao.innerHTML = "Dentes Decíduos";
  manipularOpcoesSelect("CEO", "ceo");
  secaoDente.style.display = "block";
  secao = "ceo";
});

// Eventos na seção de formulário e entrada
gerarInputBtn.addEventListener("click", () => {
  boxInputSection.style.display = "block";
  const tituloValue = nomeDenteInput.value;
  const entrevistadosValue = valorAmostralInput.value;
  const optionValue = selectElement.value;

  if (secao === "cpo") {
    if (optionValue === "amostral") {
      gerarInputHtml(secao);
    } else if (optionValue === "cpo") {
      gerarInputHtmlMult(secao);
    }
  } else if (secao === "ceo") {
    if (optionValue === "amostral") {
      gerarInputHtml(secao);
    } else if (optionValue === "ceo") {
      gerarInputHtmlMult(secao);
    }
  }
});

/*
resetBtn.addEventListener("click", () => {
  console.log("RESET");
});
*/
