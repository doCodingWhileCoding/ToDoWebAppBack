import { Router } from 'express'
import {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  deleteTasks,
  updateTask,
  updateTaskIsCompleted,
  updateTaskPosition,
} from '../controllers/task.controller.js'
import validateSchema from '../middlewares/SchemaValidator.js'
import {
  CreateTaskSchema,
  GetTaskSchema,
  GetTasksSchema,
  UpdateTaskSchema,
  UpdateTaskIsCompletedSchema,
  UpdateTaskPositionSchema,
  DeleteTaskSchema,
  DeleteTasksSchema,
} from '../schemas/task.schemas.js'
import taskStepRouter from './taskStep.routes.js'
const router = Router()

router.post('/', validateSchema(CreateTaskSchema), createTask)
router.get('/:taskId', validateSchema(GetTaskSchema), getTask)
router.get('/', validateSchema(GetTasksSchema), getTasks)
router.delete('/:taskId', validateSchema(DeleteTaskSchema), deleteTask)
router.delete('/', validateSchema(DeleteTasksSchema), deleteTasks)
router.put('/:taskId/isCompleted', validateSchema(UpdateTaskIsCompletedSchema), updateTaskIsCompleted)
router.put('/:taskId/position', validateSchema(UpdateTaskPositionSchema), updateTaskPosition)
router.put('/:taskId', validateSchema(UpdateTaskSchema), updateTask)

router.use('/:taskId/taskSteps', taskStepRouter)

export default router
