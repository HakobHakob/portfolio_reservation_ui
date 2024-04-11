import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body)
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (error) {
    next(error)
  }
}
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // $set: => mongoDB method
      },
      { new: true } // returned updated data to our document
    )
    res.status(200).json(updatedHotel)
  } catch (error) {
    next(error)
  }
}
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("Hotel has been deleted")
  } catch (error) {
    next(error)
  }
}
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}
export const getHotels = async (req, res, next) => {
  const { min, max, ...otherProps } = req.query

  try {
    /**Mongo DB methods
     * $eq => comparison operator  that checks if the value of the specified field is equal to the provided value
     * *****************************************************
     * cheapestPrice:{$gt: min  | 1 , $lt: max || 999}
     *$gt: This is a MongoDB operator that stands for "greater than". It specifies a condition where the value of cheapestPrice must be greater than the value specified.
      min | 1: This represents the minimum value for the cheapest price. It's using a       logical OR operator (|) where if min is defined, it will take that value, otherwise,      it will take 1 as the minimum value.
     * $lt: This is a MongoDB operator that stands for "less than". It specifies a condition where the value of cheapestPrice must be less than the value specified.
      max || 999: This represents the maximum value for the cheapest price. It's using a logical OR operator (||) where if max is defined, it will take that value, otherwise, it will take 999 as the maximum value.
     * ...(otherProps.featured ? { featured: true } : {}),
       ...(otherProps.city ? { city: otherProps.city } : {}),
      * ***********************************************************
     */

    const finalQuery = {
      ...(otherProps.featured ? { featured: true } : {}),
      ...(otherProps.city ? { city: otherProps.city } : {}),
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }

    const hotels = await Hotel.find(finalQuery).limit(otherProps.limit)
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(
      cities.map((city) => {
        // This shows count of hotles by city name from our DB
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}
export const countByType = async (req, res, next) => {
  const hotelTypes = req.query.hotelType.split(",")

  try {
    const typeList = await Promise.all(
      hotelTypes.map((type) => {
        // This shows count of hotles by propertie type from our DB
        return Hotel.countDocuments({ type: type })
      })
    )
    const response = hotelTypes.map((type, index) => ({
      type: type,
      count: typeList[index],
    }))
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    // We have multiple rooms from our Hotel model. So we using Promise.all
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}
