/*this code describes the backend of the application, 
here are executed the tasks of the acquisition of the 
processed data and the transmission of these to the front end.
Made by: Juan Alejandro Forero Gomez*/ 

//libraries and modules 
const express = require('express'); 
const http = require('http');
const WebSocketServer =  require("socket.io")




const app = express();
const Server =  http.createServer(app);    
const  io = WebSocketServer(Server);

//static files indication with dir path, and frontend directory 
app.use(express.static(__dirname + '/public'));



//start  httpsever and listen in the port
app.set('port', process.env.PORT || 3000);// PORT Asignment
Server.listen(app.get('port'),()=>{
    console.log(`El servidor esta escuchando en el puerto ${app.get('port')}...` )
})
 

//event in io server 
io.on('connection',(socket)=>{
    
    console.log('\nNueva coneccion del socket: ', socket.handshake.address);
    
    var comprobante=0;

    //socket recieber for the rasberry data send 
    socket.on('rasberry:data', (data) => {
    // buffer liberator  
       const bufferProbe = new Promise((resolve,reject)=>{
            if(comprobante!=1){
                if(data.sample!=1){
                    reject("esperando buffer")
                }else{
                    resolve()
                }
            }else{
                resolve()
            }
       })

       bufferProbe
            .then(()=>{
                comprobante=1
                data.temperature=(comp(data.temperature,37,35,33));
                io.emit('rasberry:data', data);
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

});



//comparator 
function comp(comp,max,min,prom){
    comp=comp;
    if(comp>=max ||comp<=min ){
        return comp
    }else
        return prom;
}
