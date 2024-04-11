import React, { useContext, useState } from "react"
import * as Styled from "./Styled"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { format } from "date-fns" //format function fns
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"

export const Header = ({ type }) => {
  const [destination, setDestination] = useState("")
  const [openDate, setOpendate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleoption = (name, operation) => {
    setOptions((prev) => {
      /**
       * prev => {
                adult: 1,
                children: 0,
                room: 1,
              }
       */
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", {
      state: {
        destination,
        dates,
        options,
      },
    })
  }

  return (
    <Styled.Header type={type}>
      <Styled.HeaderContainer type={type}>
        <Styled.HeaderList>
          <Styled.HeaderListItem className="active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </Styled.HeaderListItem>
          <Styled.HeaderListItem>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </Styled.HeaderListItem>
          <Styled.HeaderListItem>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </Styled.HeaderListItem>
          <Styled.HeaderListItem>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </Styled.HeaderListItem>
          <Styled.HeaderListItem>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </Styled.HeaderListItem>
        </Styled.HeaderList>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <Styled.HeaderDesc>
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </Styled.HeaderDesc>
            {!user &&

            <Styled.HeaderBtn   >Sign in / Register</Styled.HeaderBtn>
            }

            <Styled.HeaderSearch>
              <Styled.HeaderSearchItem>
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Styled.HeaderSearchItem>
              <Styled.HeaderSearchItem>
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpendate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )} `}
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
              </Styled.HeaderSearchItem>
              <Styled.HeaderSearchItem>
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult - ${options.children} children - ${options.room}   `}{" "}
                  room
                </span>
                {openOptions && (
                  <Styled.OptionsDiv>
                    <Styled.OptionItem>
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <Styled.OptionCounterBtn
                          disabled={options.adult <= 1}
                          onClick={() => handleoption("adult", "decrease")}
                        >
                          -
                        </Styled.OptionCounterBtn>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <Styled.OptionCounterBtn
                          onClick={() => handleoption("adult", "increase")}
                        >
                          +
                        </Styled.OptionCounterBtn>
                      </div>
                    </Styled.OptionItem>
                    <Styled.OptionItem>
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <Styled.OptionCounterBtn
                          disabled={options.children <= 1}
                          onClick={() => handleoption("children", "decrease")}
                        >
                          -
                        </Styled.OptionCounterBtn>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <Styled.OptionCounterBtn
                          onClick={() => handleoption("children", "increase")}
                        >
                          +
                        </Styled.OptionCounterBtn>
                      </div>
                    </Styled.OptionItem>
                    <Styled.OptionItem>
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <Styled.OptionCounterBtn
                          disabled={options.room <= 1}
                          onClick={() => handleoption("room", "decrease")}
                        >
                          -
                        </Styled.OptionCounterBtn>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <Styled.OptionCounterBtn
                          onClick={() => handleoption("room", "increase")}
                        >
                          +
                        </Styled.OptionCounterBtn>
                      </div>
                    </Styled.OptionItem>
                  </Styled.OptionsDiv>
                )}
              </Styled.HeaderSearchItem>
              <Styled.HeaderSearchItem>
                <Styled.HeaderBtn onClick={handleSearch}>
                  Search
                </Styled.HeaderBtn>
              </Styled.HeaderSearchItem>
            </Styled.HeaderSearch>
          </>
        )}
      </Styled.HeaderContainer>
    </Styled.Header>
  )
}
