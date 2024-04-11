import { basePath } from "../../../components/congig"
import Loading from "../../Loading/Loading"
import { useFetch } from "../../customHooks/useFetch"
import * as Styled from "./Styled"
import {getRandomSrc} from "../../Carousel/images"

export const FeaturedProperties = () => {
  const { data, loading } = useFetch(`${basePath}/hotels?featured=true&limit=3`)

  return (
    <Styled.FeaturedProps>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.map((item) => (
            <Styled.FpItem key={item._id}>
             
              <img src={item.photos[0] || getRandomSrc()} alt="" className="fpImg" />
              <Styled.FpNameSpan>{item.name}</Styled.FpNameSpan>
              <Styled.FpCitySpan>{item.city}</Styled.FpCitySpan>
              <Styled.FpPriceSpan>
                Starting from ${item.cheapestPrice}
              </Styled.FpPriceSpan>

              {item.rating && (
                <Styled.FpRaiting>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </Styled.FpRaiting>
              )}
            </Styled.FpItem>
          ))}
        </>
      )}
    </Styled.FeaturedProps>
  )
}
