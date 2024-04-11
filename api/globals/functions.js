import crypto from "crypto"

export const generateSecretKey = (str_length = 128) => {
//   return crypto.randomBytes(64).toString("hex")
let str = ""
const symbols =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@-+=@!"
Array.from({ length: str_length }).forEach(() => {
  str += symbols[Math.floor(Math.random() * symbols.length)]
})
return str
}
