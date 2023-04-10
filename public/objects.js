//const sensores = ["temperature","bmp","oxigenSaturation","gsrResistance","grsVoltage","airflux"]
function renderGui(sensores){
    const divSignal = document.createElement("div");
    divSignal.setAttribute('class','text-center')
    document.body.appendChild(divSignal)  

    for(let i = 0; i<sensores.length;i++){
        if(i%3==0){
            const divfila = document.createElement("div")
            divfila.setAttribute('class','row')
            divSignal.appendChild(divfila)
        }
        let graph = document.createElement('div');
        let canvas = document.createElement('canvas')
        graph.setAttribute('class','graph col-3')
        canvas.setAttribute('id',sensores[i])
        canvas.setAttribute('class','signal')
        graph.appendChild(canvas) 
        divSignal.appendChild(graph)

    }
}   

