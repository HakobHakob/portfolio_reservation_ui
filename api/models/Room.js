import mongoose from "mongoose"
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: { type: Number, required: true },
        unavailableDates: { type: [Date] },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model("Room", RoomSchema)

/**
 *  roomNumbers: [
      {
        number: 101,
        unavailableDates: [01.05.2024, 03.05.2024]},        
      },
    ]
 */
