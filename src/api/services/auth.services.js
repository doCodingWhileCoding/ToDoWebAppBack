import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config/dotenv.js'

export const isValidPassword = async (userPassword, encryptedPassword) => {
  return await bcrypt.compare(userPassword, encryptedPassword)
}
export const getAccessToken = (userId) => {
  const access_token = jwt.sign({ userId: userId }, config.JWT_ACCESS_SECRET, { expiresIn: config.JWT_ACCESS_TIME })
  return access_token
}
export const getDecodedAccessToken = (access_token) => {
  const decodedJWT = jwt.verify(access_token, config.JWT_ACCESS_SECRET)
  return decodedJWT
}
