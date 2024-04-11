import dotenv from "dotenv"
dotenv.config()
import http from "node:http"
import mongoose from "mongoose"
import moment from "moment"
import log from "../components/logger.js"
import app from "../index.js"

try {
  /* Create HTTP server.*/
  const server = http.createServer(app)
  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO)
      console.log("Connected to mongoDB.")
    } catch (err) {
      console.log("Connection failed")
      throw err
    }
  }
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
  })
  const port = normalizePort(process.env.PORT || "8801")
  app.set("port", port)

  /*Normalize a port into a number, string, or false.*/
  function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
      return val // named pipe
    }
    if (port >= 0) {
      return port // port number
    }
    return false
  }
  
  server.listen(port, () => {
    connect()
    console.log("Connected to backend")
  })

  server.on("error", onError)
  /*Event listener for HTTP server "error" event.*/
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error
    }
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges")
        process.exit(1)
        break
      case "EADDRINUSE":
        console.error(bind + " is already in use")
        process.exit(1)
        break
      default:
        throw error
    }
  }
} catch (error) {
  console.error(error)
  setTimeout(() => {
    // process.exit(1)
    log.error(
      moment().format("yyyy_MM_DD-HH:mm:ss") + "\n" + error.stack + "\n\n"
    )

    // spawn(process.argv[0], process.argv.slice(1), {
    //   env: { process_restarting: 1 },
    //   stdio: "ignore",
    // }).unref()
  }, 1000)

  // console.error(error)
  // setTimeout(() => {
  //   process.exit(1)
  //   // spawn(process.argv[0], process.argv.slice(1), {
  //   //     env: { process_restarting: 1 },
  //   //     stdio: 'ignore',
  //   // }).unref();
  // }, 1000)
}
