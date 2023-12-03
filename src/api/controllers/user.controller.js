import { getUserDataById } from '../services/user.services.js'
export const getUser = async (req, res, next) => {
  const userId = req.userId
  try {
    const task = await getUserDataById(userId)
    return res.status(200).json(task)
  } catch (error) {
    return next(error)
  }
}
