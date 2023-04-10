function renderGui(sensores){
    const raw = document.createElement("div")
    raw.setAttribute('class','row')
    document.body.appendChild(raw)

    const divSignal = document.createElement("div");
    divSignal.setAttribute('class','text-center col-10')
    raw.appendChild(divSignal)  

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

//value 

    const divContainer = document.createElement("div");
    divContainer.setAttribute('class','container col-2 text-center mt-3');
    divContainer.setAttribute('id','contValues')
    raw.appendChild(divContainer);
    divContainer.innerHTML="<h3>Valores de prueba<h3>"
    const form = document.createElement("form");
    divContainer.appendChild(form)

    for(let i = 0; i<sensores.length;i++){
      
    const divInterContainer = document.createElement("div")
    divInterContainer.setAttribute("class",'container ')
    form.appendChild(divInterContainer)

    const name = document.createElement("label")
    const field=document.createElement("input")
    name.setAttribute('class','col-12')
    field.setAttribute('id',sensores[i] + "value")
    field.setAttribute('type','text')
    field.setAttribute('name',sensores[i] + "value")
    field.setAttribute('class','col')
    name.innerHTML=sensores[i]
    divInterContainer.appendChild(name)
    divInterContainer.appendChild(field)
    }

    const btn  =document.createElement('button')
    btn.setAttribute('id','btnvalues')
    btn.setAttribute('type','submit')
    btn.innerHTML="Subir"
    divContainer.appendChild(btn)

    const btn2  =document.createElement('button')
    btn2.setAttribute('id','btnDelete')
    btn2.innerHTML="Borrar todo"
    divContainer.appendChild(btn2)
}

