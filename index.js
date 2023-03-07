const express = require('express'); 
const http = require('http');
import {Server as WebSocketServer} from "socket.io"


const app = express();
const httpServer =  http.createServer(app);    
const  io = WebSocketServer(httpServer);

//static files indication with dir path, and frontend directory 
app.use(express.static(__dirname + '/public'));



//start sever and listen in the port
app.set('port', process.env.PORT || 3000);// PORT Asignment

app.listen(app.get('port'),()=>{
    console.log(`Server is listening on port ${app.get('port')}...` )
})

io.on('connection',()=>{
    console.log('New socket conection');
});
