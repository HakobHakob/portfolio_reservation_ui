import styled from "styled-components"

export const PropList = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

export const PropListItem = styled.div`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  .propListImg {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`

export const PropListTitles = styled.div`
  h1 {
    font-size: 18px;
    color: #444;
    text-transform: capitalize;
  }

  h2 {
    font-size: 14px;
    font-weight: 300;
  }
`
