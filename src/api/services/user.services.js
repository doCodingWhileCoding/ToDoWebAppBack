import User from '../models/User.js'
import { sendEmailVerificationEmail } from './email.services.js'
import { getEncryptedPassword } from './auth.services.js'

export const isExistingUserEmail = async (email) => {
  return await User.exists({ email: email })
}
export const isExistingUser = async (userId) => {
  return await User.exists({ _id: userId })
}
export const saveUser = async (body) => {
  const encryptedPassword = await getEncryptedPassword(body.password)
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
export const getUserDataById = async (userId) => {
  const user = await User.findById(userId).select({ _id: 1, email: 1 })
  return user
}
export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email })
  return user
}
export const updateUserEmailVerified = async (userId) => {
  await User.findByIdAndUpdate(userId, { emailVerified: true })
}
