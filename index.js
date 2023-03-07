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
    console.log(`Server is listening on port ${app.get('port')}...` )
})
//event in io server 
io.on('connection',()=>{
    console.log('New socket conection');
});
