import { useEffect, useState } from "react"
import { basePath } from "../../components/congig"
import Loading from "../Loading/Loading"
import { useFetch } from "../customHooks/useFetch"
import * as Styled from "./Styled"
import { Carousel } from "../Carousel/Carousel"

export const Featured = () => {
  const [hotelsData, setHotelsData] = useState([])
  const { data, loading } = useFetch(
    `${basePath}/hotels/countByCity?cities=berlin,madrid,london,Paris`
  )

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelsResponse = await fetch(`${basePath}/hotels`)
      const hotelsData = await hotelsResponse.json()
      setHotelsData(hotelsData)
    }

    fetchHotels()
  }, [])

  return (
    <Styled.Featured>
      {loading ? (
        <Loading />
      ) : (
        <>
          {hotelsData.length === 0 ? (
            <Loading />
          ) : (
            <Carousel hotelsData={hotelsData} data={data}></Carousel>
          )}
        </>
      )}
    </Styled.Featured>
  )
}
