import styled from "styled-components"

export const Navbar = styled.div`
  height: 50px;
  background-color: #003580;
  display: flex;
  justify-content: center;
`

export const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-weight: 500;
  }
`

export const NavItems = styled.div`
display: flex;
gap: 10px;
`

export const NavBtn = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 7px;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color: teal;
  font-weight: bold;
  color: white;
  cursor: pointer;
`
