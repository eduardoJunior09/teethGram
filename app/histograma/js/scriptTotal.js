class HistogramTotal {
  constructor(parent, dataSerie, dataLabel, position, distribuicao) {
    this._dataSerie = dataSerie;
    this._dataLabel = dataLabel;
    this.position = position;
    this._container = document.createElement("div");
    this._container.classList.add("container");
    this._distribuicao = distribuicao;
    parent.appendChild(this._container);
  }

  generateHistogramTotal() {
    this._container.innerHTML = "";

    let maxDataSerieValue = this.findMax(this._dataSerie);
    console.log(maxDataSerieValue);

    //criação das areas
    const areaX = document.createElement("div");
    areaX.classList.add("area-x");
    this._container.appendChild(areaX);

    const areaY = document.createElement("div");
    areaY.classList.add("area-y");
    this._container.appendChild(areaY);

    const areaA = document.createElement("div");
    areaA.classList.add("area-a");
    this._container.appendChild(areaA);

    const areaB = document.createElement("div");
    areaB.classList.add("area-b");
    this._container.appendChild(areaB);

    const areaC = document.createElement("div");
    areaC.classList.add("area-c");
    this._container.appendChild(areaC);

    const areaD = document.createElement("div");
    areaD.classList.add("area-d");
    this._container.appendChild(areaD);

    ////////////////////////// SIDE BAR (Regua Lateral)  //////////////////////////
    const sideBar = document.createElement("div");
    sideBar.classList.add("side-bar");

    // elementos dos componentes do side bar
    //Texto (Média)
    const ruleText = document.createElement("div");
    ruleText.classList.add("rule-text");

    const text = document.createElement("p");

    if(this._distribuicao === "media"){
      text.innerHTML = "Média";
    }else{
      text.innerHTML = "Percentual";
    }
   

    ruleText.appendChild(text);
    sideBar.appendChild(ruleText);

    ////////////////////////// Regua (Números)  //////////////////////////
    const ruleBar = document.createElement("div");
    ruleBar.classList.add("rule-bar");

    // Define os valores para a régua lateral
    const step = maxDataSerieValue / 4; // Dividindo o intervalo em 4 partes iguais
    const ruleValues = [maxDataSerieValue, step * 3, step * 2, step, 0].map(
      (value) => parseFloat(value.toFixed(1))
    );

    for (let i = 0; i < 5; i++) {
      const ruleBarItem = document.createElement("span");
      ruleBarItem.classList.add("rule-bar-item");
      // Exibe o valor correspondente à posição na régua
      ruleBarItem.innerHTML = `${ruleValues[i]}-`;
      ruleBar.appendChild(ruleBarItem);
    }

    sideBar.appendChild(ruleBar);
    areaA.appendChild(sideBar);

    ////////////////////////// GRÁFICO  //////////////////////////
    const content = document.createElement("div");
    content.classList.add("data-content");

    content.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, auto)`;

    // criação das barras
    for (let i = 0; i < this._dataLabel.length; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");

      const valueBar = document.createElement("span");
      valueBar.classList.add("value-bar");

      valueBar.style.height = `${
        (this._dataSerie[i] / maxDataSerieValue) * 100
      }%`;

      bar.appendChild(valueBar);
      content.appendChild(bar);
    }

    areaB.appendChild(content);

    ////////////////////////// NOMECLATURA //////////////////////////
    const contentLabel = document.createElement("div");
    contentLabel.classList.add("label-content");

    contentLabel.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, 1fr)`;

    // criação das label
    for (let i = 0; i < this._dataLabel.length; i++) {
      const barLabel = document.createElement("span");
      barLabel.classList.add("bar-label");

      barLabel.textContent = `${this._dataLabel[i]}`;

      contentLabel.appendChild(barLabel);
    }

    areaD.appendChild(contentLabel);

    if (this.position === "bottom") {
      this._container.classList.add("inverted-container");
      ruleBar.classList.add("inverted-rule-bar");
    }

    // criação da barra de legenda
    for (let i = 0; i < this._dataLabel.length; i++) {
      const captionBar = document.createElement("div");
      captionBar.classList.add("caption-bar");

      const legendaC = document.createElement("span");
      legendaC.classList.add("legendaTotal");
      legendaC.innerHTML = `${this._dataSerie[i].toFixed(1)}`;

      captionBar.appendChild(legendaC);

      areaY.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, auto)`;
      areaY.appendChild(captionBar);
    }
  }

  findMax() {
    let max = parseInt(this._dataSerie[0]);
    for (let i = 1; i < this._dataSerie.length; i++) {
      if (parseInt(this._dataSerie[i]) > max)
        max = parseInt(this._dataSerie[i]);
    }
    return max;
  }
}
