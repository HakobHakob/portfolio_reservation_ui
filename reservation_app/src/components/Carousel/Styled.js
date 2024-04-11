import styled from "styled-components"

export const FeaturedItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  width: 50%;
  height: 100vh;
  max-height: 300px;

  .arrow {
    position: absolute;
    top: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: lightgray;
    margin: 0 5px;
  }
`

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;

  .featuredImg {
    width: 100%;
    object-fit: cover;
  }

  .div {
    width: 100%;
  }
`
export const FeaturedTitles = styled.div`
  position: sticky;
  color: white;
  bottom: 20px;
  margin: 0 5px;
`
