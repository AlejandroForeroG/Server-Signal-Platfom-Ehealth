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

//events of the socket
io.on('connection',(socket)=>{
    console.log('\nNueva coneccion del socket: ', socket.handshake.address);

    
    //socket recieber for the rasberry data send 
    socket.on('rasberry:data', (data) => {
        console.log("Temperatura")
        console.log(data);
        io.emit('rasberry:data',(data ));
    });

    socket.on('error', (err) => {
        console.log(err.message)
    })

    
    socket.on('disconnect', () => {
        console.log("\nComunicacion finalizada en: ", socket.handshake.address)
    })


});


