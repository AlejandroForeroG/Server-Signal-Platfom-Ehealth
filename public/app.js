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

Charte = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Temperatura'],
        datasets: [{
            label: 'Temperatura',
            fill:true,
            borderColor:'rgb(255,88,88)',
            backgroundColor:'rgb(255,88,88,0.5)',
            tension:0.4,
            data: [],
        }],
    },
    options:{
        radius:5,
        hitRadius:30,
        hoverRadius:12,
       animation: {
            duration:"1000",
    
        }
        }
    
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