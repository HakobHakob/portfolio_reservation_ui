import styled from "styled-components"

export const Featured = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

`

export const FeaturedItem = styled.div`
  position: relative;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 250px;
  height: 100vh;
  max-height: 250px;
  flex: 1;

  .featuredImg {
    width: 100%;
    max-width: 250px;
    height: 100vh;
    max-height: 250px;
    object-fit: cover;
  }
`

export const FeaturedTitles = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`


