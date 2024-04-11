import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import * as Styled from "./Styled"
import { getRandomSrc } from "./images"

export const Carousel = ({ hotelsData, data }) => {
  const [currentImg, setCurrentImg] = useState(0)

 

  const browseHotelSlide = (direction) => {
    let newSlideNumber = hotelsData.length
    if (direction === "left") {
      setCurrentImg(currentImg - 1 < 0 ? newSlideNumber - 1 : currentImg - 1)
    } else {
      setCurrentImg(currentImg + 1 > newSlideNumber - 1 ? 0 : currentImg + 1)
    }
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      browseHotelSlide("right")
    }, 3000)
    return () => clearTimeout(interval)
  }, [browseHotelSlide])

  return (
    <Styled.FeaturedItem>
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className="arrow"
        onClick={() => browseHotelSlide("left")}
      />

      <div>
        {hotelsData.map((hotel, index) => (
          <Styled.SliderWrapper key={index}>
            {currentImg === index && (
              <div className="div">
                <img
                  key={index}
                  src={hotel.photos[0] || getRandomSrc()}
                  alt=""
                  className="featuredImg"
                />

                <Styled.FeaturedTitles>
                  <h1>{hotel.city}</h1>
                  <h2>{data[0]} properties</h2>
                </Styled.FeaturedTitles>
              </div>
            )}
          </Styled.SliderWrapper>
        ))}
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className="arrow"
        onClick={() => browseHotelSlide("right")}
        style={{
          right: "0",
        }}
      />
    </Styled.FeaturedItem>
  )
}
