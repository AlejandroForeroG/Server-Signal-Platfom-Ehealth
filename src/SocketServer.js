const WebSocketServer = require("socket.io");
const ExpressServer = require("./ExpressServer");
const { newMuestra } = require("../controllers/signalsController");
const SignalManager = require("./SignalManager");
/** creacion de la clase socket server la cual se
 * encarga de gestionar los eventos de la aplicacion
 */
class SocketServer {
  constructor() {
    this.expressServer = new ExpressServer();
    this.io = WebSocketServer(
      this.expressServer.Server,
      this.expressServer.CORS()
    );
    this.io.on("connection", this.handleConnection.bind(this));
    
    this.data;
    this.actualUser = null;
    this.sigs = [];
  }

  handleConnection(socket) {
    console.log("\nNueva coneccion del socket: ", socket.handshake.address);

    socket.on("rasberry:data", (data) => {
      this.io.emit("rasberry:data", data);
      this.data = data;
    });

    socket.on("error", (err) => {
      console.log(err.message);
    });

    socket.on("disconnect", () => {
      console.log("\nComunicacion finalizada en: ", socket.handshake.address);
    });

    /**registra el estado del boton y lo envia a la raspberry
     * tambien se encarga de delegar las tareas correspondientes
     * a la base de datos
     */
    socket.on("btninit", async (state) => {
      let message = "";
      if (state == 1) {
        this.io.emit("btninit", state);
        message = "Transmision iniciada";
        if (this.sigs) {
          await newMuestra(this.actualUser);
          this.sigs.forEach((signal) => {
            signal.start(this.data);
          });
        }
      } else {
        this.io.emit("btninit", state);
        message = "Transmision detenida";
        this.sigs.forEach(async (signal) => {
          await signal.stop();
        });
      }
      console.log(message);
    });

    /**
     * aqui se obtiene la informacion actual del usuario para poder
     * utilizarlas luego
     */
    socket.on("info", (data) => {
      this.actualUser = data.actualUser;
      data.signals.forEach((signal) => {
        this.sigs.push(new SignalManager(signal));
      });
      this.sigs.forEach((signal) => {
        signal.mostrar();
      });
    });
  }
}

const server = new SocketServer();
server.expressServer.iniciarServidor(3100);
