import { verifyToken } from '../controllers/auth.controller.js'
import { Router } from 'express'

import taskRouter from './task.routes.js'
import authRouter from './auth.routes.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/tasks', verifyToken, taskRouter)

export default router
