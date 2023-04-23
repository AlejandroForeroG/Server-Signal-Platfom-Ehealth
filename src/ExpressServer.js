const express = require('express'); 
const http = require('http');

class ExpressServer{
    constructor(){
        this.app = express();
        this.Server =  http.createServer(this.app);   

        this.app.use(express.static(__dirname + '/public'));
        this.app.get('/pruebas',(req,res)=>{
            res.sendFile((__dirname+'/public/pruebas/pruebas.html'));
        }); 
    }

    CORS(){
        return{
          cors: {
            origin: '*', // Permite un origen específico
            methods: ['GET', 'POST'], // Permite solo los métodos GET y POST
            allowedHeaders: ['Content-Type', 'Authorization'], // Permite solo ciertos encabezados
            credentials: true, // Habilita el uso de cookies o credenciales
            }    
        }
    }

    iniciarServidor(port){
        this.app.set('port', process.env.PORT || port);// PORT Asignment
        this.Server.listen(this.app.get('port'),()=>{
            console.log(`El servidor esta escuchando en el puerto ${this.app.get('port')}...` );
        })
    }
}

module.exports = ExpressServer;