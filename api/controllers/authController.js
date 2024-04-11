import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
/**
 * With JWT we gonna hide our user info and send it with coockie and with it
 * check if user is admin it will be able to update, delete or otherone do, opposite
 * we will send error.
 */
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      ...req.body,
      password: hash,
    })

    await newUser.save()
    res.status(200).send("User has been created")
  } catch (error) {
    next(error)
  }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, "User not found!"))
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )
    //Spread and get only other details, because it mustn't show in front part
    const { password, isAdmin, ...otherDetails } = user._doc

    /**
     * The "httpOnly: true" parameter in setting a cookie means that the cookie will only be accessible through HTTP requests and will not be available to JavaScript scripts on the client side. This enhances security by preventing access to the cookie from JavaScript, which can help protect against certain types of attacks such as Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS).
     */
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (error) {
    next(error)
  }
}
