import { z } from 'zod'
import { MongooseCommonSchema, ObjectIdSchema, BooleanParamSchema, NumberParamSchema } from './common/index.js'
import errorMessages from '../constants/error_messages.js'
import schemaValues from '../constants/schema_values.js'
import { TasksQueryTypes } from '../constants/enums.js'

const WeekRepetitionDateSchema = z.map(z.number().int().nonnegative(), z.string(), z.string())
const RepetitionDate = z.map(z.number().int().nonnegative(), z.string())

const TaskTitleSchema = z.string().max(schemaValues.TASK_TITLE_LENGTH)
const TaskIsComletedSchema = z.boolean()
const TaskPositionSchema = z.number().int().nonnegative()
const TaskDateSchema = z
  .string()
  .transform((str) => new Date(str))
  .nullable()
const TaskDueDateSchema = z
  .string()
  .transform((str) => new Date(str))
  .nullable()
const TaskRepetitionRateSchema = RepetitionDate || WeekRepetitionDateSchema || null
const TaskNoteSchema = z.string().nullable()
const TasksQueryTypesSchema = z.nativeEnum(TasksQueryTypes)

//params
const TaskParamsSchema = z.object({
  taskId: ObjectIdSchema,
})
//
const TaskQueriesSchema = z.object({
  type: TasksQueryTypesSchema,
  page: NumberParamSchema,
  limit: NumberParamSchema,
})

//data
const TaskDBDataSchema = MongooseCommonSchema.extend({
  title: TaskTitleSchema,
  isCompleted: TaskIsComletedSchema,
  position: TaskPositionSchema,
  date: TaskDateSchema,
  dueDate: TaskDueDateSchema,
  repetitionRate: TaskRepetitionRateSchema,
  note: TaskNoteSchema,
})

//request
const CreateTaskSchema = z
  .object({
    body: z
      .object({
        title: TaskTitleSchema,
      })
      .strict()
      .required(),
  })
  .strict()

const GetTaskSchema = z
  .object({
    params: TaskParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()

const GetTasksSchema = z
  .object({
    query: z
      .object({
        type: TasksQueryTypesSchema,
        page: NumberParamSchema.optional(),
        limit: NumberParamSchema.optional(),
      })
      .strict(),
  })
  .strict()
const UpdateTaskIsCompletedSchema = z
  .object({
    body: z
      .object({
        isCompleted: TaskIsComletedSchema,
      })
      .strict()
      .required(),
    params: TaskParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()
const UpdateTaskPositionSchema = z
  .object({
    body: z
      .object({
        position: TaskPositionSchema,
      })
      .strict()
      .required(),
    params: TaskParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()

const UpdateTaskSchema = z
  .object({
    body: z
      .object({
        title: TaskTitleSchema,
        date: TaskDateSchema,
        dueDate: TaskDueDateSchema,
        repetitionRate: TaskRepetitionRateSchema,
        note: TaskNoteSchema,
      })
      .partial()
      .strict()
      .refine(
        (obj) =>
          obj.title !== undefined ||
          obj.date !== undefined ||
          obj.dueDate !== undefined ||
          obj.repetitionRate !== undefined ||
          obj.note !== undefined,
        {
          message: errorMessages.SCHEMAS.ATLEASTONE,
        }
      ),
    params: TaskParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()

const DeleteTaskSchema = z
  .object({
    params: TaskParamsSchema.pick({
      taskId: true,
    })
      .strict()
      .required(),
  })
  .strict()

const DeleteTasksSchema = z.object({}).strict()

export {
  CreateTaskSchema,
  GetTaskSchema,
  GetTasksSchema,
  UpdateTaskSchema,
  UpdateTaskIsCompletedSchema,
  UpdateTaskPositionSchema,
  DeleteTaskSchema,
  DeleteTasksSchema,
}
