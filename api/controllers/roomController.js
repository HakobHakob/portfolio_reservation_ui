import { createError } from "../utils/error.js"
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const roomData = req.body

  const newRoom = new Room({
    title: roomData.title,
    desc: roomData.desc,
    price: roomData.price,
    maxPeople: roomData.maxPeople,
    roomNumbers: roomData.roomNumbers,
  })

  try {
    const savedRoom = await newRoom.save()
    // For updating our Hotel rooms information
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      })
    } catch (error) {
      next(error)
    }
    res.status(200).json(savedRoom)
  } catch (error) {
    next(error)
  }
}

export const updateRoom = async (req, res, next) => {
  const roomData = req.body
  const roomNumbers = JSON.parse(roomData.roomNumbers)
  const roomNewData = {
    title: roomData.title,
    desc: roomData.desc,
    price: roomData.price,
    maxPeople: roomData.maxPeople,
    roomNumbers,
  }
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: roomNewData, // $set: => mongoDB method
      },
      { new: true } // returned updated data to our document
    )
    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}
export const updateRoomAvailability = async (req, res, next) => {
  try {
    //req.params.id => pass from routes-> rooms
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          // If unavailableDates is nested propertie we use " $ "
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    )
    res.status(200).json("Room status has been updated.")
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  try {
    await Room.findByIdAndDelete(req.params.id)

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      })
    } catch (err) {
      next(err)
    }

    res.status(200).json("Room has been deleted")
  } catch (error) {
    next(error)
  }
}
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}
