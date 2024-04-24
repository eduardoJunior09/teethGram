class TriData{
    constructor(){
        this.fildA = "$";
        this.fildB = "$";
        this.fildC = "$";
        this.labelFildA = "$";
        this.labelFildB = "$";
        this.labelFildC = "$";
    }
}

class Index{
    constructor(size){
        this.dataList = new Array(size);
        this.triDataList = [];
        this.indexAdaList = new Array(size); // const
        for(let i=0;i<size;i++){
            this.triDataList.push(new TriData());
        }
    }
    getDataList(){return this.data;}
    getIndexFdiList(){return this.indexFDI;}
    getIndexAdaList(){return this.indexADA;}
    
    setData(valor, index){
        this.dataList[index]=valor;
    }
}

export class CPO_D extends Index{
    constructor(){
        super(32);
        this.indexFdiList = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
    }
}

export class CEO_D extends Index{
    constructor(){
        super(20);
        this.indexFdiList = [colocar os numeros];
    }
}