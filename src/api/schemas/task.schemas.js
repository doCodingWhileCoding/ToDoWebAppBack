import { z } from 'zod'
import { MongooseCommonSchema, ObjectIdSchema } from './common/index.js'
import errorMessages from '../constants/error_messages.js'
import schemaValues from '../constants/schema_values.js'

const WeekRepetitionDateSchema = z.map(z.number().int().nonnegative(), z.string(), z.string())
const RepetitionDate = z.map(z.number().int().nonnegative(), z.string())

const TaskTitleSchema = z.string().max(schemaValues.TASK_TITLE_LENGTH)
const TaskIsComletedSchema = z.boolean()
const TaskPositionSchema = z.number().nonnegative()
const TaskIsImportantSchema = z.boolean()
const TaskIsMyDaySchema = z.boolean()
const TaskStepsSchema = ObjectIdSchema.array() || []
const TaskDueDateSchema = z.date()
const TaskRepetitionRateSchema = RepetitionDate || WeekRepetitionDateSchema || null
const TaskFileUrlSchema = z.string().url() || null
const TaskNoteSchema = z.string() || null

//params
const TaskParamsSchema = z.object({
  id: ObjectIdSchema,
})

//data
const TaskDBDataSchema = MongooseCommonSchema.extend({
  title: TaskTitleSchema,
  isCompleted: TaskIsComletedSchema,
  position: TaskPositionSchema,
  isImportant: TaskIsImportantSchema,
  isMyDay: TaskIsMyDaySchema,
  steps: TaskStepsSchema,
  dueDate: TaskDueDateSchema,
  repetitionRate: TaskRepetitionRateSchema,
  fileUrl: TaskFileUrlSchema,
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
      id: true,
    })
      .strict()
      .required(),
  })
  .strict()

const GetTasksSchema = z.object({}).strict()

const UpdateTaskSchema = z
  .object({
    body: z
      .object({
        title: TaskTitleSchema,
        isCompleted: TaskIsComletedSchema,
        position: TaskPositionSchema,
        isImportant: TaskIsImportantSchema,
        isMyDay: TaskIsMyDaySchema,
        steps: TaskStepsSchema,
        dueDate: TaskDueDateSchema,
        repetitionRate: TaskRepetitionRateSchema,
        fileUrl: TaskFileUrlSchema,
        note: TaskNoteSchema,
      })
      .partial()
      .strict()
      .refine(
        (obj) =>
          obj.title ||
          obj.isCompleted ||
          obj.position ||
          obj.isImportant ||
          obj.isMyDay ||
          obj.steps ||
          obj.dueDate ||
          obj.repetitionRate ||
          obj.fileUrl ||
          obj.note,
        {
          message: errorMessages.SCHEMAS.ATLEASTONE,
        }
      ),
    params: TaskParamsSchema.pick({
      id: true,
    })
      .strict()
      .required(),
  })
  .strict()

const DeleteTaskSchema = z
  .object({
    params: TaskParamsSchema.pick({
      id: true,
    })
      .strict()
      .required(),
  })
  .strict()

const DeleteTasksSchema = z.object({}).strict()

export { CreateTaskSchema, GetTaskSchema, GetTasksSchema, UpdateTaskSchema, DeleteTaskSchema, DeleteTasksSchema }
