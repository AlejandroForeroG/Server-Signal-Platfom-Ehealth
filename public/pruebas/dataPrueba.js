

function dataRun(sensores,charts){
        for(let i = 0 ;i < sensores.length;i++){
            let values=parseFloat(document.getElementById(sensores[i]+"value").value) 
            for(let j=0; j<10;j++){
                charts[i].data.datasets[0].data[j]=values
            }
            console.log(charts[i].data.datasets[0].data.slice(0, 9));
            charts[i].update()
        }
 }



 function evaluator(charts,sensor){

    const arr= charts.data.datasets[0].data.slice(0, 9);
    const suma = arr.reduce((total, num) => total + num);
    const promedio = suma / arr.length;
    fetch('./limites.json')
    .then(response => response.json())
    .then(limits => {

       if(limits[sensor] ==undefined){
        console.log("no existe")

       }else{
        console.log(promedio)
        try{
            if(limits[sensor].amarilla.limite_superior>=promedio &&
                limits[sensor].amarilla.limite_inferior<=promedio ){
                console.log('amarillo')
                charts.data.datasets[0].backgroundColor="rgb(243, 216, 61,0.7)"
                charts.update()

            }else if(
                limits[sensor].naranja.limite_superior>=promedio &&
                limits[sensor].naranja.limite_inferior<=promedio){
                console.log('naranja')
                charts.data.datasets[0].backgroundColor="rgb(232, 116, 44,0.7)";
                charts.update()

            }else if(limits[sensor].roja.limite_inferior<=promedio){
                console.log('rojo')
                charts.data.datasets[0].backgroundColor="rgb(232, 44, 72,0.7)";
                charts.update()

            }else{
                charts.data.datasets[0].backgroundColor="rgb(140, 86, 233,0.7)"; 
                charts.update() 
            }
        }catch(error){
            console.log(error)
            
        }
        
       }
  })
  .catch(error => console.error(error));


 }
 
        
 



    
