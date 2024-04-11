import * as Styled from "./Styled"

import React from "react"

export const MailList = () => {
  return (
    <Styled.Mail>
      <Styled.MailTitle>Save time, save money!</Styled.MailTitle>
      <Styled.MailDesc>
        Sign up and we'll send the best deals to you
      </Styled.MailDesc>
      <Styled.MailInputContainer>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </Styled.MailInputContainer>
    </Styled.Mail>
  )
}
