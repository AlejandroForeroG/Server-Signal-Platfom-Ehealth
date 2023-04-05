
const socket = io();
let state=0;

let charts=[]

//button comprobation
const button = document.getElementById('startButton');
button.addEventListener('click',()=>{
    if(button.innerText==="Iniciar conexion"){
        button.innerText="Terminar conexion";
        button.classList.add('pause');
        state=1;
        socket.emit('btninit',state);
    }else{
        button.innerText="Iniciar conexion";
        button.classList.remove('pause');
        state=0;
        socket.emit('btninit',state);
    }
})

const sensores = ["temperature","bpm","oxigenSaturation","gsrResistance","grsVoltage","airflux"]
renderGui(sensores)
//when the rasberry send the data 
socket.on('rasberry:data', (dataSerial) => {
    
    for(let i = 0; i<sensores.length;i++){
        dataRun(charts[i],dataSerial.sample,dataSerial[sensores[i]])
    }


})

for(let i = 0 ;i < sensores.length;i++){
    charts[i]=dataGraph(sensores[i])
}
