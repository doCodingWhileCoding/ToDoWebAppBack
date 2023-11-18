import Token from '../models/Token.js'

export const saveToken = async (ownerId, type, uuid) => {
  const token = new Token({
    ownerId: ownerId,
    type: type,
    uuid: uuid,
  })
  const savedToken = await token.save()
  return savedToken
}
export const findToken = async (ownerId, type, uuid) => {
  return await Token.findOne({ ownerId: ownerId, type: type, uuid: uuid })
}
export const getTokenByOwnerId = async (ownerId, type) => {
  return await Token.findOne({ ownerId: ownerId, type: type })
}
export const isExistingToken = async (ownerId, type) => {
  return await Token.exists({ ownerId: ownerId, type: type })
}
export const deleteTokenById = async (tokenId) => {
  await Token.findByIdAndDelete(tokenId)
}
export const deleteTokenByOwnerId = async (ownerId, type) => {
  await Token.findOneAndDelete({ ownerId: ownerId, type: type })
}
