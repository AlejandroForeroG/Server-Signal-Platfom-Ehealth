
const socket = io();
let state=0;

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


const sensores = ["temperature","bmp","oxigenSaturation","gsrResistance","grsVoltage","airflux"]

//when the rasberry send the data 
socket.on('rasberry:data', (dataSerial) => {
    
    // sessionStorage.setItem('data',chart1.data.data)
    dataRun(Chart1,dataSerial.sample,dataSerial.temperature)
    dataRun(Chart2,dataSerial.sample,dataSerial.bpm)
    dataRun(Chart3,dataSerial.sample,dataSerial.oxigenSaturation)
    

})

const Chart1 = dataGraph("myChartTemp");
const Chart2= dataGraph("myChartBMP");
const Chart3 = dataGraph("myChartox");
