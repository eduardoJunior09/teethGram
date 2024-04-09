//Variáveis manipulação do DOM na home
const dentesPermanentesBTN = document.getElementById("dentes-permanentes");
const dentesDecicuosBTN = document.getElementById("dentes-deciduos");

const secaoDente = document.getElementById("box-data");
const tituloSecao = document.getElementById("titulo-secao");
const resetSecao = document.getElementById("resetar-secao");

//Variáveis manipulação do DOM na seção de form e input
const btnGerarInput = document.getElementById("botao-gerar-input");
const selectElement = document.getElementById("indice-entrada");

function cadastrarOption(x) {
  const optionToRemove = selectElement.options[1]; // Remove a segunda opção
  optionToRemove.remove();
  const newOption = document.createElement("option");

  if (x === 1) {
    newOption.text = "CPO";
    newOption.value = "cpo";
  } else if (x === 2) {
    newOption.text = "ceo";
    newOption.value = "ceo";
  }

  selectElement.append(newOption);
}

/* Manipulação do DOM, captura dos eventos nos botões da tela home */
dentesPermanentesBTN.addEventListener("click", () => {
  tituloSecao.innerHTML = "Dentes Permantes";
  cadastrarOption(1);
  secaoDente.style.display = "block";
});

dentesDecicuosBTN.addEventListener("click", () => {
  tituloSecao.innerHTML = "Dentes Decíduos";
  cadastrarOption(2);
  secaoDente.style.display = "block";
});

/* Manipulação do DOM, captura dos eventos nos botões da seção form e input */
//criar uma estrutura de verificação para verificar as opções escolhidas pelo usuário, a fim  de prosseguir para o proximo passo.

btnGerarInput.addEventListener("click", () => {
  const tituloValue = document.getElementById("nome-dente").value;
  const entrevistadosValue = document.getElementById("valor-amostral").value;
  const optionValue = selectElement.value;

  console.log(tituloValue + " - " + entrevistadosValue + " - " + optionValue);
});

resetSecao.addEventListener("click", () => {
  console.log("RESET");
});
