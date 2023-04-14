/*this code describes the backend of the application, 
here are executed the tasks of the acquisition of the 
processed data and the transmission of these to the front end.
Made by: Juan Alejandro Forero Gomez*/ 

//libraries and modules 
const express = require('express'); 
const http = require('http');
const WebSocketServer =  require("socket.io")
const adminSignal = require('./adminSignal');
const SignalsApi = require('./adminSignal');

const app = express();
const Server =  http.createServer(app);    
const  io = WebSocketServer(Server);


//static files indication with dir path, and frontend directory 
const aplicativo = new SignalsApi();
aplicativo.iniciarServidor();





//start  httpsever and listen in the port
app.set('port', process.env.PORT || 3100);// PORT Asignment
Server.listen(app.get('port'),()=>{
    console.log(`El servidor esta escuchando en el puerto ${app.get('port')}...` )
})


app.get('/pruebas',(req,res)=>{
    res.sendFile((__dirname+'/public/pruebas/pruebas.html'))
})
 

//event in io server 
io.on('connection',(socket)=>{
    console.log('\nNueva coneccion del socket: ', socket.handshake.address); 
    var comprobante=0;

    //socket recieber for the rasberry data send 
    socket.on('rasberry:data', (data) => {
    // buffer liberator  
        const bufferProbe = new Promise((resolve,reject)=>{
            if(comprobante!=1&&data.sample!=1){
                reject('esperando buffer')
            }else{
                resolve()
            }
        })
        bufferProbe
            .then(()=>{
                comprobante=1
                data.temperature=(comp(data.temperature,37,35,33));
                io.emit('rasberry:data', data);
                aplicatiov.setSignalData(data);
                console.log(data.sample)
            })
            .catch((rechazo)=>{
                console.log(data.sample)
                console.log(rechazo)
            })

    });


    socket.on('error', (err) => {
        console.log(err.message)
        })
    socket.on('disconnect',()=>{
        console.log("\nComunicacion finalizada en: ", socket.handshake.address)
    })
    socket.on('btninit',(state)=>{
        const message = (state == 1) ? 'Transmisión iniciada' : 'Transmisión detenida';
        console.log(message);
        io.emit('btninit',state)
    })
});



//comparator 
function comp(comp,max,min,prom){
    comp=comp;
    if(comp>=max ||comp<=min ){
        return comp
    }else
        return prom;
}


