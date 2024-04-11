import styled from "styled-components"

export const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const Slider = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.613);
  z-index: 999;
  display: flex;
  align-items: center;

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: lightgray;
    cursor: pointer;
  }

  .arrow {
    margin: 20px;
    font-size: 20px;
    color: lightgray;
    cursor: pointer;
  }
`

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sliderImg {
    width: 100%;
    height: 100vh;
    max-width: 600px;
    max-height: 400px;
  }
`

export const HotelWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  .hotelDistance {
    color: #0071c2;
    font-weight: 500;
  }

  .hotelPriceHighlight {
    color: #008009;
    font-weight: 500;
  }
`

export const BookNowBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 0;
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`

export const HotelTitle = styled.h1`
  font-size: 24px;
`

export const HotelAddress = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const HotelImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const HotelImgWrapper = styled.div`
  width: 33%;

  .hotelImg {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`

export const HotelDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`

export const HotelDetailsTexts = styled.div`
  flex: 3;
`

export const HotelDesc = styled.p`
  font-size: 14px;
  margin-top: 20px;
`

export const HotelDetailsPrice = styled.div`
  flex: 1;
  background-color: #ebf3ff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 18px;
    color: #555;
  }

  span {
    font-size: 14px;
  }

  h2 {
    font-weight: 300;
  }

  button {
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
  }
`
