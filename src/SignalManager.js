
const {
  insertSample,
} = require("../controllers/signalsController");

class SignalManager{
    constructor(signal){
        this.id = signal.id; 
        this.name = signal.name;
        this.color = signal.color;
        this.type = signal.type;
        this.datName = signal.dataName;
        this.samplingTime = signal.samplingTime;

        this.storedData = [];
        this.intervalID =null;
    }


    mostrar(){
        console.log(this.id);
    }

    start(data){
        data = data[this.datName];
        this.intervalID = setInterval(()=>{
            this.storedData.push(data);
            // console.log("sondeo")
        },this.samplingTime * 1000);
    }

    async stop(){
        clearInterval(this.intervalID);
        await insertSample(this.storedData,this.id);
        this.storedData = [];
        console.log("parado")
    }
}

module.exports = SignalManager;