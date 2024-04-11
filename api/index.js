import express from "express"
import path from "node:path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const __filename = fileURLToPath(import.meta.url) // Get current file path
const __dirname = path.dirname(__filename) // Derive directory path

const app = express()
// Handle requests for favicon.ico
app.get("/favicon.ico", (req, res) => res.status(204))
dotenv.config()
try {
  // middlewares
  // For saving our token in cookies
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Set CORS options
  const whitelist = [
    "http://localhost:5000",
    "http://localhost:5173",
    "http://localhost:8800",
  ]
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        // Allow requests with no origin (like mobile apps or curl requests)
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    // origin:"*",
    credentials: true, // Allow sending cookies from client to server
  }
  app.use(cors(corsOptions))
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      // useTempFiles : true,
      // tempFileDir : __dirname + '/tmp',
      // safeFileNames: true,
      // preserveExtension: true,
    })
  )

  // Serve static files with appropriate MIME types
  app.use(
    "/",
    express.static(path.join(__dirname, "..", "reservation_app", "dist"))
  )

  app.use(
    "/admin",
    express.static(path.join(__dirname, "..", "admin", "build"))
  )
  app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "admin", "build", "index.html"))
  })

  app.use("/api_v1/auth", authRoute)
  app.use("/api_v1/users", usersRoute)
  app.use("/api_v1/hotels", hotelsRoute)
  app.use("/api_v1/rooms", roomsRoute)

  // Error handling middleware
  /*
   *For this middleware below we must have 4 parameters err,req, res, next otherwise
   * it's gonna work
   */
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    })
  })
} catch (error) {
  console.error(error)
}

export default app
