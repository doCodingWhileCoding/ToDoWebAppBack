import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config/dotenv.js'

export const getEncryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(config.BCRYPT_SALTROUNDS))
  const encryptedPassword = await bcrypt.hash(password, salt)
  return encryptedPassword
}
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
