import { Link } from "react-router-dom"
import * as Styled from "./Styled"
import { getRandomSrc } from "../../components/Carousel/images"

export const SearchItem = ({ item }) => {
  return (
    <Styled.SearchItem>
      <img src={item.photos[0] || getRandomSrc()} alt="" className="siImg" />
      <Styled.SiDesc>
        <Styled.SiTitle className="siTitle">{item.name}</Styled.SiTitle>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </Styled.SiDesc>
      <Styled.SiDetails>
        {item.rating && (
          <Styled.SiRating>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </Styled.SiRating>
        )}

        <Styled.SiDetailTexts>
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>

          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </Styled.SiDetailTexts>
      </Styled.SiDetails>
    </Styled.SearchItem>
  )
}
