import { Schema, model } from 'mongoose'
import schemaValues from '../constants/schema_values.js'
import Task from './Task.js'

const TaskStep = new Schema(
  {
    title: {
      type: String,
      maxlength: schemaValues.TASKSTEP_TITLE_LENGTH,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    taskId: {
      type: String,
      ref: 'Task',
      required: true,
      validate: {
        validator: async function (taskId) {
          const taskExists = await Task.exists({ _id: taskId })
          if (!taskExists) {
            return false
          }
          return true
        },
        message: 'La Tarea no existe.',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collation: {
      locale: 'es',
      strength: 2,
    },
    strict: 'throw',
  }
)

export default model('TaskStep', TaskStep)
