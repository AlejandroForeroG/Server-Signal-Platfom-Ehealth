
const socket = io();

const sensores = ["temperature","bmp","oxigenSaturation","gsrResistance","grsVoltage","airflux"]

//when the rasberry send the data 
socket.on('rasberry:data', (dataSerial) => {
    
    dataRun(Chart1,dataSerial.sample,dataSerial.temperature)
    dataRun(Chart2,dataSerial.sample,dataSerial.bpm)
    dataRun(Chart3,dataSerial.sample,dataSerial.oxigenSaturation)
    

})

const Chart1 = dataGraph("myChartTemp")
const Chart2= dataGraph("myChartBMP")
const Chart3 = dataGraph("myChartox")
