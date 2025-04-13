class HistogramMulti {
  constructor(parent, dataSerie, dataLabel, position, distribuicao) {
    this._dataSerie = dataSerie;
    this._dataLabel = dataLabel;
    this.position = position;
    this._distribuicao = distribuicao;
    this._container = document.createElement("div");
    this._container.classList.add("container");
    parent.appendChild(this._container);
  }

  generateHistogram() {
    this._container.innerHTML = "";

    let maxDataSerieValue = this.findMax();

    // Criação das áreas
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

    ////////////////////////// SIDE BAR //////////////////////////
    const sideBar = document.createElement("div");
    sideBar.classList.add("side-bar");

    const ruleText = document.createElement("div");
    ruleText.classList.add("rule-text");
    const text = document.createElement("p");
    if (this._distribuicao === "media") {
      text.innerHTML = "Média";
    } else {
      text.innerHTML = "Percentual";
    }

    ruleText.appendChild(text);
    sideBar.appendChild(ruleText);

    const ruleBar = document.createElement("div");
    ruleBar.classList.add("rule-bar");

    const step = maxDataSerieValue / 4;
    const ruleValues = [maxDataSerieValue, step * 3, step * 2, step, 0].map(
      (v) => parseFloat(v.toFixed(1))
    );

    for (let i = 0; i < 5; i++) {
      const ruleBarItem = document.createElement("span");
      ruleBarItem.classList.add("rule-bar-item");
      ruleBarItem.innerHTML = `${ruleValues[i]}-`;
      ruleBar.appendChild(ruleBarItem);
    }

    sideBar.appendChild(ruleBar);
    areaA.appendChild(sideBar);

    ////////////////////////// GRÁFICO //////////////////////////
    const content = document.createElement("div");
    content.classList.add("data-content");
    content.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, auto)`;

    for (let i = 0; i < this._dataLabel.length; i++) {
      const item = this._dataSerie[i];

      const bar = document.createElement("div");
      bar.classList.add("bar");

      const valueBar = document.createElement("div");
      valueBar.classList.add("value-bar-multi");

      const valueC = document.createElement("div");
      valueC.classList.add("valueC");
      valueC.style.height = `${(item.fildC / maxDataSerieValue) * 100}%`;

      const valueP = document.createElement("div");
      valueP.classList.add("valueP");
      valueP.style.height = `${(item.fildP / maxDataSerieValue) * 100}%`;

      const valueO = document.createElement("div");
      valueO.classList.add("valueO");
      valueO.style.height = `${(item.fildO / maxDataSerieValue) * 100}%`;

      const soma = item.fildC + item.fildP + item.fildO;
      valueBar.style.height = `${(soma / maxDataSerieValue) * 100}%`;

      valueBar.appendChild(valueO);
      valueBar.appendChild(valueP);
      valueBar.appendChild(valueC);
      bar.appendChild(valueBar);
      content.appendChild(bar);
    }

    areaB.appendChild(content);

    ////////////////////////// NOMENCLATURA //////////////////////////
    const contentLabel = document.createElement("div");
    contentLabel.classList.add("label-content");
    contentLabel.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, 1fr)`;

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

    ////////////////////////// LEGENDA //////////////////////////
    for (let i = 0; i < this._dataLabel.length; i++) {
      const item = this._dataSerie[i];
      const captionBar = document.createElement("div");
      captionBar.classList.add("caption-bar");

      const legendaC = document.createElement("span");
      legendaC.classList.add("legendaC");
      legendaC.innerHTML = `${((item.fildC / maxDataSerieValue) * 100).toFixed(
        1
      )}`;

      const legendaP = document.createElement("span");
      legendaP.classList.add("legendaP");
      legendaP.innerHTML = `${((item.fildP / maxDataSerieValue) * 100).toFixed(
        1
      )}`;

      const legendaO = document.createElement("span");
      legendaO.classList.add("legendaO");
      legendaO.innerHTML = `${((item.fildO / maxDataSerieValue) * 100).toFixed(
        1
      )}`;

      captionBar.appendChild(legendaO);
      captionBar.appendChild(legendaP);
      captionBar.appendChild(legendaC);

      areaY.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, auto)`;
      areaY.appendChild(captionBar);
    }
  }

  findMax() {
    let max = 0;
    for (let i = 0; i < this._dataSerie.length; i++) {
      const item = this._dataSerie[i];
      const soma = item.fildC + item.fildP + item.fildO;
      if (soma > max) max = soma;
    }
    return max;
  }
}
