import express from "express"
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router()

//CREATE
/*async , because we connecting with DB,creating files into near and more and it takes some times */
router.post("/:hotelid", verifyAdmin, createRoom)

// UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
// GET
router.get("/:id", getRoom)
// GET ALL
router.get("/", getRooms)

export default router
