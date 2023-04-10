let charts=[];
let values=[];
let limits



const sensores = ["temperature","bpm","oxigenSaturation","gsrResistance","grsVoltage","airflux","ECG"]




renderGui(sensores);
const butonValue = document.getElementById('btnvalues');
const butonDelete = document.getElementById('btnDelete')

        for(let i = 0 ;i < sensores.length;i++){
           charts[i]= dataGraph(sensores[i])
        }

butonValue.addEventListener('click',()=>{   
    dataRun(sensores,charts)
    setInterval(() => {
        for(let i = 0; i<sensores.length;i++){
            evaluator(charts[i],sensores[i])
        }      
    }, 3000);

butonDelete.addEventListener('click',()=>{
    console.log('borrado')
    for(let i = 0 ;i < sensores.length;i++){
        document.getElementById(sensores[i]+"value").value=""
    }
})

});


charts[0].update()