import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(createError(401, "You are not authenticated!"))
  }
  /*
   *Third parameter is includes this { id: user._id, isAdmin: user.isAdmin } from authController
   * error or our user information
   */
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"))
    /**
     * we can asign here what we want. Ex. req.hello = user
     */

    req.user = user // new request where user _id and isAdmin
    next()
  })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // req.user.id => from verifyToken function  req.user = user , which saved in JWT token
    // req.params.id => from "/checkuser:id" from postman or other request

    // This user and admin user can delete this user
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authenticated!"))
    }
  })
}
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // This user and admin user can be delete this user
    if (req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authenticated!"))
    }
  })
}
