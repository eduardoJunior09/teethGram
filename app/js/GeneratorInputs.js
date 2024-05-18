import { CPO_D, CEO_D } from "./data_structures/IndexesData.js";
const blockTop = document.getElementById("input-block-top");
const blockBottom = document.getElementById("input-block-bottom");

export function createInputsByIndex(typeName) {
  blockTop.innerHTML = "";
  blockBottom.innerHTML = "";

  let dataList, indexFdiList;

  if (typeName === "cpo") {
    ({ dataList, indexFdiList } = new CPO_D());
  } else if (typeName === "ceo") {
    ({ dataList, indexFdiList } = new CEO_D());
  }

  createInputs(dataList, indexFdiList);
}

function createInputs(dataList, indexFdiList) {
  for (let i = 0; i < dataList.length; i++) {
    // crianção da div
    const inputSection = document.createElement("div");
    inputSection.classList.add("input-section");

    //criação do label
    const label = document.createElement("label");
    label.classList.add("label-name");
    label.textContent = indexFdiList[i];
    inputSection.appendChild(label);

    //criação do input(number)
    const input = document.createElement("input");
    input.type = "number";
    inputSection.appendChild(input);

    // divição dos inputs por grupos (Superior e Inferior)
    if (i < dataList.length / 2) {
      blockTop.appendChild(inputSection);
    } else {
      blockBottom.appendChild(inputSection);
    }
  }
}


/*

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


 */