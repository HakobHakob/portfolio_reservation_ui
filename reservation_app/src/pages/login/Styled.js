import styled from "styled-components"

export const Login = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
  padding: 1.25em;
  border-radius: 5px;

  input {
    width: 100%;
    background-color: transparent;
    height: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.01);
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    line-height: 40px;
    &::placeholder {
      color: #FDDCBC;
    }
    &:focus {
      border: 0;
      border-bottom: 1px solid #2980b9;
      color: #fff;
      outline: none;
    }
  }
`

export const LoginBtn = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: #0071c28c;
    cursor: not-allowed;
  }
`
