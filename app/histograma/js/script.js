class Histogram {
  constructor(parent, dataSerie, dataLabel, position) {
    this._dataSerie = dataSerie;
    this._dataLabel = dataLabel;
    this.position = position;
    this._container = document.createElement("div");
    this._container.classList.add("container");
    parent.appendChild(this._container);
  }

  //******************************************************************** */
  generateHistogram() {
    this._container.innerHTML = "";

    if (this.position === "bottom") {
      this._container.classList.add("inverted");
    }


    let maxDataSerieValue = this.findMax(this._dataSerie);

    // cria o elemento que representa os números da regua lateral
    const ruleBar = document.createElement("div");
    ruleBar.classList.add("rule-bar");

    // Define os valores para a régua lateral
    const step = maxDataSerieValue / 4; // Dividindo o intervalo em 4 partes iguais
    const ruleValues = [maxDataSerieValue, step * 3, step * 2, step, 0];

    for (let i = 0; i < 5; i++) {
      const ruleBarItem = document.createElement("div");
      ruleBarItem.classList.add("rule-bar-item");
      // Exibe o valor correspondente à posição na régua
      ruleBarItem.innerHTML = `${ruleValues[i]}-`;
      ruleBar.appendChild(ruleBarItem);
    }

    // cria o elemento content
    const content = document.createElement("div");
    content.classList.add("content");
    const contentLabel = document.createElement("div");
    contentLabel.classList.add("contentLabel");
    const labelSpace = document.createElement("div");
    labelSpace.classList.add("labelSpace");

    // cria o elemento bar-content
    const barContent = document.createElement("div");
    barContent.classList.add("bar-content");

    barContent.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, auto)`;

    // cria o elemento label-content
    const labelContent = document.createElement("div");
    labelContent.classList.add("label-content");
    labelContent.style.gridTemplateColumns = `repeat(${this._dataLabel.length}, 1fr)`;

    // cria as barras
    for (let i = 0; i < this._dataLabel.length; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");

      const valueBar = document.createElement("div");
      valueBar.classList.add("value-bar");

      valueBar.style.height = `${
        (this._dataSerie[i] / maxDataSerieValue) * 100
      }%`; //`${Math.round(dataSerie[i])}%`;

      bar.appendChild(valueBar);
      barContent.appendChild(bar);

      // criação das labels
      const barLabel = document.createElement("div");
      barLabel.classList.add("bar-label");
      barLabel.textContent = `${this._dataLabel[i]}`; // conteúdo dentro da label

      // adiciona a label ao label-content
      labelContent.appendChild(barLabel);
    }

    // adiciona bar-content e ruleBar ao content
    content.appendChild(ruleBar);
    content.appendChild(barContent);

    // adiciona labelContent
    //Uma div vazia é add para manter as metricas de espaçamento com o grafico
    contentLabel.appendChild(labelSpace);
    contentLabel.appendChild(labelContent);

    this._container.appendChild(content);
    this._container.appendChild(contentLabel);
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
