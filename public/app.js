
const socket = io();
//when the rasberry send the data 
socket.on('rasberry:data', (dataSerial) => {
  
        // if(prober !=1){ // cambiar pro promesas 🟩
        //         if(counter<10){
        //             addData(Charte,dataSerial.sample,dataSerial.temperature)
        //             Charte.update()
        //             counter++;

        //         }else{
        //             prober =1
                   
        //         }
        //     }else{
        //         addData(Charte,dataSerial.sample,dataSerial.temperature)
        //         Charte.update()
        //         removeData(Charte)
              
        //     }

        

    dataRun(Charte,dataSerial.sample,dataSerial.temperature)
    
    console.log(dataSerial.temperature)
    console.log(Charte.data.datasets.data)
    // Chart.update();
})


const ctx = document.getElementById('myChartTemp').getContext('2d');
const labels =[ "1","2","3","4","5","6","7","8","9","10"]


const data ={
    labels:labels,
    datasets:[{
        data: [],
        label:'temperatura'
    }]
}

const config ={
    type:'line',
    data:data,
    options:{
        responsive:true
    }
}
const Charte = new Chart(ctx,config);

// Charte = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Temperatura'],
//         datasets: [{
//             label: 'Temperatura',
//             fill:true,
//             borderColor:'rgb(255,88,88)',
//             backgroundColor:'rgb(255,88,88,0.5)',
//             tension:0.4,
//             data: [],
//         }],
//     },
//     options:{
//         radius:5,
//         hitRadius:30,
//         hoverRadius:12,
//        animation: {
//             duration:"1000",
    
//         }
//         }
    
// });






// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
    
// }

// function removeData(chart) {
//     chart.data.labels.shift();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.shift();
//     });
    
// }