import { Router } from 'express'
import { createTask, getTask, getTasks, deleteTask, deleteTasks, updateTask } from '../controllers/task.controller.js'

const router = Router()

router.post('/', createTask)
router.get('/:id', getTask)
router.get('/', getTasks)
router.delete('/:id', deleteTask)
router.delete('/', deleteTasks)
router.put('/:id', updateTask)

export default router
