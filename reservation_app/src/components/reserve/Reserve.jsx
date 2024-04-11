import * as Styled from "./Styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useFetch } from "../customHooks/useFetch"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { basePath } from "../../components/congig"

export const Reserve = ({ setOpenReserve, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(
    `${basePath}/hotels/room/${hotelId}`
  )
  // dates => calendar's choosen dates
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()

  const getDatesInRange = (startDate = new Date(), endDate = new Date()) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const dates = []
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
    const numberOfDays = Math.round((end - start) / oneDay)

    Array.from({ length: numberOfDays + 1 }).forEach((_, index) => {
      const currentDate = new Date(start.getTime() + index * oneDay)
      // We are getting timestemps with .getTime() function
      dates.push(currentDate.getTime())
    })
    return dates
  }
  const allDates = getDatesInRange(
    dates[0]?.startDate || new Date(Date.now()),
    dates[0]?.endDate || new Date(Date.now())
  )

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const selectRoom = (e) => {
    const checkedRoom = e.target.checked
    const roomById = e.target.value
    setSelectedRooms(
      checkedRoom
        ? [...selectedRooms, roomById]
        : selectedRooms.filter((room) => room !== roomById)
    )
  }

  const reserveNow = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${basePath}/rooms/availability/${roomId}`,
            { dates: allDates }
          )
          return res.data
        })
      )
      setOpenReserve(false)
      navigate("/")
    } catch (error) {}
  }

  return (
    <Styled.Reserve>
      <Styled.ReserveContainer>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="ResClose"
          onClick={() => setOpenReserve(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item, index) => (
          <Styled.ResItem key={index}>
            <Styled.ResItemInfo>
              <Styled.ResTitle>{item.title}</Styled.ResTitle>
              <Styled.ResDescription>{item.desc}</Styled.ResDescription>
              <Styled.ResMaxPeople>
                Max people: <span>{item.maxPeople}</span>
              </Styled.ResMaxPeople>
              <Styled.ResPrice>{item.price}</Styled.ResPrice>
            </Styled.ResItemInfo>

            <Styled.ResSelectedRooms>
              {item.roomNumbers.map((roomNumber, index) => (
                <Styled.ResRoom key={index}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={selectRoom}
                    disabled={!isAvailable(roomNumber)}
                  />
                </Styled.ResRoom>
              ))}
            </Styled.ResSelectedRooms>
          </Styled.ResItem>
        ))}

        <Styled.ResBtn onClick={reserveNow}>Reserve Now!</Styled.ResBtn>
      </Styled.ReserveContainer>
    </Styled.Reserve>
  )
}
