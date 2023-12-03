import { verifyToken } from '../controllers/auth.controller.js'
import { Router } from 'express'

import taskRouter from './task.routes.js'
import authRouter from './auth.routes.js'
import userRoutes from './user.routes.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', verifyToken, taskRouter)
router.use('/user', verifyToken, userRoutes)

export default router
