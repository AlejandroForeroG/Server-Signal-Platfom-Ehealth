const socket = io();
let counter=0;


socket.on('rasberry:data', (dataSerial) => {
    Chart.data.labels.push(counter);
    Chart.data.datasets.forEach(dataset => {
        dataset.data.push(dataSerial.value)
    });
    //console.log(dataSerial)
    counter++;
    Chart.update();
})

const ctx = document.getElementById('myChart').getContext('2d');
var Chart=new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Serial Port'],
        datasets: [{
            label: 'serial',
            backgrounColor:'rgb(52,73,74)',
            borderColor:'rgb(41,128,185)',
            data: [],
        }]
    },
    options:{}
});




