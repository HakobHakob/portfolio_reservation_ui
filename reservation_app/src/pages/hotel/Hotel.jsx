import * as Styled from "./Styled"
import { Navbar } from "../../components/navbar/Navbar"
import { Header } from "../../components/header/Header"
import { MailList } from "../../components/mailList/MailList"
import { Footer } from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"
import { useCallback, useContext, useState } from "react"
import { useFetch } from "../../components/customHooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/Loading"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import { Reserve } from "../../components/reserve/Reserve"
import { basePath } from "../../components/congig"
import { getRandomSrc, hotelImages } from "../../components/Carousel/images"
import { photos } from "./photos"

export const Hotel = () => {
  const location = useLocation()
  const hotelId = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [isOpenHotelSlide, setIsOpenHotelSlide] = useState(false)
  const [isOpenReservModal, setIsOpenReservModal] = useState(false)
  const { data, loading } = useFetch(`${basePath}/hotels/find/${hotelId}`)
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const dayDifference = (date1 = new Date(), date2 = new Date()) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    return  Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
   
  }
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)

  const openHotelSlide = (index) => {
    setSlideNumber(index)
    setIsOpenHotelSlide(true)
  }

  const browseHotelSlide = (direction) => {
    let newSlideNumber
    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  const bookHotel = useCallback(() => {
    if (user) {
      setIsOpenReservModal(true)
    } else {
      navigate("/login")
    }
  }, [user, setIsOpenReservModal, navigate])

  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <Styled.HotelContainer>
          {isOpenHotelSlide && (
            <Styled.Slider>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setIsOpenHotelSlide(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => browseHotelSlide("left")}
              />
              <Styled.SliderWrapper>
                <img
                  src={data.photos[slideNumber] || getRandomSrc()}
                  alt=""
                  className="sliderImg"
                />
              </Styled.SliderWrapper>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => browseHotelSlide("right")}
              />
            </Styled.Slider>
          )}

          <Styled.HotelWrapper>
            <Styled.BookNowBtn>Reserve or Book Now!</Styled.BookNowBtn>
            <Styled.HotelTitle>{data.name}</Styled.HotelTitle>
            <Styled.HotelAddress>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </Styled.HotelAddress>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <Styled.HotelImages>
              {data.photos && data.photos.length !== 0
                ? data.photos.map((photo, i) => (
                    <Styled.HotelImgWrapper key={i}>
                      <img
                        onClick={() => openHotelSlide(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </Styled.HotelImgWrapper>
                  ))
                : photos.map((photo, i) => (
                    <Styled.HotelImgWrapper key={i}>
                      <img
                        onClick={() => openHotelSlide(i)}
                        src={photo.src}
                        alt=""
                        className="hotelImg"
                      />
                    </Styled.HotelImgWrapper>
                  ))}
            </Styled.HotelImages>
            <Styled.HotelDetails>
              <Styled.HotelDetailsTexts>
                <Styled.HotelTitle>{data.title}</Styled.HotelTitle>
                <Styled.HotelDesc>{data.desc}</Styled.HotelDesc>
              </Styled.HotelDetailsTexts>
              <Styled.HotelDetailsPrice>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {days}.8!
                </span>
                <h2>
                  <b>
                    $
                    {days *
                      data.cheapestPrice *
                      (options.room ? options.room : 1)}
                  </b>
                  ({days} nights)
                </h2>
                <button onClick={bookHotel}>Reserve or Book Now!</button>
              </Styled.HotelDetailsPrice>
            </Styled.HotelDetails>
          </Styled.HotelWrapper>
          <MailList />
          <Footer />
        </Styled.HotelContainer>
      )}
      {isOpenReservModal && (
        <Reserve setOpenReserve={setIsOpenReservModal} hotelId={hotelId} />
      )}
    </>
  )
}
