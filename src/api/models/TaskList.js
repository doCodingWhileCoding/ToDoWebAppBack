import { Schema, model } from 'mongoose'
import Task from './Task.js'

const TaskList = new Schema(
  {
    tasks: {
      type: [String],
      ref: 'TaskStep',
      required: true,
      validate: {
        validator: async function (tasks) {
          for (const task of tasks) {
            const taskExists = await Task.exists({ _id: task })
            if (!taskExists) {
              return false
            }
          }
          return true
        },
        message: 'El task no existe.',
      },
    },
    isShared: {
      type: Boolean,
      required: true,
    },
    color: {
      type: {
        r: Number,
        g: Number,
        b: Number,
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

export default model('TaskList', TaskList)
