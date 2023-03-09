const socket = io();
let counter=0;
let prober =0;
let cont= 0;


//when the rasberry send the data 
socket.on('rasberry:data', (dataSerial) => {
    

    // console.log(dataSerial)
    // Chart.data.labels.push(counter);
    // Chart.data.datasets.forEach(dataset => {
    //     dataset.data.push(dataSerial)
    // });
    //console.log(dataSerial)
   
    if(prober !=1){ // cambiar pro promesas 🟩
        if(counter<10){
            addData(Charte,dataSerial.sample,dataSerial.temperature)
            Charte.update()
            counter++;

        }else{
            prober =1
            cont++
        }
    }else{
        addData(Charte,dataSerial.sample,dataSerial.temperature)
        Charte.update()
        removeData(Charte)
        cont++
    }
    
    
    
    
    console.log(dataSerial.sample)
    // Chart.update();
})


const ctx = document.getElementById('myChartTemp').getContext('2d');
let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0,'rgba(58,123,213,1)')
gradient.addColorStop(1,'rgba(0,210,255,0.3')

Charte = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Temperatura'],
        datasets: [{
            label: 'Temperatura',
            fill:true,
            pointBackgrounColor:"rgb(189,195,199)",
            borderColor:'rgb(189,195,199)',
            backgrounColor:gradient,
            data: [],
        }],
    },
    options:{
       animation: {
            duration:"1000",
    
        }
        }
    
});


const ctxo = document.getElementById('myChartBMP');
Charco = new Chart(ctxo, {
    type: 'line',
    data: {
        labels: ['BMP'],
        datasets: [{
            label: 'BMP',
            backgrounColor:'rgb(238, 54, 54)',
            borderColor:'rgb(238, 54, 54)',
            data: [],
        }]
    },
    options:{}
});

const ctxb = document.getElementById('myChartox');
Lalo = new Chart(ctxb, {
    type: 'line',
    data: {
        labels: ['Saturacion de oxigeno'],
        datasets: [{
            label: 'Saturacion de oxigeno',
            backgrounColor:'rgb(54, 82, 238)',
            borderColor:'rgb(54, 82, 238)',
            data: [],
        }]
    },
    options:{}
});





function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    
}