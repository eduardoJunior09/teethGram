const blocoTop = document.getElementById("input-block-top");
const blocoBottom = document.getElementById("input-block-bottom");

export function gerarInputHtmlMult(secao) {
  let quantInput = null;
  let inputsBloco = null;
  let labelDente = null;
  let labelMult = null;

  blocoTop.innerHTML = "";
  blocoBottom.innerHTML = "";

  if (secao === "cpo") {
    quantInput = 32;
    inputsBloco = 16;
    labelDente = labelCPO();
    labelMult = labelMultCPO();
  } else if (secao === "ceo") {
    quantInput = 20;
    inputsBloco = 10;
    labelDente = labelCEO();
    labelMult = labelMultCEO();
  }

  inputAmostral(quantInput, inputsBloco, labelDente, labelMult);
}

function inputAmostral(quantInput, inputsBloco, labelDente, labelMult) {
  for (let i = 0; i < quantInput; i++) {
    const inputSection = document.createElement("div");
    inputSection.classList.add("input-mult");

    const inputTitle = document.createElement("div");
    inputTitle.classList.add("title-input-mult");
    inputTitle.innerHTML = `${labelDente[i]}`;
    inputSection.appendChild(inputTitle);

    const inputMultValues = document.createElement("div");
    inputMultValues.classList.add("mult-values");
    inputSection.appendChild(inputMultValues);

    //C
    const valeuA = document.createElement("div");
    valeuA.classList.add("value");
    inputMultValues.appendChild(valeuA);

    const labelA = document.createElement("label");
    labelA.textContent = `${labelMult[0]}`;
    valeuA.appendChild(labelA);

    const inputA = document.createElement("input");
    inputA.type = "number";
    valeuA.appendChild(inputA);

    //P

    const valeuB = document.createElement("div");
    valeuB.classList.add("value");
    inputMultValues.appendChild(valeuB);

    const labelB = document.createElement("label");
    labelB.textContent = `${labelMult[1]}`;;
    valeuB.appendChild(labelB);

    const inputB = document.createElement("input");
    inputB.type = "number";
    valeuB.appendChild(inputB);

    //O

    const valeuC = document.createElement("div");
    valeuC.classList.add("value");
    inputMultValues.appendChild(valeuC);

    const labelC = document.createElement("label");
    labelC.textContent = `${labelMult[2]}`;;
    valeuC.appendChild(labelC);

    const inputC = document.createElement("input");
    inputC.type = "number";
    valeuC.appendChild(inputC);

    if (i < inputsBloco) {
      blocoTop.appendChild(inputSection);
    } else {
      blocoBottom.appendChild(inputSection);
    }
  }
}

function labelMultCPO() {
  return ["C", "P", "O"];
}
function labelMultCEO() {
 return ["C", "E", "O"];
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
