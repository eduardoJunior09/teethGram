import { CPO_D, CEO_D } from "./data_structures/IndexesData.js";


const blockTopRight = document.getElementById("input-block-top-right");
const blockTopLeft = document.getElementById("input-block-top-left");
const blockBottomRight = document.getElementById("input-block-bottom-right");
const blockBottomLeft = document.getElementById("input-block-bottom-left");

export function createInputsByIndex(typeName) {
 
  blockTopRight.innerHTML =  " ";
  blockTopLeft.innerHTML = " "; 
  blockBottomRight.innerHTML = " ";
  blockBottomLeft.innerHTML = " "; 

  let dataList, indexFdiList;

  if (typeName === "cpo") {
    ({ dataList, indexFdiList } = new CPO_D()); //Destructuring (Desestruturação de Objetos)
  } else if (typeName === "ceo") {
    ({ dataList, indexFdiList } = new CEO_D());  //Destructuring (Desestruturação de Objetos)
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
      var dataListNumber = (dataList.length/2)/2; 

      if(i<dataListNumber){ 
        blockTopRight.appendChild(inputSection);
      }else if(i => dataListNumber){ 
        blockTopLeft.appendChild(inputSection);
      }
    
    } else {
      var dataListNumber = (dataList.length * 75) / 100; 
       
      if(i<dataListNumber){
        blockBottomRight.appendChild(inputSection);
      }else if(i => dataListNumber){
        blockBottomLeft.appendChild(inputSection);
      }
    }
  }
}
