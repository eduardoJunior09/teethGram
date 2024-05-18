import { CPO_D, CEO_D } from "./data_structures/IndexesData.js";
const blocoTop = document.getElementById("input-block-top");
const blocoBottom = document.getElementById("input-block-bottom");

export function createInputsByIndexMultiple(typeName) {
  blocoTop.innerHTML = "";
  blocoBottom.innerHTML = "";

  let indexInstance;

  if (typeName === "cpo") {
    indexInstance = new CPO_D();
  } else if (typeName === "ceo") {
    indexInstance = new CEO_D();
  }

  createInputs(indexInstance);
}

function createInputs(indexInstance) {
  const { dataList, triDataList } = indexInstance;

  for (let i = 0; i < dataList.length; i++) {
    const inputSection = document.createElement("div");
    inputSection.classList.add("input-mult");

    const inputTitle = document.createElement("div");
    inputTitle.classList.add("title-input-mult");
    inputTitle.classList.add("label-name");
    inputTitle.textContent = indexInstance.indexFdiList[i];
    inputSection.appendChild(inputTitle);

    const inputMultValues = document.createElement("div");
    inputMultValues.classList.add("mult-values");
    inputSection.appendChild(inputMultValues);

    createMultivaluedValues(inputMultValues, triDataList[i]);

    if (i < dataList.length / 2) {
      blocoTop.appendChild(inputSection);
    } else {
      blocoBottom.appendChild(inputSection);
    }
  }
}

function createMultivaluedValues(inputMultValues, triData) {
  const labels = [triData.labelFildA, triData.labelFildB, triData.labelFildC];
  const fields = [triData.fildA, triData.fildB, triData.fildC];

  labels.forEach((labelText, index) => {
    const valueDiv = document.createElement("div");
    valueDiv.classList.add("value");

    const labelElement = document.createElement("label");
    labelElement.textContent = labelText;
    valueDiv.appendChild(labelElement);

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.value = fields[index];
    valueDiv.appendChild(inputElement);

    inputMultValues.appendChild(valueDiv);
  });
}
