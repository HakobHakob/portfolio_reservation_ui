import * as Styled from "./Styled"
import { useFetch } from "../customHooks/useFetch"
import Loading from "../Loading/Loading"
import { images } from "./util"
import { basePath } from "../../components/congig"

export const PropertyList = () => {
  // Make request for fetching data from DB
  const { data, loading, error } = useFetch(
    `${basePath}/hotels/countByType?hotelType=hotel,apartment,resort,villa,cabin`
  )

  return (
    <Styled.PropList>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <Styled.PropListItem key={i}>
                <img src={img} alt="" className="propListImg" />
                <Styled.PropListTitles>
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </Styled.PropListTitles>
              </Styled.PropListItem>
            ))}
        </>
      )}
    </Styled.PropList>
  )
}
