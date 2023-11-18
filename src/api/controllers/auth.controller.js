import errorMessages from '../constants/error_messages.js'
import {
  isExistingUserEmail,
  saveUser,
  getUserByEmail,
  isExistingUser,
  updateUserEmailVerified,
  getUserById,
} from '../services/user.services.js'
import { isValidPassword, getAccessToken, getDecodedAccessToken } from '../services/auth.services.js'
import { findToken, deleteTokenById, isExistingToken, deleteTokenByOwnerId } from '../services/token.services.js'
import { sendEmailVerificationEmail } from '../services/email.services.js'
import { TokenTypes } from '../constants/enums.js'

export const signUpUser = async (req, res, next) => {
  if (await isExistingUserEmail(req.body.email)) {
    const err = {
      statusCode: 301,
      errMsg: errorMessages.MODELS.USER.EMAIL_EXISTS,
    }
    return next(err)
  }
  try {
    const savedUser = await saveUser(req.body)
    return res.status(200).json(savedUser)
  } catch (error) {
    return next(error)
  }
}

export const loginUser = async (req, res, next) => {
  if (!(await isExistingUserEmail(req.body.email))) {
    const err = {
      statusCode: 301,
      errMsg: errorMessages.MODELS.USER.INVALID_LOGIN,
    }
    return next(err)
  }
  let user
  try {
    user = await getUserByEmail(req.body.email)
  } catch (error) {
    return next(error)
  }
  if (!(await isValidPassword(req.body.password, user.password))) {
    const err = {
      statusCode: 301,
      errMsg: errorMessages.MODELS.USER.INVALID_LOGIN,
    }
    return next(err)
  }
  if (!user.emailVerified) {
    return res.status(200).json({ status: errorMessages.MODELS.USER.EMAIL_NOT_VERIFIED, userId: user._id })
  }
  const access_token = getAccessToken(user._id)
  return res.status(200).json(access_token)
}

export const verifyEmail = async (req, res, next) => {
  const userId = req.params.userId
  if (!(await isExistingUser(userId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  const uuid = req.params.uuid
  const token = await findToken(TokenTypes.EMAIL_VERIFICATION, userId, uuid)
  if (!token) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.MODELS.TOKEN.TOKEN_EXPIRED,
    }
    return next(err)
  }
  try {
    await updateUserEmailVerified(userId)
  } catch (error) {
    return next(error)
  }
  try {
    await deleteTokenById(token._id)
  } catch (error) {
    return next(error)
  }
  return res.status(200).json({})
}

export const resendEmailVerificationEmail = async (req, res, next) => {
  const userId = req.params.userId
  if (!(await isExistingUser(userId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  try {
    const user = await getUserById(userId)
    if (user.emailVerified) return res.status(200).json('email already verified')
    if (!(await isExistingToken(userId, TokenTypes.EMAIL_VERIFICATION))) {
      await deleteTokenByOwnerId(userId, TokenTypes.EMAIL_VERIFICATION)
    }
    try {
      await sendEmailVerificationEmail(user._id, user._id)
      res.status(200).json('email sended')
    } catch (error) {
      return next(error)
    }
  } catch (error) {
    return next(error)
  }
}

export const verifyToken = async (req, res, next) => {
  let access_token
  try {
    access_token = req.headers['access_token']
  } catch (error) {
    return next(error)
  }
  if (!access_token) {
    const err = {
      statusCode: 401,
      errMsg: errorMessages.MIDDLEWARES.AUTH.NO_TOKEN,
    }
    return next(err)
  }
  let decodedJWT
  try {
    decodedJWT = getDecodedAccessToken(access_token)
  } catch (error) {
    const err = {
      statusCode: 401,
      errMsg: errorMessages.MIDDLEWARES.AUTH.INVALID_TOKEN,
    }
    return next(err)
  }
  const userId = decodedJWT.userId
  if (!(await isExistingUser(userId))) {
    const err = {
      statusCode: 404,
      errMsg: errorMessages.NOT_FOUND,
    }
    return next(err)
  }
  req.userId = userId
  next()
}
