import { Router } from 'express'
import validateSchema from '../middlewares/SchemaValidator.js'

import {
  CreateTaskStepSchema,
  GetTaskStepsSchema,
  UpdateTaskStepSchema,
  UpdateTaskStepPositionSchema,
  DeleteTaskStepSchema,
} from '../schemas/taskStep.schema.js'
import {
  createTaskStep,
  getTaskSteps,
  updateTaskStep,
  updateTaskStepPosition,
  deleteTaskStep,
} from '../controllers/taskStep.controller.js'
const router = Router({ mergeParams: true })

router.post('/', validateSchema(CreateTaskStepSchema), createTaskStep)
router.get('/', validateSchema(GetTaskStepsSchema), getTaskSteps)
router.put('/:taskStepId/position', validateSchema(UpdateTaskStepPositionSchema), updateTaskStepPosition)
router.put('/:taskStepId', validateSchema(UpdateTaskStepSchema), updateTaskStep)
router.delete('/:taskStepId', validateSchema(DeleteTaskStepSchema), deleteTaskStep)

export default router
