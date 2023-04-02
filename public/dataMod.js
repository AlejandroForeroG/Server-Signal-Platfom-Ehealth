/* This file allow real time data in the charts

*/

let counter=0;
let prober =0;
let cont= 0;

//data run function
function dataRun(Chart,sample,variable){


    console.log("este es prober")
    //promise to evaluate the first 10 simbols.
    //for no acumulation of labels an data 
    const proberPromise = new Promise((resolve,reject)=>{
        if(prober !=1){ 
                if(sample<=10){
                    reject(Chart,sample,variable);
                    console.log

                }else{
                resolve(Chart,sample,variable)
                }
            }else{
            resolve(Chart,sample,variable)
            }
        
    })
    proberPromise
        .then(()=>{
            ad(Chart,sample,variable)
        })
        
        .catch(()=>{
             addinit(Chart,sample,variable)
        })
}


//adding the first 10 data 
function addDataInit(chart,label,dataS) {
    console.log(chart.data.labels)
   
    chart.data.labels.splice(label-1,1,label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(dataS);
    });
   
}
// add data before the 10 first data 
function addData(chart,label,dataS) {

    console.log(chart.data.labels)
    console.log(label)
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(dataS);
    });
  //cometario random
}
//remove for no acummulation
function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    
}
//function before the 10 data
function ad(Chart,sample,variable){
    console.log("normal")
    prober =1
    addData(Chart,sample,variable)
    Chart.update()
    removeData(Chart)
    cont++
}
//functions of beginin
function addinit(Chart,sample,variable){
    console.log("init")
    addDataInit(Chart,sample,variable)
    Chart.update()
    counter++;

}




