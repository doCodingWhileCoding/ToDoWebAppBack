import { Router } from 'express'
import { createTask, getTask, getTasks, deleteTask, deleteTasks, updateTask } from '../controllers/task.controller.js'
import validateSchema from '../middlewares/SchemaValidator.js'
import {
  CreateTaskSchema,
  GetTaskSchema,
  GetTasksSchema,
  UpdateTaskSchema,
  DeleteTaskSchema,
  DeleteTasksSchema,
} from '../schemas/task.schemas.js'
const router = Router()

router.post('/', validateSchema(CreateTaskSchema), createTask)
router.get('/:id', validateSchema(GetTaskSchema), getTask)
router.get('/', validateSchema(GetTasksSchema), getTasks)
router.delete('/:id', validateSchema(DeleteTaskSchema), deleteTask)
router.delete('/', validateSchema(DeleteTasksSchema), deleteTasks)
router.put('/:id', validateSchema(UpdateTaskSchema), updateTask)

export default router
