import express from "express"

import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router()

//CREATE
/*async , because we connecting with DB,creating files into near and more and it takes some times */
router.post("/", verifyAdmin, createHotel)

// UPDATE
router.put("/:id", verifyAdmin, updateHotel)
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
// GET
router.get("/find/:id", getHotel)
// GET ALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router
