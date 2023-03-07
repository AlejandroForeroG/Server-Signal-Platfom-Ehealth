const path= require ('path')
const express = require('express'); 
app = express();
PORT= 3000;

app.set('port',process.env.PORT||PORT);// PORT Asignment
//static files indication with dir path, and frontend directory 
app.use(express.static(path.join(__dirname + '/public')));

//start sever and listen in the port
const server = app.listen(app.get('port'),()=>{
    console.log(`Server is listening on port ${app.get('port')}...` )
})

//websocket 
const SocketIO = require('socket.io')
const io = SocketIO(server); //listen in the server 

io.on('connection',()=>{
    console.log('New socket conection');
});
