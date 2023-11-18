import User from '../models/User.js'
import config from '../../config/dotenv.js'
import bcrypt from 'bcrypt'
import { sendEmailVerificationEmail } from './email.services.js'

const getEncryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(config.BCRYPT_SALTROUNDS))
  const encryptedPassword = await bcrypt.hash(password, salt)
  return encryptedPassword
}
export const isExistingUserEmail = async (email) => {
  return await User.exists({ email: email })
}
export const isExistingUser = async (userId) => {
  return await User.exists({ _id: userId })
}
export const saveUser = async (body) => {
  const encryptedPassword = getEncryptedPassword(body.req.password)
  const userData = {
    ...body,
    password: encryptedPassword,
  }
  const user = new User(userData)
  const savedUser = await user.save()
  sendEmailVerificationEmail(savedUser._id, savedUser.email)
  return savedUser
}
export const getUserById = async (userId) => {
  const user = await User.findById(userId)
  return user
}
export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email })
  return user
}
export const updateUserEmailVerified = async (userId) => {
  await User.findByIdAndUpdate(userId, { emailVerified: true })
}
