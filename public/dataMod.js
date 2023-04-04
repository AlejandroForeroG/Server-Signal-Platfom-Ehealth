
let counter=[];
let prober =0;
let cont= 0;

//data run function
function dataRun(Chart,sample,variable){
 

    //promise to evaluate the first 10 simbols.
    //for no acumulation of labels an data 
    const proberPromise = new Promise((resolve,reject)=>{
        if(prober !=1){ 
            if(sample<=10){
                reject(Chart,sample,variable);
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
            sessionStorage.setItem('prober',prober)
        })
        .catch(()=>{
             addinit(Chart,sample,variable)
        })
}



//functions
//adding the first 10 data 
function addDataInit(chart,label,dataS) {
    chart.data.labels.splice(label-1,1,label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(dataS);
    });
    almacenamiento(chart)
}

// add data before the 10 first data 
function addData(chart,label,dataS) {
    console.log(label)
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(dataS);
    });
    almacenamiento(chart)
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

//add the 10 data in the chart constanly 
function almacenamiento(chart) {
  const valor = sessionStorage.getItem("prober");
  const nombre = chart.data.datasets[0].label;
  const datos = chart.data.datasets[0].data.slice(0, 9);
  
  const bool = valor != 1 ? datos.length <= 10 : datos.length == 9;
  if (!bool) {
    return;
  }
  
  sessionStorage.setItem(nombre, datos);
}



