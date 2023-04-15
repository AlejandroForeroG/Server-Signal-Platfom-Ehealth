/*this code describes the backend of the application, 
here are executed the tasks of the acquisition of the 
processed data and the transmission of these to the front end.
Made by: Juan Alejandro Forero Gomez*/ 

//libraries and modules

const express = require('express'); 
const http = require('http');
const WebSocketServer =  require("socket.io")

class ServerSide{


    
    constructor(){

        
        this.app = express();
        this.Server =  http.createServer(this.app);   
        this.CORS(this.Server); 

        //static files indication with dir path, and frontend directory 
        this.app.use(express.static(__dirname + '/public'));
        this.app.get('/pruebas',(req,res)=>{
            res.sendFile((__dirname+'/public/pruebas/pruebas.html'))
        })

        this.io.on('connection',this.handleConnection.bind(this));

    }


    CORS(server){
         this.io = WebSocketServer(server,{
            cors: {
            origin: '*', // Permite un origen específico
            methods: ['GET', 'POST'], // Permite solo los métodos GET y POST
            allowedHeaders: ['Content-Type', 'Authorization'], // Permite solo ciertos encabezados
            credentials: true, // Habilita el uso de cookies o credenciales
            }   
        });
    }

    //start  httpsever and listen in the port
    iniciarServidor(port){
            this.app.set('port', process.env.PORT || port);// PORT Asignment
            this.Server.listen(this.app.get('port'),()=>{
                console.log(`El servidor esta escuchando en el puerto ${this.app.get('port')}...` )
            })
        }
        

    //event in io server
    handleConnection(socket){
        console.log('\nNueva coneccion del socket: ', socket.handshake.address); 
        var comprobante=0;

        //socket recieber for the rasberry data send 
        socket.on('rasberry:data', (data) => { 
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
                    this.io.emit('rasberry:data', data);
                    console.log(data.sample)
                })
                .catch((rechazo)=>{
                    console.log(data.sample)
                    console.log(rechazo)
                });
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
            this.io.emit('btninit',state)
        })

    }

}


const server = new ServerSide();
server.iniciarServidor(3000);













