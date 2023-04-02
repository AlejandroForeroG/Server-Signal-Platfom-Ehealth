function dataGraph(chartname,color){
    const ctx = document.getElementById(chartname).getContext('2d');
    const labels =[ "1","2","3","4","5","6","7","8","9","10"]
    //gradient fill 
    let gradient  = ctx.createLinearGradient(0,0,0,400);
    gradient.addColorStop(0,'rgba(133, 0, 255, 1)' )
    gradient.addColorStop(1,'rgba(0, 188, 212, 0.5)')
    const data ={
    labels:labels,
    datasets:[{
        data: [],
        label:'temperatura',
        fill: true,
        backgroundColor:gradient,
        

    }]
    
    }
    const config ={
        type:'line',
        data:data,
        options:{
            responsive:true
        
        }
    }
    const result = new Chart(ctx,config);
    return result
}