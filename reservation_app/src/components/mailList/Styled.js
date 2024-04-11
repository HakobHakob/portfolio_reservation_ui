import styled from "styled-components"

export const Mail = styled.div`
  width: 100%;
  margin-top: 50px;
  background-color: #003580;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px 0;
`
export const MailTitle = styled.h1``
export const MailDesc = styled.span``
export const MailInputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 350px;
  gap: 10px;

  input {
    flex: 2;
    padding: 15px;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  button {
    flex: 0.5;
    padding: 15px ;
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`
