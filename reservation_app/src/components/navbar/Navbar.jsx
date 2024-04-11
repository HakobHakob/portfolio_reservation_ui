import { useContext } from "react"
import * as Styled from "./Styled"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const Navbar = () => {
  const { user } = useContext(AuthContext)
  return (
    <Styled.Navbar className="navbar">
      <Styled.NavbarContainer>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">VD logo</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <Styled.NavItems>
            <Link to="/register">
              <Styled.NavBtn>Register</Styled.NavBtn>
            </Link>

            <Link to="/login ">
              <Styled.NavBtn>Login</Styled.NavBtn>
            </Link>
          </Styled.NavItems>
        )}
      </Styled.NavbarContainer>
    </Styled.Navbar>
  )
}
