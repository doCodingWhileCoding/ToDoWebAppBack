import { Router } from 'express'

import taskRouter from './task.routes.js'

const router = Router()

router.use('/tasks', taskRouter)

export default router
