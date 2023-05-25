const WebSocketServer = require("socket.io");
const ExpressServer = require("./ExpressServer");
const { newMuestra,insertSample } = require("../controllers/signalsController");

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
    this.comprobante = 0;
    this.intervals = [];
    this.data;
    this.isEventActive = false;
    this.actualUser = null;
    this.signals = null;
    this.dataTemperature = [];
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
        message = "Transmision iniciada";
        if (this.signals) {
          await newMuestra(this.actualUser);
          this.signals.forEach((signal) => {
            this.initInterval(signal);
          });
        }
        this.io.emit("btninit", state);
      } else {
        this.io.emit("btninit", state);
        message = "Transmision detenida";
        await this.stopIntervals();
      }

      console.log(message);
    });

    /**
     * aqui se obtiene la informacion actual del usuario para poder
     * utilizarlas luego
     */
    socket.on("info", (data) => {
      this.signals = data.signals;
      this.actualUser = data.actualUser;
    });
  }

  /**
   * aqui se trabaja con los intervalos asignados anteriormente y
   * se realizan las tareas correspondientes, de la base de datos
   */
  initInterval(signal) {
    const intervalId = setInterval(() => {
      // console.log(this.data[signal.dataName]);
      if ((signal.dataName == "temperature")) {
        console.log(this.data[signal.dataName])
        this.dataTemperature.push(this.data[signal.dataName]);
      } else {
      }
    }, signal.samplingTime * 1000);
    this.intervals.push(intervalId);
  }

  async stopIntervals() {
    this.intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    console.log(this.dataTemperature)
    await insertSample(this.dataTemperature);
    this.dataTemperature = [];
  }
}

const server = new SocketServer();
server.expressServer.iniciarServidor(3100);
