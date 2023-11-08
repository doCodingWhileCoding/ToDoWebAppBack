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
router.get('/:id', validateSchema(GetTaskSchema), getTask)
router.get('/', validateSchema(GetTasksSchema), getTasks)
router.delete('/:id', validateSchema(DeleteTaskSchema), deleteTask)
router.delete('/', validateSchema(DeleteTasksSchema), deleteTasks)
router.put('/:id/isCompleted', validateSchema(UpdateTaskIsCompletedSchema), updateTaskIsCompleted)
router.put('/:id/position', validateSchema(UpdateTaskPositionSchema), updateTaskPosition)
router.put('/:id', validateSchema(UpdateTaskSchema), updateTask)

router.use('/:taskId/taskSteps', taskStepRouter)

export default router
