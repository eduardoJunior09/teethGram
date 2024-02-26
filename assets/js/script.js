const elementValue = [],
  bottomValue = [];

/*Função responsável por gerar valores aleatórios*/
function getRandomA(min, max) {
  return Math.random() * (max - min) + min;
}

/*Função responsável por adicionar valores aos campos de input*/
function valeuForm() {
  for (let i = 1; i <= 32; i++) {
    elementValue[i] = getRandomA(10, 100).toFixed(1);
    if (elementValue[i]) {
      console.log(elementValue[i]);
      document.getElementById(`input-${i}`).value = elementValue[i];
    }
  }
}

function generationHistograma() {
  const histrograma = document.getElementById("histrograma");
  histrograma.style.display = "block";

  for (let i = 1; i <= 32; i++) {
    columnHistograma = document.getElementById(`value-${i}`);
    columnHistograma.style.height = elementValue[i] + "%";
  }
}

function downloadHistograma(){}

document
  .getElementById("generation")
  .addEventListener("click", generationHistograma);

  document
  .getElementById("baixar")
  .addEventListener("click", downloadHistograma);
