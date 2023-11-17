import { z } from 'zod'
import { ObjectIdSchema } from './common/index.js'
import schemaValues from '../constants/schema_values.js'
import errorMessages from '../constants/error_messages.js'

const TaskStepTittleSchema = z.string().max(schemaValues.TASKSTEP_TITLE_LENGTH)
const TaskStepIsCompletedSchema = z.boolean()
const TaskStepPositionSchema = z.number().int().nonnegative().nullable()

//params
const TaskStepParamsSchema = z.object({
  taskId: ObjectIdSchema,
  taskStepId: ObjectIdSchema,
})

//request
const CreateTaskStepSchema = z
  .object({
    params: TaskStepParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
    body: z
      .object({
        prevPosition: TaskStepPositionSchema,
      })
      .strict()
      .required(),
  })
  .strict()

const GetTaskStepsSchema = z
  .object({
    params: TaskStepParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()

const UpdateTaskStepSchema = z
  .object({
    params: TaskStepParamsSchema.pick({
      taskId: true,
      taskStepId: true,
    })
      .strict()
      .required(),
    body: z
      .object({
        title: TaskStepTittleSchema,
        isCompleted: TaskStepIsCompletedSchema,
      })
      .partial()
      .strict()
      .refine((obj) => obj.title !== undefined || obj.isCompleted !== undefined, {
        message: errorMessages.SCHEMAS.ATLEASTONE,
      }),
  })
  .strict()

const UpdateTaskStepPositionSchema = z
  .object({
    params: TaskStepParamsSchema.pick({
      taskId: true,
      taskStepId: true,
    })
      .strict()
      .required(),
    body: z
      .object({
        position: TaskStepPositionSchema,
      })
      .strict()
      .required(),
  })
  .strict()

const DeleteTaskStepSchema = z
  .object({
    params: TaskStepParamsSchema.pick({
      taskId: true,
      taskStepId: true,
    })
      .strict()
      .required(),
  })
  .strict()

export {
  CreateTaskStepSchema,
  GetTaskStepsSchema,
  UpdateTaskStepSchema,
  UpdateTaskStepPositionSchema,
  DeleteTaskStepSchema,
}
