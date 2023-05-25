const express = require("express");
const http = require("http");

class ExpressServer {
  constructor() {
    this.app = express();
    this.Server = http.createServer(this.app);
    this.app.use(require("cors")(this.CORS()));
    //middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    //rutas
    this.app.use(require("../routes/route"));
  }

  CORS() {
    return {
      cors: {
        origin: "*", // Permite un origen específico
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Permite solo los métodos
        allowedHeaders: ["*"], // Permite solo ciertos encabezados
        credentials: true, // Habilita el uso de cookies o credenciales
      },
    };
  }

  iniciarServidor(port) {
    this.app.set("port", process.env.PORT || port); // PORT Asignment
    this.Server.listen(this.app.get("port"), () => {
      console.log(
        `El servidor esta escuchando en el puerto ${this.app.get("port")}...`
      );
    });
  }
}

module.exports = ExpressServer;
