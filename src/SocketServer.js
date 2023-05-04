const WebSocketServer = require("socket.io");
const ExpressServer = require("./ExpressServer");

class SocketServer {
  constructor() {
    this.expressServer = new ExpressServer();
    this.io = WebSocketServer(
      this.expressServer.Server,
      this.expressServer.CORS()
    );
    this.io.on("connection", this.handleConnection.bind(this));
    this.comprobante = 0;
  }
  

  handleConnection(socket) {
    console.log("\nNueva coneccion del socket: ", socket.handshake.address);

    //socket events
    socket.on("rasberry:data", (data) => {
      this.bufferProbe(data);
    });
    socket.on("error", (err) => {
      console.log(err.message);
    });
    socket.on("disconnect", () => {
      console.log("\nComunicacion finalizada en: ", socket.handshake.address);
    });
    socket.on("btninit", (state) => {
      const message =
        state == 1 ? "Transmisión iniciada" : "Transmisión detenida";
      console.log(message);
      this.io.emit("btninit", state);
    });
  }

  bufferProbe(data) {
    const bufferProbe = new Promise((resolve, reject) => {
      if (this.comprobante != 1 && data.sample != 1) {
        reject("esperando buffer");
      } else {
        resolve();
      }
    });
    bufferProbe
      .then(() => {
        this.comprobante = 1;
        this.io.emit("rasberry:data", data);
      })
      .catch((rechazo) => {
        console.log(data.sample);
        console.log(rechazo);
      });
  }
}

const server = new SocketServer();
server.expressServer.iniciarServidor(3100);
