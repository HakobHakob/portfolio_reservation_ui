import styled from "styled-components"

export const Reserve = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.418);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ReserveContainer = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;

  .ResClose {
    color: #318ce7;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`
export const ResItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const ResItemInfo = styled.div``

export const ResTitle = styled.div`
  font-weight: 500;
`
export const ResDescription = styled.div`
  font-weight: 300;
`
export const ResMaxPeople = styled.div`
  font-size: 12px;
`
export const ResPrice = styled.div`
  font-weight: 500;
`
export const ResSelectedRooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 8px;
  color: gray;
`
export const ResRoom = styled.div`
  display: flex;
  flex-direction: column;
`
export const ResBtn = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`
