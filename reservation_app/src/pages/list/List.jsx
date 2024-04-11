import * as Styled from "./Styled"
import { useState } from "react"
import { format } from "date-fns"
import { useLocation } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Navbar } from "../../components/navbar/Navbar"
import Loading from "../../components/Loading/Loading"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { SearchItem } from "../../components/searchItem/SearchItem"
import { useFetch } from "../../components/customHooks/useFetch"
import { basePath } from "../../components/congig"

export const List = () => {
  const location = useLocation()

  // Initialize state variables with default values
  const defaultDestination = location.state?.destination || "Madrid"

  const defaultDate = location.state?.dates || [
    { startDate: new Date(), endDate: new Date() },
  ]
  const defaultOptions = location.state?.options || null

  // Set up state variables
  const [destination, setDestination] = useState(defaultDestination)
  const [dates, setDates] = useState(defaultDate)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `${basePath}/hotels?city=${destination}&min=${
      min || 0
    }&max=${max || Infinity}`
  )

  const handleClick = () => {
    reFetch()
  }

  const setMaximum = (eventValue) => {
    if (eventValue >= 0) {
      setMax(eventValue + 1)
    }
  }

  return (
    <Styled.List>
      <Navbar />
      <Header type="list" />

      <Styled.ListContainer>
        <Styled.ListWrapper>
          <Styled.ListSearch>
            <Styled.ListTitle>Search</Styled.ListTitle>
            <Styled.ListItem>
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </Styled.ListItem>

            <Styled.ListItem>
              <label>Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="check-in-span"
              >
                {`
                ${format(dates[0].startDate, "dd/mm/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/mm/yyyy"
                )}
                `}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
              )}
            </Styled.ListItem>

            <Styled.ListItem>
              <label>Options</label>
              <Styled.ListOptions>
                <Styled.ListOptionItem>
                  <Styled.ListOptionText>
                    Min price <small>per night</small>
                  </Styled.ListOptionText>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </Styled.ListOptionItem>
                <Styled.ListOptionItem>
                  <Styled.ListOptionText>
                    Max price <small>per night</small>
                  </Styled.ListOptionText>
                  <input
                    type="number"
                    onChange={(e) => setMaximum(parseInt(e.target.value, 10))}
                    className="lsOptionInput"
                  />
                </Styled.ListOptionItem>

                <Styled.ListOptionItem>
                  <Styled.ListOptionText>Adult</Styled.ListOptionText>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options?.adult || 1}
                  />
                </Styled.ListOptionItem>

                <Styled.ListOptionItem>
                  <Styled.ListOptionText>Children</Styled.ListOptionText>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options?.children || 0}
                  />
                </Styled.ListOptionItem>

                <Styled.ListOptionItem>
                  <Styled.ListOptionText>Room</Styled.ListOptionText>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options?.room || 1}
                  />
                </Styled.ListOptionItem>
              </Styled.ListOptions>
            </Styled.ListItem>
            <button onClick={handleClick} className="search-btn">
              Search
            </button>
          </Styled.ListSearch>

          <Styled.ListResult>
            {loading ? (
              <Loading />
            ) : (
              <>
                {data &&
                  data.map((item) => <SearchItem item={item} key={item._id} />)}
              </>
            )}
          </Styled.ListResult>
        </Styled.ListWrapper>
      </Styled.ListContainer>
    </Styled.List>
  )
}
