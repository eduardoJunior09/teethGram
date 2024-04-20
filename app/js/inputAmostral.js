const blocoTop = document.getElementById("input-block-top");
const blocoBottom = document.getElementById("input-block-bottom");

export function gerarInputHtml(secao) {
  let quantInput = null;
  let inputsBloco = null;
  let labelDente = null;

  blocoTop.innerHTML = "";
  blocoBottom.innerHTML = "";

  if (secao === "cpo") {
    quantInput = 32;
    inputsBloco = 16;
    labelDente = labelCPO();
  } else if (secao === "ceo") {
    quantInput = 20;
    inputsBloco = 10;
    labelDente = labelCEO();
  }

  inputAmostral(quantInput, inputsBloco, labelDente);
}

function inputAmostral(quantInput, inputsBloco, labelDente) {
  for (let i = 0; i < quantInput; i++) {
    const inputSection = document.createElement("div");
    inputSection.classList.add("input-section");
    const label = document.createElement("label");
    label.textContent = labelDente[i];
    inputSection.appendChild(label);
    const input = document.createElement("input");
    input.type = "number";
    inputSection.appendChild(input);

    if (i < inputsBloco) {
      blocoTop.appendChild(inputSection);
    } else {
      blocoBottom.appendChild(inputSection);
    }
  }
}

function labelCPO() {
  return [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
  ];
}

function labelCEO() {
  return [
    "55",
    "54",
    "53",
    "52",
    "51",
    "61",
    "62",
    "63",
    "64",
    "65",
    "75",
    "74",
    "73",
    "72",
    "71",
    "81",
    "82",
    "83",
    "84",
    "85",
  ];
}
